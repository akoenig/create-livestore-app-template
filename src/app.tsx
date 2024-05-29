import { querySQL } from "@livestore/livestore";
import { useQuery, useStore } from "@livestore/livestore/react";

import logo from "./assets/logo.png";

import { addTodo, removeTodo, toggleTodo } from "./livestore/mutations.ts";

type Todo = Readonly<{
  id: string;
  description: string;
  completed: boolean;
}>;

function App() {
  const { store } = useStore();

  const todos = useQuery(
    querySQL<Todo[]>(
      "SELECT id, description, completed FROM todos;",
    ),
  );

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const description = String(form.get("description"));

    if (description) {
      store.mutate(
        addTodo({ id: Date.now().toString(), description }),
      );
    }
  }

  function handleToggleTodo(todo: Todo) {
    return function toggle() {
      store.mutate(
        toggleTodo({ id: todo.id, completed: !todo.completed }),
      );
    };
  }

  function handleRemoveTodo(todo: Todo) {
    return function remove() {
      store.mutate(removeTodo({ id: todo.id }));
    };
  }

  const hasTodos = todos?.length > 0;

  return (
    <div className="flex flex-col gap-10">
      <header className="container flex flex-col items-center justify-center py-10">
        <img src={logo} alt="LiveStore Logo" />
        <h1 className="text-5xl font-extrabold">LiveStore</h1>
      </header>
      <main className="container w-1/2 flex flex-col gap-20">
        <div className="bg-purple-500 flex items-center p-4 px-6 rounded-xl text-white gap-4">
          <span className="block text-3xl">🎉</span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Congratulations</h2>
            <p>
              Your new LiveStore application was created. Feel free to play
              around and check out the ToDo app demo below.
            </p>
          </div>
        </div>

        <div className="w-1/2 m-auto border rounded-xl shadow-xl flex flex-col">
          <form onSubmit={handleAddTodo} className="flex gap-2 p-8">
            <input
              name="description"
              type="text"
              className="border rounded p-1 px-2 flex-1"
            />

            <button
              type="submit"
              className="rounded p-1 px-2 bg-purple-500 text-white rounded"
            >
              Add Todo
            </button>
          </form>

          {hasTodos
            ? (
              <ul>
                {todos?.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex gap-2 items-center border-t py-1 px-8"
                  >
                    <span
                      className={`flex-1 text-sm ${
                        todo.completed ? "line-through text-gray-200" : ""
                      }`}
                    >
                      {todo.description}
                    </span>

                    <button
                      onClick={handleToggleTodo(todo)}
                      className="cursor-pointer underline text-blue-500 text-xs"
                    >
                      {todo.completed ? "Uncomplete" : "Complete"}
                    </button>

                    <button
                      onClick={handleRemoveTodo(todo)}
                      className="cursor-pointer underline text-red-500 text-xs"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )
            : null}
        </div>
      </main>
    </div>
  );
}

export default App;
