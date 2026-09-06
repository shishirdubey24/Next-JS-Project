import Link from "next/link";
import Image from "next/image";

import Shirt from "../../public/Category/Shirt.webp";
import Bedsheet from "../../public/Category/Bedsheet.webp";
import Blanket from "../../public/Category/Blanket.webp";
import Sports from "../../public/Category/Sports.webp";
import Tshirt from "../../public/Category/Tshirt.webp";
import Chinos from "../../public/Category/Chnos.webp";
import Ethnic from "../../public/Category/Ehenic.webp";
import Saree from "../../public/Category/Saree.jpg";

const categories = [
  { name: "Saree", image: Saree },
  { name: "Bedsheet", image: Bedsheet },
  { name: "Sports", image: Sports },
  { name: "T-Shirt", image: Tshirt },
  { name: "Shirt", image: Shirt },
  { name: "Blanket", image: Blanket },
  { name: "Chinos", image: Chinos },
  { name: "Ethnic", image: Ethnic },
];

export const CategorySection = () => {
  return (
    <section
      className="bg-white py-12 lg:py-16 px-4 lg:px-6"
      aria-labelledby="shop-by-category-heading"
    >
      <div className="max-w-350 mx-auto">
        <div className="mb-10 text-center">
          <h2
            id="shop-by-category-heading"
            className="text-[22px] sm:text-[28px] font-bold text-[#3e4152] tracking-[0.15em] uppercase"
          >
            SHOP BY CATEGORY
          </h2>

          <div className="mt-3 w-16 h-1 bg-[#ff3f6c] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center cursor-pointer max-w-25"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-3 relative mx-auto shadow-md group-hover:shadow-[0_0_0_2px_#ff3f6c] group-hover:p-0.5 group-hover:-translate-y-1 transition-all duration-300 ease-out">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    width={112}
                    height={112}
                    sizes="(min-width: 768px) 112px, (min-width: 640px) 96px, 80px"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <h3 className="text-[13px] sm:text-[14px] text-center font-bold tracking-wide text-[#282c3f] group-hover:text-[#ff3f6c] transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
