import "@aj.dev/easylib-ui/style.css";
import "@repo/tailwind-config/styles";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

// Only wrap with BrowserRouter in local development
const isStandalone =
  window.location.pathname === "/" || window.origin.includes("3004");

root.render(
  isStandalone ? (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) : (
    <App />
  )
);
