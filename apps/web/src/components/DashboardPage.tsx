import { lazy } from "react";

const ProductListing = lazy(() => import("mf_inventory/ProductListing"));
export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full p-4">
        <h2>Welcome to Dashboard!</h2>
        <ProductListing />
      </div>
    </div>
  );
};
