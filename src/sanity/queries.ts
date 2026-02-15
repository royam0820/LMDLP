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

export const FEATURED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && isNew == true] | order(name asc) [0...12] {
  _id,
  name,
  "slug": slug.current,
  image,
  age,
  description,
  isNew
}`);

export const ATELIERS_QUERY = defineQuery(`*[_type == "atelier"] | order(period desc, title asc) {
  _id,
  title,
  "slug": slug.current,
  image,
  description,
  ageRange,
  schedule,
  period,
  organizer,
  price,
  sessionsCount,
  startDate,
  endDate,
  bookingUrl
}`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(date desc, _createdAt desc) {
  _id,
  name,
  text,
  rating,
  date
}`);
