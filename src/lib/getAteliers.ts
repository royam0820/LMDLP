
import { client } from "@/sanity/lib/client";
import { ATELIERS_QUERY } from "@/sanity/queries";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

export interface Atelier {
    _id: string;
    title: string;
    slug: string;
    image: SanityImageSource | null;
    description: string;
    ageRange: string;
    schedule: string;
    period: "year" | "holidays";
    organizer: "codeacademy123" | "lmdpl";
    price: number;
    sessionsCount?: number;
    startDate?: string;
    endDate?: string;
    bookingUrl?: string;
}

export async function getAteliers(): Promise<Atelier[]> {
    try {
        const ateliers = await client.fetch(ATELIERS_QUERY);

        // Map Sanity results to our interface if needed (mostly for image handling)
        // If no ateliers found (empty array), we could fallback to mock data if we had any, 
        // but for now we'll return the empty array or the fetched data.

        return ateliers.map((atelier: any) => ({
            ...atelier,
            // Ensure image is usable string url if possible, or keep as object to be used with <urlFor>
            // For simplicity in this project we utilize the helper in components, 
            // but let's just pass the data through.
        }));
    } catch (error) {
        console.error("Error fetching ateliers from Sanity:", error);
        return [];
    }
}

export function getAtelierImageUrl(source: SanityImageSource | null) {
    return source ? urlFor(source).url() : "";
}
