import {
  Button,
  ButtonVariants,
  Colors,
  Modal,
  Sizes,
} from "@aj.dev/easylib-ui";
import { Chip, ChipVariants } from "@aj.dev/easylib-ui/Chip";
// import { Modal } from "@aj.dev/easylib-ui/Modal";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductCheckoutItem } from "./ProductCheckoutItem";
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
  const [showOrderModal, setShowModal] = useState(false);

  const handleAddQuantity = async () => {
    updateCartHandler(cartItem, cartItem.quantity + 1);
  };

  const handleReduceQuantity = async () => {
    updateCartHandler(cartItem, cartItem.quantity - 1);
  };

  return (
    <>
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
          <Modal
            open={showOrderModal}
            slotProps={{
              trigger: {
                className: "w-full",
              },
            }}
            trigger={
              <Button
                className="flex items-center gap-2 w-full"
                variant={ButtonVariants.Contained}
                color={Colors.Warning}
                onClick={() => setShowModal(true)}
              >
                <ShoppingBag />
                Buy now
              </Button>
            }
            header={
              <div className="text-lg font-semibold text-indigo-500">
                Place order
              </div>
            }
            footer={
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant={ButtonVariants.Outlined}
                  color={Colors.Secondary}
                >
                  Back
                </Button>
                <Button color={Colors.Secondary}>Place order</Button>
              </div>
            }
            content={
              <ProductCheckoutItem
                product={product}
                quantity={cartItem?.quantity}
              />
            }
            onOpenChange={setShowModal}
          />

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
    </>
  );
};
