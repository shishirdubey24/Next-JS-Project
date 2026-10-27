"use client";

import { useRouter } from "next/navigation";

const CheckoutButton = () => {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/payment");
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="w-full bg-[#ff3f6c] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#e7335f]"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
