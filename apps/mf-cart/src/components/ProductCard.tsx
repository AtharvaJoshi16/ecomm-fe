import { Button, ButtonVariants, Colors, Sizes } from "@aj.dev/easylib-ui";
import { Chip, ChipVariants } from "@aj.dev/easylib-ui/Chip";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
export const ProductCard = ({
  product,
  cartItem,
  updateCartHandler,
  removeItem,
}: {
  product: any;
  cartItem: any;
  updateCartHandler: (cartItem: any, newQuantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
}) => {
  const { name, category, mrp, discount, description, finalPrice } = product;

  const handleAddQuantity = async () => {
    updateCartHandler(cartItem, cartItem.quantity + 1);
  };

  const handleReduceQuantity = async () => {
    updateCartHandler(cartItem, cartItem.quantity - 1);
  };

  return (
    <div className="flex flex-col gap-2 border-2 border-indigo-100 rounded-lg p-4 w-[300px]">
      <h2>{name}</h2>
      <Chip
        variant={ChipVariants.Mixed}
        color={Colors.Secondary}
        className="w-fit"
        label={(category as string).toUpperCase()}
        size={Sizes.Small}
      />
      {discount ? (
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">
            <span className="line-through text-sm text-slate-500">
              Rs. {mrp}
            </span>{" "}
            <span className="text-red-700">Rs. {finalPrice}</span>
          </p>
          <Chip
            color={Colors.Destructive}
            size={Sizes.Small}
            label={`${discount}%`}
            rounded
          />
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-700">Rs. {mrp}</p>
      )}
      <p className="text-slate-500 text-sm">{description}</p>
      <p className="text-primary font-semibold">
        Quantity: {cartItem?.quantity}
      </p>
      <div className="flex items-center gap-2">
        <Button
          className="w-full"
          variant={ButtonVariants.Outlined}
          color={Colors.Secondary}
          disabled={cartItem?.quantity <= 1}
          onClick={handleReduceQuantity}
        >
          <Minus />
        </Button>
        <Button
          className="w-full"
          variant={ButtonVariants.Outlined}
          color={Colors.Secondary}
          onClick={handleAddQuantity}
        >
          <Plus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="flex items-center gap-2 w-full"
          variant={ButtonVariants.Contained}
          color={Colors.Warning}
        >
          <ShoppingBag />
          Buy now
        </Button>
        <Button
          className="flex items-center gap-2 w-full"
          variant={ButtonVariants.Outlined}
          color={Colors.Destructive}
          onClick={() => removeItem(product.id)}
        >
          <Trash2 />
          Remove
        </Button>
      </div>
    </div>
  );
};
