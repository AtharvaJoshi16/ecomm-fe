import "@repo/tailwind-config/styles";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage } from "./components/DashboardPage";
import Layout from "./components/Layout";

const AuthApp = lazy(() => import("mf_auth/App"));
const InventoryApp = lazy(() => import("mf_inventory/App"));
const CartApp = lazy(() => import("mf_cart/App"));
export const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/auth/*" element={<AuthApp />} />
            <Route path="/inventory/*" element={<InventoryApp />} />
            <Route path="/cart/*" element={<CartApp />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};
