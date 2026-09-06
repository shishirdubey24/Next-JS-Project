import { Banner } from "./ui-cards/Banner";
import { CategorySection } from "./ui-cards/Category";
import FeaturedProducts from "./ui-cards/FeaturedProducts";
export default function Home() {
  return (
    <>
      <Banner />
      <CategorySection />
      <FeaturedProducts />
    </>
  );
}
