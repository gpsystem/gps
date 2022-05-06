import React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";

function App(): JSX.Element {
  return <h1 className="text-red-600">Testing</h1>;
}

const root: Root = createRoot(document.getElementById("app")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
