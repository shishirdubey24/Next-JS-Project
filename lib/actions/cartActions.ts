"use server";
import { mongoDBConnect } from "@/lib/mongoDb";
import CartItemModel from "@/models/cartModel";
import { verifyAuthToken } from "../auth/verifyAuthToken";
export async function addToCart(productId: string) {
  await mongoDBConnect();

  // Temporary user ID for now.
  // Later this will come from the logged-in user's session.
  const userToken=await verifyAuthToken();
  if(!userToken){
    return null;
  }
  const{userId,sessionID}=userToken;

console.log("sessionID of current is",sessionID)
  console.log("userID for add to cart",userId)
  if(!userId){
    throw new Error ("unatyhorized");
  }
  const cart = await CartItemModel.findOne({ userId });

  if (!cart) {
    await CartItemModel.create({
      userId,
      items: [{ productId }],
    });
    return { success: true };
  }

  const existingItem = cart.items.find(
    (item: { productId: string }) =>
      item.productId === productId
  );

  if (existingItem) {
    return {success: false, message: "Product already in cart."};
    }

   cart.items.push({ productId });
  await cart.save();

  return { success: true };
}

// Delete a product from the cart
export async function deleteFromCart(productId: string) {
  await mongoDBConnect();
   const userToken=await verifyAuthToken();
  if(!userToken){
    return null;
  }
  const{userId}=userToken;
  const cart = await CartItemModel.findOne({ userId });

  if (!cart) {
    return { success: false, message: "Cart not found." };
  }
   await CartItemModel.updateOne(
    {userId},
    {$pull: {items: {productId}}}
   );
}

