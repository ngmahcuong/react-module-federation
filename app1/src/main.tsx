// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import r2wc from "@r2wc/react-to-web-component";

customElements.define("remote-app", r2wc(App));

console.log("Remote app loaded");
