import React, { useRef } from 'react';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getTodos, Todo, updateTodo, deleteTodo, createTodo } from './lib/api';

const queryClient = new QueryClient();

function TodoApp() {
  const textRef = useRef<HTMLInputElement>(null);

  // `"todos"` is the data tag name
  // getTodos is the method that gets it
  const { data: todos } = useQuery<Todo[]>('todos', getTodos, {
    initialData: [],
  });

  const createMutation = useMutation(createTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  })

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  })

  const addTodo = () => {
    createMutation.mutate(textRef.current!.value ?? '');
    textRef.current!.value = '';
  }

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
            <button onClick={() => {deleteMutation.mutate(todo)}}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className='add'>
        <input type='text' ref={textRef} />
        <button onClick={addTodo}>Add</button>
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
