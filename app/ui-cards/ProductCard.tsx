import BagButton from "./BagButton";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import type { ProductCardProps } from "@/types/productsType";

export type { ProductCardProps } from "@/types/productsType";

const ProductCard = ({ item }: ProductCardProps) => {
  if (!item) {
    return (
      <div className="w-full p-4 bg-white rounded-sm border border-gray-200 text-center text-xs text-gray-600">
        No item available
      </div>
    );
  }

  const rawRating = item.rating;
  const discount = item.discount_percentage;

  const { image, company, category, item_name, current_price, original_price } =
    item;

  return (
    <article className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col h-full w-full">
      {/* Image */}
      <div className="relative w-full bg-gray-50">
        <div className="w-full h-0 pb-[135%] relative overflow-hidden">
          <Image
            src={image || "/images/img1.jpg"}
            alt={item_name || "product image"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {/* Rating pill – bottom left like Myntra */}
          {rawRating && (
            <div className="absolute bottom-2 left-2 bg-white/95 text-[11px] font-semibold text-gray-700 px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
              <span>{rawRating.stars ?? "N/A"}</span>
              <AiFillStar className="text-yellow-500 text-[12px]" />
              <span className="text-[10px] text-gray-500">
                ({rawRating.count ?? 0})
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Everything below is Server UI */}

      <div className="px-3 pt-2 pb-3">
        <div className="text-[13px] font-semibold text-gray-900">{company}</div>

        <div className="text-[11px] text-gray-500">{category}</div>

        <div className="mt-1 text-[12px] text-gray-700">{item_name}</div>

        <div className="mt-2">
          <span className="text-[13px] font-semibold">₹{current_price}</span>

          {original_price && (
            <span className="ml-2 text-[11px] line-through text-gray-400">
              ₹{original_price}
            </span>
          )}

          {discount && (
            <span className="ml-2 text-[11px] text-[#ff905a]">
              ({discount}% OFF)
            </span>
          )}
        </div>

        {/* Interactive button */}

        <div className="mt-2">
          <BagButton itemId={item.id} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
