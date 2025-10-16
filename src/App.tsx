import { BrowserRouter } from "react-router-dom";
import { Layout } from "./app/layout/Layout";
import { AppRoutes } from "./app/routes/AppRoutes";
import { Toaster } from "sonner";

export function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Layout> 
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};
