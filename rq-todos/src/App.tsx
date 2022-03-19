import React, { useRef } from 'react';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getTodos, Todo, updateTodo, deleteTodo, createTodo } from './lib/api';
import axios from 'axios';

const queryClient = new QueryClient();

export const axiosClient = axios.create({ baseURL: 'http://localhost:4000/' });

function TodoApp() {
  const textRef = useRef<HTMLInputElement>(null);

  // `"todos"` is the data tag name
  // getTodos is the method that gets it
  const { data: todos } = useQuery<Todo[]>(
    'todos',
    async () => (await axiosClient.get<Todo[]>('/todos')).data,
    {
      initialData: [],
    }
  );

  const createMutation = useMutation<Response, unknown, { text: string }>(
    (data) => {
      console.log(data);
      return axiosClient.post(`/todos`, data)
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
        textRef.current!.value = '';
      },
    }
  );
  // const createMutation = useMutation(createTodo, {
  //   onSuccess: () => queryClient.invalidateQueries('todos'),
  // });

  const updateMutation = useMutation<Response, unknown, Todo>(
    (todo) => axiosClient.put(`/todos/${todo.id}`, todo),
    {
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  );
  // const updateMutation = useMutation(updateTodo, {
  //   onSuccess: () => queryClient.invalidateQueries('todos'),
  // });

  const deleteMutation = useMutation<Response, unknown, Todo>(
    (todo) => axiosClient.delete(`/todos/${todo.id}`),
    {
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  );
  // const deleteMutation = useMutation(deleteTodo, {
  //   onSuccess: () => queryClient.invalidateQueries('todos'),
  // });

  // const addTodo = () => {
  //   createMutation.mutate(textRef.current!.value ?? '');
  //   textRef.current!.value = '';
  // };

  return (
    <div className='App'>
      <div className='todos'>
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type='checkbox'
                checked={todo.done}
                onChange={() => {
                  updateMutation.mutate({ ...todo, done: !todo.done });
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => {
                deleteMutation.mutate(todo);
              }}
            >
              Delete
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className='add'>
        <input type='text' ref={textRef} />
        <button onClick={() => { createMutation.mutate({
          text: textRef.current!.value ?? ''
        })}}>Add</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
