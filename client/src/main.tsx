import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./journey.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Elemento raiz do MVP não encontrado.");
}

createRoot(root).render(<App />);
