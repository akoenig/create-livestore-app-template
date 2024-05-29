import { makeWorker } from "@livestore/web/storage/web-worker/worker";
import { schema } from "./index.ts";

makeWorker({ schema });
