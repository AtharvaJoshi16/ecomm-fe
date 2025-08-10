import { useNavigate } from "react-router";

export const useUser = () => {
  const token = localStorage.getItem("token") ?? "";
  const { id } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "{}")
    : undefined;
  const navigate = useNavigate();
  if (!token) {
    navigate("/auth/login");
  }
  return { token, id };
};
