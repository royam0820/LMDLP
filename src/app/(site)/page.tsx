import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import QuickLinks from "@/components/Home/QuickLinks";
import Reviews from "@/components/Home/Reviews";
import SeasonalCampaignTeaser from "@/components/Home/SeasonalCampaignTeaser";
import { getHomePage, getVitrineImageUrl } from "@/lib/getHomePage";
import { getActiveSeasonalCampaigns } from "@/lib/getSeasonalCampaign";

interface HomeProps {
  searchParams?: Promise<{ theme?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const previewTheme = resolvedSearchParams?.theme;

  const [homeData, activeCampaigns] = await Promise.all([
    getHomePage(),
    getActiveSeasonalCampaigns(previewTheme),
  ]);

  const vitrineImage = homeData?.vitrineImage ? getVitrineImageUrl(homeData.vitrineImage) : null;

  return (
    <>
      <Hero vitrineImage={vitrineImage} />
      <SeasonalCampaignTeaser campaigns={activeCampaigns} previewTheme={previewTheme} />
      <FeaturedProducts />
      <QuickLinks />
      <Reviews />
    </>
  );
}
