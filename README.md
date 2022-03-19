# rtk-query-vs-react-query
## What is this?
A small sample project to test two different ways to query and manage data - Redux Toolkit Query and React Query. It contains a simple Next.js server that does some basic CRUD operations and two simple frontends that are identical other than their use of Redux Toolkt Query vs React Query.

## What did I learn?
I hadn't used either before, so both implementations were new to me.
* For querying and keeping updated state from a server that will be invalidated often due to user interaction, both are significantly better than just keeping the data in some sort of global state management solution
* For personal projects I prefer React Query - Redux Query has a bit too much 'magic' in it for my preferences.
* That being said if I was to join a project with an already existing large codebase that uses Redux Toolkit, I would be happy to use Redux Toolkit Query as well.

## Acknowledgements
Large parts of the code are based on [this video by Jack Herrington](https://www.youtube.com/watch?v=LDS1ll93P-s)
