import { Route, Routes } from "react-router";
import { CartPage } from "./components/CartPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CartPage />} />
    </Routes>
  );
};

export default App;
