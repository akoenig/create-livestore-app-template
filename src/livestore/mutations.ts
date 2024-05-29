import { Schema } from "@effect/schema";
import { defineMutation } from "@livestore/livestore";

export const addTodo = defineMutation(
  "addTodo",
  Schema.Struct({ id: Schema.String, description: Schema.String }),
  "INSERT INTO todos (id, description) VALUES ($id, $description);",
);

export const toggleTodo = defineMutation(
  "toggleTodo",
  Schema.Struct({ id: Schema.String, completed: Schema.Boolean }),
  "UPDATE todos SET completed = $completed WHERE id = $id;",
);

export const removeTodo = defineMutation(
  "removeTodo",
  Schema.Struct({ id: Schema.String }),
  "DELETE FROM todos WHERE id = $id;",
);

export const mutations = { addTodo, toggleTodo, removeTodo };
