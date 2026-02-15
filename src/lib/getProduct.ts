import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/data/products";

const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  image,
  age,
  description,
  isNew,
  price
}`);

export async function getProduct(slug: string): Promise<Product | null> {
    try {
        const sanityProduct = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });

        if (!sanityProduct) return null;

        return {
            id: sanityProduct._id,
            name: sanityProduct.name,
            slug: sanityProduct.slug,
            image: sanityProduct.image ? urlFor(sanityProduct.image).url() : "/images/placeholder.png",
            age: sanityProduct.age,
            description: sanityProduct.description,
            isNew: sanityProduct.isNew,
            // Assuming price will be added to Product type later or is handled dynamically
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}
