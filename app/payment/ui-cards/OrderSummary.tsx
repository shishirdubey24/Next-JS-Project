import Image from "next/image";
import type { Product } from "@/types/product";
import PayNowBtn from "./PayNowBtn";
//import { useCheckoutAddress } from "./SharedCheckoutAddress";
type OrderSummaryProps = {
  bagItems: Product[];
};

const formatPrice = (price: number | null | undefined): string =>
  (price ?? 0).toLocaleString("en-IN");

const OrderSummary = ({ bagItems }: OrderSummaryProps) => {
  const items: Product[] = bagItems;
  //const { selectedAddress } = useCheckoutAddress();

  const subtotal: number = items.reduce(
    (total: number, item: Product) => total + Number(item.original_price ?? 0),
    0,
  );

  const discount: number = 200;
  const deliveryFee: number = 0;
  const total: number = subtotal - discount + deliveryFee;

  return (
    <div className="w-full space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Order Summary
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Review your order before payment.
        </p>
      </div>

      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-800">
          Items in Your Order ({items.length})
        </h3>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.image || "/images/placeholder.png"}
                  alt={item.item_name ?? "Product Image"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                <div>
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {item.company}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-600">
                    {item.item_name}
                  </p>
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  ₹{formatPrice(item.original_price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-4 sm:p-5">
        <h3 className="border-b border-gray-200 pb-3 text-sm font-semibold text-gray-900">
          Price Details
        </h3>

        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-start justify-between gap-3 text-gray-600">
            <span>Price ({items.length} items)</span>
            <span className="shrink-0 font-medium text-gray-900">
              ₹{formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 text-gray-600">
            <span>Discount</span>
            <span className="shrink-0 font-medium text-green-700">
              -₹{formatPrice(discount)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 text-gray-600">
            <span>Delivery Fee</span>
            <span className="shrink-0 font-medium text-green-700">
              {deliveryFee === 0 ? "FREE" : `₹${formatPrice(deliveryFee)}`}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-dashed border-gray-300 pt-4">
          <span className="text-base font-semibold text-gray-900">
            Total Amount
          </span>
          <span className="text-xl font-bold text-gray-900">
            ₹{formatPrice(total)}
          </span>
        </div>

        <p className="mt-3 text-xs font-medium text-green-700">
          You save ₹{formatPrice(discount)} on this order.
        </p>
      </section>

      <div className="space-y-3">
        <PayNowBtn />
        <p className="text-center text-xs leading-5 text-gray-500">
          Secure payment powered by Razorpay. Your payment will be verified
          before the order is confirmed.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
