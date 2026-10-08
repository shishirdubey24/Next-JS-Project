import CartModel from "@/models/cartModel";
import ProductModel from "@/models/productModel";
import { verifyAuthToken } from "../auth/verifyAuthToken";
import { mongoDBConnect } from "@/lib/mongoDb";
import type { Product } from "@/types/product";
// product fetching and counting length of the bag items
export const getBagItems = async (): Promise<Product[]> => {
  await mongoDBConnect();

     const userToken=await verifyAuthToken();
  if(!userToken){
    return [];
  }
  const {userId}=userToken
const cart = await CartModel.findOne({ userId }).lean();
 if (!cart || cart.items.length === 0) {
    return (
        []
    );
  }
  const productIds=cart.items.map((item) => item.productId);
    const products = await ProductModel.find({ id: { $in: productIds } }).lean();
    const bagItems=products.map((product)=>({
       ...product,
         image: `/productsImage/${product.image}`,
    }))
    return bagItems;
}
export const getBagItemsCount = async (): Promise<number > => {
 await mongoDBConnect();
   const userToken=await verifyAuthToken();
  if(!userToken){
    return 0;
  }
  const {userId}=userToken
 const cart=await CartModel.findOne({ userId},{ "items.productId": 1, _id: 0 }).lean();
  if (!cart || cart.items.length === 0) {
    return 0;
  }
  return cart.items.length;
}
