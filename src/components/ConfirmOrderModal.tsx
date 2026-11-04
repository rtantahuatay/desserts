import { products } from "../data/products";

type ConfirmOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const sampleOrder = [
  { product: products[3], quantity: 1 },
  { product: products[1], quantity: 4 },
  { product: products[8], quantity: 2 },
];

const orderTotal = sampleOrder.reduce(
  (total, item) => total + item.product.price * item.quantity,
  0,
);

export default function ConfirmOrderModal({ isOpen, onClose }: ConfirmOrderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 md:items-center md:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white p-6 md:max-w-xl md:rounded-xl md:p-10"
      >
        <img src="/images/icon-order-confirmed.svg" alt="" className="size-12" />

        <h2 id="order-confirmed-title" className="mt-6 text-[40px] leading-tight font-bold">
          Order Confirmed
        </h2>
        <p className="mt-2 text-rose-500">We hope you enjoy your food!</p>

        <div className="mt-8 rounded-lg bg-rose-50 p-6">
          <ul>
            {sampleOrder.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center gap-4 border-b border-rose-100 py-4 first:pt-0"
              >
                <img src={product.image.thumbnail} alt="" className="size-12 rounded" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm">
                    <span className="mr-2 font-semibold text-brand">{quantity}x</span>
                    <span className="text-rose-500">@ ${product.price.toFixed(2)}</span>
                  </p>
                </div>

                <p className="font-semibold">${(product.price * quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-6">
            <p className="text-sm">Order Total</p>
            <p className="text-2xl font-bold">${orderTotal.toFixed(2)}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-full bg-brand py-4 font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}