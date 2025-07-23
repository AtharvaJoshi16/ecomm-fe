import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProductCard } from "./ProductCard";
const ProductListing = () => {
  const [products, setProducts] = useState<any[]>();
  const [cartItems, setCartItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = JSON.parse(localStorage.getItem("user")!) ?? {};

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.SERVICE_URL}${process.env.PRODUCTS}`,
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
  }, [token]);

  const fetchCartItems = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.SERVICE_URL}${process.env.CART}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data?.items) {
        setCartItems(res.data?.items?.map((i: any) => i.productId));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const addProductToCart = async (product: any) => {
    try {
      const res = await axios.post(
        `${process.env.SERVICE_URL}${process.env.CART}`,
        {
          userId: id,
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        setCartItems((items) => [...items, product.id]);
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
        setCartItems((items) => items.filter((i) => i !== productId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    fetchProducts();
    fetchCartItems();
  }, [fetchProducts, fetchCartItems]);

  return (
    <div className="flex gap-4 items-center flex-wrap justify-center">
      {products?.map((product) => {
        return (
          <ProductCard
            product={product}
            onAddToCartClick={addProductToCart}
            onRemove={removeItemFromCart}
            isAddedToCart={cartItems.includes(product.id)}
          />
        );
      })}
    </div>
  );
};
export default ProductListing;
