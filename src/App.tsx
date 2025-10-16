import { BrowserRouter } from "react-router-dom";
import { AppLayoutResolver } from "@/app/layout/AppLayoutResolver";
import { AppRoutes } from "@/app/routes/AppRoutes";
import { Toaster } from "sonner";

export function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AppLayoutResolver> 
        <AppRoutes />
      </AppLayoutResolver>
    </BrowserRouter>
  );
};
