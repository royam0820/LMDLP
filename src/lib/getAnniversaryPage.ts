import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const ANNIVERSARY_PAGE_QUERY = defineQuery(`*[_type == "anniversaryPage"][0]{
  formulaIncludes,
  pricePerChild,
  animatorFee,
  minChildren,
  assistantFee,
  deposit,
  sundayFee
}`);

export interface AnniversaryPageData {
    formulaIncludes?: string[];
    pricePerChild?: number;
    animatorFee?: number;
    minChildren?: number;
    assistantFee?: number;
    deposit?: number;
    sundayFee?: number;
}

export async function getAnniversaryPage(): Promise<AnniversaryPageData | null> {
    try {
        const data = await client.fetch(ANNIVERSARY_PAGE_QUERY, {}, { next: { revalidate: 60 } });
        return data;
    } catch (error) {
        console.error("Error fetching anniversary page data:", error);
        return null;
    }
}
