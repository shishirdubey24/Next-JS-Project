"use client";

import type { BagButtonProps } from "@/types/productsType";

const BagButton = ({ itemId }: BagButtonProps) => {
  const handleAddToBag = () => {
    console.log("Add product:", itemId);
  };

  return (
    <button
      type="button"
      onClick={handleAddToBag}
      className="w-full flex items-center justify-center gap-1.5 border border-gray-300 text-[11px] font-semibold py-1.5 rounded-sm
                           text-[#ff3f6c] hover:border-[#ff3f6c] hover:text-[#ff1654] transition"
    >
      ADD TO BAG
    </button>
  );
};

export default BagButton;
