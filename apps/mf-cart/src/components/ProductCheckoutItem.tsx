export const ProductCheckoutItem = ({
  product,
  quantity,
}: {
  product: any;
  quantity: number;
}) => {
  return (
    <div className="flex gap-2 border-2 rounded-md border-indigo-100 items-center justify-between p-2">
      <div className="flex flex-col gap-2">
        <h2>{product.name}</h2>
        <p className="font-semibold text-indigo-500">Quantity: {quantity}</p>
      </div>
      <h2 className="text-lg text-red-700 font-semibold">
        Rs. {product.finalPrice}
      </h2>
    </div>
  );
};
