import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  image,
  age,
  description,
  isNew
}`);

export const FEATURED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && isNew == true] | order(name asc) [0...8] {
  _id,
  name,
  "slug": slug.current,
  image,
  age,
  description,
  isNew
}`);
