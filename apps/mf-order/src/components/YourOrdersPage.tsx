import { useUser } from "@repo/utils/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";

export const YourOrdersPage = () => {
  const { token, id } = useUser();
  const [orders, setOrders] = useState<any[]>([]);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [err, setErr] = useState("");
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.SERVICE_URL}${process.env.ORDER}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data?.orders) {
        setOrders(res.data?.orders);
      }
    } catch (e: any) {
      setErr(e?.response?.data?.err);
    }
  }, [id]);

  const fetchProductDetails = useCallback(async (productIds: string[]) => {
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
        setProductDetails(res.data?.products);
      }
    } catch (e: any) {
      setErr(e?.response?.data?.err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    const productIds = orders.map((o) => o.productId);
    !!orders.length && fetchProductDetails(productIds);
  }, [orders]);
  return (
    <div className="flex flex-col items-center gap-4 mt-[50px]">
      <h2 className="text-xl font-semibold">Your Orders</h2>
      <div className="flex gap-2 items-center justify-center flex-wrap">
        {!!orders.length &&
          !!productDetails.length &&
          orders.map((order) => {
            return (
              <OrderItem
                product={productDetails.find((p) => p.id === order?.productId)}
                order={order}
              />
            );
          })}
      </div>
    </div>
  );
};
