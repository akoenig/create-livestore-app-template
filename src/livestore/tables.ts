import { DbSchema } from "@livestore/livestore";

const todos = DbSchema.table("todos", {
  id: DbSchema.text({ primaryKey: true }),
  description: DbSchema.text(),
  completed: DbSchema.boolean({ default: false }),
  createdAt: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
  updatedAt: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
});

export const tables = {
  todos,
};
