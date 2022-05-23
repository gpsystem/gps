import React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App";

const root: Root = createRoot(document.getElementById("app")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
