import { Button, Colors, Textfield } from "@aj.dev/easylib-ui";
import Alert from "@aj.dev/easylib-ui/Alert";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProductCheckoutItem } from "./ProductCheckoutItem";

export const PlaceOrderPage = () => {
  const { id: productId } = useParams();
  const transactionId = useMemo(() => crypto.randomUUID(), []);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState<any>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const fetchProductDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.SERVICE_URL}${process.env.PRODUCTS}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(res.data?.product);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const onPlaceOrderClick = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.SERVICE_URL}${process.env.ORDER}`,
        {
          userId: id,
          productId,
          quantity,
          paymentId: transactionId,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data?.orderId) {
        setMessage(`Order placed: #${res.data.orderId}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[50px]">
      <div className="flex flex-col gap-4 p-4 w-[700px] border-2 rounded-lg items-center">
        {message && <Alert color={Colors.Success} title={message} />}
        <h2 className="text-xl font-bold">
          Place Order for Product <span className="text-indigo-500">#{id}</span>
        </h2>
        {product && (
          <ProductCheckoutItem
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        )}
        <Textfield
          classes={{
            wrapper: "w-full",
          }}
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          label={{
            id: "address",
            label: "Delivery Address",
          }}
          placeholder="Flat/House No. / Building / City / State"
        />
        <Textfield
          classes={{
            wrapper: "w-full",
          }}
          id="paymentId"
          label={{
            id: "paymentId",
            label: "Transaction ID",
          }}
          value={transactionId}
          disabled
        />
        <Button
          color={Colors.Success}
          className="w-full"
          onClick={onPlaceOrderClick}
          disabled={!address}
          loading={loading}
        >
          {loading ? "Placing order" : "Place Order"}
        </Button>
      </div>
    </div>
  );
};
