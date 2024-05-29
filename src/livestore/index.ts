import { makeSchema } from "@livestore/livestore";
import { WebWorkerStorage } from "@livestore/web/storage/web-worker";
import { makeDb } from "@livestore/web";
import LiveStoreWorker from "./worker.ts?worker";

import { tables } from "./tables.ts";
import { mutations } from "./mutations.ts";

export const livestore = makeDb(() =>
  WebWorkerStorage.load({ type: "opfs", worker: LiveStoreWorker })
);

export const schema = makeSchema({
  tables,
  mutations,
  migrations: { strategy: "from-mutation-log" },
});
