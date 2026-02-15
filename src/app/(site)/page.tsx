import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import QuickLinks from "@/components/Home/QuickLinks";
import Reviews from "@/components/Home/Reviews";
import { getHomePage, getVitrineImageUrl } from "@/lib/getHomePage";

export default async function Home() {
  const homeData = await getHomePage();
  const vitrineImage = homeData?.vitrineImage ? getVitrineImageUrl(homeData.vitrineImage) : null;

  return (
    <>
      <Hero vitrineImage={vitrineImage} />
      <FeaturedProducts />
      <QuickLinks />
      <Reviews />
    </>
  );
}
