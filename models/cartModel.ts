import mongoose, { type Model, Schema } from 'mongoose';
import type { Cart } from "@/types/product";
const CartItemSchema = new Schema<Cart>({
    userId: {
    type: String,
    },
  items:[
    {
      productId: {
    type: String,
    required: true,
    } 
    }
    
  ]  
   
});
const CartModel: Model<Cart> =
  (mongoose.models.CartItem as Model<Cart> | undefined) ??
  mongoose.model<Cart>('CartItem', CartItemSchema);
export default CartModel
;
