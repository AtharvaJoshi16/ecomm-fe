import { Route, Routes } from "react-router";
import { PlaceOrderPage } from "./components/PlaceOrderPage";
import { YourOrdersPage } from "./components/YourOrdersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<YourOrdersPage />} />
      <Route path="/place-order/:id" element={<PlaceOrderPage />} />
    </Routes>
  );
};

export default App;
