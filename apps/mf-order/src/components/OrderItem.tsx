import { Colors, Sizes } from "@aj.dev/easylib-ui";
import Chip from "@aj.dev/easylib-ui/Chip";

export const OrderItem = ({ product, order }: { product: any; order: any }) => {
  const { name, finalPrice, mrp, id: productId } = product;
  const {
    address,
    createdAt,
    id: orderId,
    paymentId,
    status,
    updatedAt,
    quantity,
  } = order;
  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-indigo-300 rounded-lg">
      <div className="flex items-center gap-1">
        <h3 className="text-lg">{name}</h3>
        <Chip
          className="w-fit rounded-full"
          label={quantity}
          size={Sizes.Small}
        />
      </div>
      <Chip color={Colors.Secondary} label={status} className="w-fit" />
      <p className="text-slate-500 text-xs">Order ID: {orderId}</p>
      <p className="text-slate-500 text-xs">Transaction ID: {paymentId}</p>
    </div>
  );
};
