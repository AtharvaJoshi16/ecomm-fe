import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<>Auth Home</>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
