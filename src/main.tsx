import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { AppProviders } from "./app/providers";
import { App } from "./App";
import { AuthProvider } from "./app/providers/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <AuthProvider>
          <App />
      </AuthProvider>
    </AppProviders>
  </React.StrictMode>
)