import { Button, ButtonVariants, Colors } from "@aj.dev/easylib-ui";
import { Package, PackageCheck, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Header = () => {
  const token = localStorage.getItem("token")! ?? "";
  const { email, id, role } = localStorage.getItem("user")!
    ? JSON.parse(localStorage.getItem("user")! ?? "")
    : {};

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };
  return (
    <div className="flex items-center p-4 justify-between shadow">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-indigo-500">Ecommerce App</h2>
        {!!token && (
          <div className="ml-4 flex items-center gap-2">
            <Button
              color={Colors.Secondary}
              variant={ButtonVariants.Text}
              className="flex items-center gap-2"
              onClick={() => {
                navigate("/");
              }}
            >
              <Package />
              Products
            </Button>
            <Button
              color={Colors.Secondary}
              variant={ButtonVariants.Text}
              className="flex items-center gap-2"
              onClick={() => {
                navigate("/orders");
              }}
            >
              <PackageCheck />
              Orders
            </Button>
            <Button
              color={Colors.Secondary}
              variant={ButtonVariants.Text}
              className="flex items-center gap-2"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <ShoppingCart />
              Cart
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col text-sm">
          <p>{email}</p>
          <p>{role}</p>
        </div>
        {token && (
          <Button color={Colors.Destructive} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};
