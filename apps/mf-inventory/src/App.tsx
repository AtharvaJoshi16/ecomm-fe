import { Route, Routes } from "react-router";
import ProductListing from "./components/ProductListing";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductListing />} />
    </Routes>
  );
};

export default App;
