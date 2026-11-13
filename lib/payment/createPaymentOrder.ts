//fetch bag items calculate the total price then create order_ID
import { getBagItems } from "../data/cartData"
import mongoose from "mongoose"
import Address from "@/models/addressModel"
import Order from "@/models/orderMode"
import type { OrderItem } from "@/types/order";

let legacyOrderIndexCheck: Promise<void> | undefined;

const removeObsoleteOrderIdIndex = async () => {
  if (!legacyOrderIndexCheck) {
    legacyOrderIndexCheck = (async () => {
      try {
        const indexes = await Order.collection.indexes();
        const legacyIndex = indexes.find(
          (index) =>
            index.name === "orderId_1" &&
            index.unique === true &&
            index.key?.orderId === 1 &&
            Object.keys(index.key).length === 1,
        );

        if (legacyIndex) {
          await Order.collection.dropIndex("orderId_1");
          console.warn(
            "[payment:create-order] Removed obsolete unique orderId_1 index; orders use _id now",
          );
        }
      } catch (error) {
        // An uninitialized collection has no legacy index to remove.
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === 26
        ) {
          return;
        }
        legacyOrderIndexCheck = undefined;
        throw error;
      }
    })();
  }

  await legacyOrderIndexCheck;
};

export const CreateOrder=async(userId:string,addressId:string)=>{
  try{
    const cartItems=await getBagItems()
     await removeObsoleteOrderIdIndex();
     console.info("[payment:create-order] Cart loaded", { itemCount: cartItems.length, productIds: cartItems.map((item) => item.id) });
     if (cartItems.length === 0) throw new Error("Your cart is empty.");
     const filteredItems: OrderItem[] = cartItems.map((item) => ({
       productId: item.id,
       price: Number(item.original_price ?? 0),
     }));
         const subtotal=filteredItems.reduce((acc,item)=>acc+item.price,0)
          const discount = 200;
           const deliveryFee = 0;
    const totalPrice = Math.max(0, subtotal - discount + deliveryFee);
    console.info("[payment:create-order] Validating delivery address", { addressId, userId });
       if (!mongoose.Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address ID");
    }

    const address = await Address.findOne({
      _id: addressId,
      userId,
    });

    if (!address) {
      throw new Error("Address not found");
    }
    console.info("[payment:create-order] Creating database order", { itemCount: filteredItems.length, totalPrice });
    const order=await Order.create({
      userId,
      addressId,
      items: filteredItems,
      totalPrice,
      currency: "INR",
      status: "PENDING",
      paymentStatus: "PENDING",
    })
    console.info("[payment:create-order] Database order created", { orderId: order._id.toString() });
    return{
      success:true,
      orderId:order._id.toString(),
      totalPrice:order.totalPrice,
      currency:order.currency
    }
  }
     catch (error) {
  console.error("[payment:create-order] Failed", error);

  return {
    success: false as const,
    message:
      error instanceof Error
        ? error.message
        : "Unknown error while creating order",
  };
}
}
