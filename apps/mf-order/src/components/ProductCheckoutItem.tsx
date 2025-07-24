import { Button, Colors } from "@aj.dev/easylib-ui";
import { ButtonSizes, ButtonVariants } from "@aj.dev/easylib-ui/Button";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const ProductCheckoutItem = ({
  product,
  quantity = 1,
  setQuantity,
}: {
  product: any;
  quantity?: number;
  setQuantity?: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="w-full mx-5 flex gap-2 rounded-md border-2 border-slate-200 items-center justify-between p-2">
      <div className="flex flex-col gap-2">
        <h2>{product.name}</h2>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-indigo-500">Quantity: {quantity}</p>
          <Button
            size={ButtonSizes.Icon}
            className="rounded-full w-6 h-6"
            variant={ButtonVariants.Outlined}
            color={Colors.Secondary}
            disabled={quantity < 2}
            onClick={() => setQuantity?.(quantity - 1)}
          >
            <Minus />
          </Button>
          <Button
            size={ButtonSizes.Icon}
            className="rounded-full w-6 h-6"
            variant={ButtonVariants.Outlined}
            color={Colors.Secondary}
            disabled={quantity >= product.quantity}
            onClick={() => setQuantity?.(quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <h2 className="text-xl text-red-700 font-semibold">
        Rs. {product.finalPrice * quantity}
      </h2>
    </div>
  );
};
