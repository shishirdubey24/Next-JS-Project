import ProductCard from "@/app/ui-cards/ProductCard";
import { getProductsByCategory } from "@/lib/datafetch";
import type { Product } from "@/types/productsType";

export default async function FeaturedProducts() {
  const products: Product[] = await getProductsByCategory("Featured");

  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center flex flex-col items-center">
          <h2
            id="featured-products-heading"
            className="text-[22px] sm:text-[28px] font-bold text-[#3e4152] tracking-[0.15em] uppercase"
          >
            FEATURED TRENDS{" "}
          </h2>
          <div className="mt-3 w-16 h-1 bg-[#ff3f6c] rounded-full shadow-sm"></div>
          <p className="mt-5 text-[15px] text-[#696e79] font-medium max-w-[500px] mx-auto">
            {" "}
            Handpicked styles, inspired by what shoppers love right now{" "}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {products.map((item: Product) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
