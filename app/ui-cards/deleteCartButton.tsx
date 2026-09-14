"use client";
import type { BagButtonProps } from "@/types/productsType";
import { deleteFromCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
const DeleteCartButton = ({ productId }: BagButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteFromBag = async () => {
    console.log("Delete product:", productId);
    setIsDeleting(true);
    try {
      await deleteFromCart(productId);
      router.refresh();
      setShowConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      {" "}
      {/* Delete Button */}
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        aria-label="Remove product from bag"
        className="group self-start rounded-full p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
      >
        {" "}
        <Trash2
          size={20}
          className="transition-transform duration-200 group-hover:scale-110"
        />{" "}
      </button>{" "}
      {/* Confirmation Modal */}{" "}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          {" "}
          <div className="w-[90%] max-w-md bg-white rounded-sm shadow-xl">
            {" "}
            {/* Header */}{" "}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              {" "}
              <h2 className="text-lg font-semibold text-gray-900">
                {" "}
                Remove Product{" "}
              </h2>{" "}
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
                aria-label="Close"
              >
                {" "}
                <X size={20} />{" "}
              </button>{" "}
            </div>{" "}
            {/* Content */}{" "}
            <div className="px-6 py-7">
              {" "}
              <p className="text-sm text-gray-700">
                {" "}
                Are you sure you want to remove this product from your bag?{" "}
              </p>{" "}
            </div>{" "}
            {/* Actions */}{" "}
            <div className="flex border-t border-gray-200">
              {" "}
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-r border-gray-200 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                {" "}
                DON`T REMOVE{" "}
              </button>{" "}
              <button
                type="button"
                onClick={handleDeleteFromBag}
                disabled={isDeleting}
                className="flex-1 py-4 text-sm font-semibold text-[#ff3f6c] hover:bg-gray-50 cursor-pointer disabled:opacity-50"
              >
                {" "}
                {isDeleting ? "REMOVING..." : "REMOVE"}{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};
export default DeleteCartButton;
