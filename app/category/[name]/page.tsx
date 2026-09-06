import ProductCard from "@/app/ui-cards/ProductCard";
import { getProductsByCategory } from "@/lib/datafetch";
import type { CategoryPageProps, Product } from "@/types/productsType";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  const products: Product[] = await getProductsByCategory(name);
  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {products.map((item: Product) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
