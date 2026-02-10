import { client } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/queries";

export interface Testimonial {
    _id: string;
    name: string;
    text: string;
    rating: number;
    date?: string;
}

export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
    try {
        const query = limit
            ? `*[_type == "testimonial"] | order(date desc, _createdAt desc)[0...${limit}] { _id, name, text, rating, date }`
            : TESTIMONIALS_QUERY;

        const testimonials = await client.fetch(query);
        return testimonials;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}
