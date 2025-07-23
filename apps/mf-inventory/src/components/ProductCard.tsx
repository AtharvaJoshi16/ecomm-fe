import { Button, ButtonVariants, Colors, Sizes } from "@aj.dev/easylib-ui";
import { Chip, ChipVariants } from "@aj.dev/easylib-ui/Chip";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
export const ProductCard = ({
  product,
  onAddToCartClick,
  onRemove,
  isAddedToCart = false,
}: {
  product: any;
  onAddToCartClick: (product: any) => Promise<void>;
  onRemove: (product: any) => Promise<void>;
  isAddedToCart?: boolean;
}) => {
  const { name, category, mrp, discount, quantity, description, finalPrice } =
    product;
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await onAddToCartClick?.(product);
    setLoading(false);
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    await onRemove(product.id);
    setLoading(false);
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
      {!isAddedToCart ? (
        <Button
          color={Colors.Warning}
          variant={ButtonVariants.Contained}
          disabled={quantity === 0}
          className="flex items-center gap-2"
          onClick={handleAddToCart}
          loading={loading}
        >
          {!loading && <ShoppingCart />}
          {loading ? "Adding" : "Add To Cart"}
        </Button>
      ) : (
        <Button
          color={Colors.Destructive}
          variant={ButtonVariants.Outlined}
          disabled={quantity === 0}
          className="flex items-center gap-2"
          onClick={handleRemoveFromCart}
          loading={loading}
        >
          {!loading && <Trash2 />}
          {loading ? "Removing" : "Remove From Cart"}
        </Button>
      )}
    </div>
  );
};
