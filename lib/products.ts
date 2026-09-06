
export async function getProductByCategory(category:string){
  const products = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!products.ok) {
    throw new Error("Failed to fetch products");
  }
 
}
