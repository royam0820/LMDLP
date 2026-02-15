import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

const HOMEPAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
  vitrineImage
}`);

export interface HomePageData {
    vitrineImage: SanityImageSource | null;
}

export async function getHomePage(): Promise<HomePageData | null> {
    try {
        const data = await client.fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60 } });
        return data;
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return null;
    }
}

export function getVitrineImageUrl(source: SanityImageSource | null) {
    return source ? urlFor(source).url() : null;
}
