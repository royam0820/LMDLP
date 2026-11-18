import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/data/products";

const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  sku,
  "slug": slug.current,
  image,
  age,
  description,
  isNew,
  price
}`);

export async function getProduct(slug: string): Promise<Product | null> {
    try {
        const sanityProduct = await client.withConfig({ useCdn: false }).fetch(PRODUCT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 0 } });

        if (!sanityProduct) return null;

        return {
            id: sanityProduct._id,
            name: sanityProduct.name,
            sku: sanityProduct.sku,
            slug: sanityProduct.slug,
            image: sanityProduct.image ? urlFor(sanityProduct.image).url() : "/images/placeholder.png",
            age: sanityProduct.age,
            description: sanityProduct.description,
            isNew: sanityProduct.isNew,
            price: sanityProduct.price,
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}
