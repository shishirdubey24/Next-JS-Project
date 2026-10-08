"use client";
import type { ProductIdProps } from "@/types/product";
import { addToCart } from "@/lib/actions/cartActions";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ productId }: ProductIdProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleAddToBag = async () => {
    console.log("Authentication check before adding to bag:", isAuthenticated);

    if (!isAuthenticated) {
      console.warn("Please sign in before adding items to your bag.");
      router.push("/auth/identifyUser");
      return;
    }

    console.log("Add product:", productId);
    await addToCart(productId);
    router.refresh(); // Refresh the page to update the bag count
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

export default AddToCartButton;
