import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./app/layout/AppLayout";
import { AppRoutes } from "./app/routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <AppLayout> 
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  );
};
