import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { AppProviders } from "@/app/providers";
import { App } from "@/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
        <App />
    </AppProviders>
  </React.StrictMode>
);
