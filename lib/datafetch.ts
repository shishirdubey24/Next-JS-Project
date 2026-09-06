// 1. accept the category from client 2. Queery the Db 3. send the data to the client
import ProductModel from "@/models/productModel";
import type { Product } from "@/types/productsType";
import { mongoDBConnect } from "./mongoDb";
export async function getProductsByCategory(category: string): Promise<Product[]> {
  await mongoDBConnect();

  const products = await ProductModel.find({ category }).lean();

 return products.map((product)=>({
    ... product,
    image:`/productsImage/${product.image}`
 }))
}
