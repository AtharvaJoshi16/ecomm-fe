import { Button, Colors } from "@aj.dev/easylib-ui";
import axios from "axios";
import { CircleDollarSign } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProductCard } from "./ProductCard";
export const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";
  const { id } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined;

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);

  const fetchCartItems = useCallback(async () => {
    try {
      console.log(id);
      if (id && token) {
        const res = await axios.get(
          `${process.env.SERVICE_URL}${process.env.CART}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data?.items) {
          setCartItems(res.data?.items);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchCartProductDetails = useCallback(async (productIds: string[]) => {
    try {
      const res = await axios.post(
        `${process.env.SERVICE_URL}${process.env.PRODUCTS}/getProductsByIds`,
        productIds,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data?.products) {
        setProducts(res.data?.products);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateCartProductQuantity = async (
    cartItem: any,
    newQuantity: number
  ) => {
    try {
      const res = await axios.put(
        `${process.env.SERVICE_URL}${process.env.CART}`,
        {
          productId: cartItem.productId,
          userId: cartItem.userId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 204) {
        let copy = [...cartItems];
        let idx = copy.findIndex(
          (item) => item.productId === cartItem.productId
        );
        copy[idx].quantity = newQuantity;
        setCartItems(copy);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      const res = await axios.delete(
        `${process.env.SERVICE_URL}${process.env.CART}/${id}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 204) {
        fetchCartItems();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    !!cartItems.length &&
      fetchCartProductDetails(cartItems.map((i) => i.productId));
  }, [cartItems]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4 px-5">
        <h2 className="text-indigo-500 text-xl font-semibold">Your Cart</h2>
        <Button
          color={Colors.Warning}
          className="rounded-full flex items-center gap-2"
        >
          <CircleDollarSign />
          Checkout
        </Button>
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {products.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.productId === product.id
          );
          return (
            <ProductCard
              product={product}
              updateCartHandler={updateCartProductQuantity}
              cartItem={cartItem}
              removeItem={removeItemFromCart}
            />
          );
        })}
      </div>
    </div>
  );
};
