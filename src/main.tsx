import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";

import "./index.css";

import { LiveStoreProvider } from "@livestore/livestore/react";
import { livestore, schema } from "./livestore/index.ts";
import { DevtoolsLazy } from "@livestore/devtools-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LiveStoreProvider
      schema={schema}
      fallback={<div>Loading ...</div>}
      makeDb={livestore}
    >
      <App />

      <DevtoolsLazy schema={schema} />
    </LiveStoreProvider>
  </StrictMode>,
);
