import Image from "next/image";
import type { Product } from "@/types/product";

type CheckoutItemsProps = {
  bagItems: Product[];
};

const CheckoutItems = ({ bagItems }: CheckoutItemsProps) => {
  return (
    <div className="space-y-4">
      {bagItems.map((item) => (
        <article
          key={item.id}
          className="flex gap-4 border border-gray-200 bg-white p-4"
        >
          {/* Product image */}
          <div className="relative h-32 w-24 shrink-0 bg-gray-50 sm:h-36 sm:w-28">
            <Image
              src={item.image || "/images/img1.jpg"}
              alt={item.item_name || "Product image"}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>

          {/* Product details */}
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-sm font-semibold text-gray-900">
              {item.company}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {item.item_name}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-gray-900">
                ₹{item.current_price}
              </span>

              {item.original_price != null && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.original_price}
                </span>
              )}

              {item.discount_percentage != null &&
                item.discount_percentage > 0 && (
                  <span className="text-xs font-medium text-[#ff905a]">
                    {item.discount_percentage}% OFF
                  </span>
                )}
            </div>

            <p className="mt-auto pt-3 text-xs text-gray-500">
              Delivery by {item.delivery_date || "Date to be confirmed"}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CheckoutItems;
