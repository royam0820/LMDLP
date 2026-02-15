import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from "@/sanity/queries";
import { products as localProducts, Product } from "@/data/products";

// Helper to map Sanity result to our Product type
const mapSanityToProduct = (sanityItem: any): Product => ({
    id: sanityItem._id,
    name: sanityItem.name,
    // If image is present, build URL, else fallback to placeholder or keep undefined (handled by component)
    image: sanityItem.image ? urlFor(sanityItem.image).url() : "/images/placeholder.png",
    age: sanityItem.age,
    description: sanityItem.description,
    isNew: sanityItem.isNew,
});

export async function getProducts(): Promise<Product[]> {
    try {
        const sanityData = await client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 60 } });
        if (sanityData && sanityData.length > 0) {
            return sanityData.map(mapSanityToProduct);
        }
    } catch (error) {
        console.warn("Sanity fetch failed, falling back to local data:", error);
    }
    // Fallback
    return localProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const sanityData = await client.fetch(FEATURED_PRODUCTS_QUERY, {}, { next: { revalidate: 60 } });
        if (sanityData && sanityData.length > 0) {
            return sanityData.map(mapSanityToProduct);
        }
    } catch (error) {
        console.warn("Sanity fetch failed, falling back to local data:", error);
    }
    // Fallback: Local filtering
    return localProducts.filter(p => p.isNew).slice(0, 8);
}
