import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  // used for accepting the props in all the childs in the App
  <ContextProvider>
    <App />
  </ContextProvider>
);
