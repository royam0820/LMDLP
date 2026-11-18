import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from "@/sanity/queries";
import { products as localProducts, Product } from "@/data/products";

// Helper to map Sanity result to our Product type
const mapSanityToProduct = (sanityItem: any): Product => ({
    id: sanityItem._id,
    name: sanityItem.name,
    sku: sanityItem.sku,
    slug: sanityItem.slug,
    // If image is present, build URL, else fallback to placeholder or keep undefined (handled by component)
    image: sanityItem.image ? urlFor(sanityItem.image).url() : "/images/placeholder.png",
    age: sanityItem.age,
    description: sanityItem.description,
    price: sanityItem.price,
    isNew: sanityItem.isNew,
});

export async function getProducts(): Promise<Product[]> {
    try {
        const sanityData = await client.withConfig({ useCdn: false }).fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 0 } });
        if (sanityData && sanityData.length > 0) {
            return sanityData.map(mapSanityToProduct);
        }
    } catch (error) {
        console.warn("Sanity fetch failed, falling back to local data:", error);
    }
    // Fallback: Coups de coeur first, then alphabetical
    return [...localProducts].sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return a.name.localeCompare(b.name);
    });
}

export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const sanityData = await client.withConfig({ useCdn: false }).fetch(FEATURED_PRODUCTS_QUERY, {}, { next: { revalidate: 0 } });
        if (sanityData && sanityData.length > 0) {
            return sanityData.map(mapSanityToProduct);
        }
    } catch (error) {
        console.warn("Sanity fetch failed, falling back to local data:", error);
    }
    // Fallback: Local filtering
    return localProducts.filter(p => p.isNew).slice(0, 8);
}
