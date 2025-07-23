import "@aj.dev/easylib-ui/style.css";
import { createRoot } from "react-dom/client";
import "../../../packages/tailwind-config/styles";
import { App } from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
