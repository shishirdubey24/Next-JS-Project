import { Banner } from "./ui-cards/Banner";
import { CategorySection } from "./ui-cards/CategorySection";
import FeaturedProductsSection from "./ui-cards/FeaturedProductsSection";
export default function Home() {
  return (
    <>
      <Banner />
      <CategorySection />
      <FeaturedProductsSection />
    </>
  );
}
