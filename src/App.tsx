import { BrowserRouter } from "react-router-dom";
import { Layout } from "./app/layout/Layout";
import { AppRoutes } from "./app/routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <Layout> 
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};
