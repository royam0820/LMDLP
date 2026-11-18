import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product"] | order(select(isNew == true => 0, 1) asc, name asc) {
  _id,
  name,
  sku,
  "slug": slug.current,
  image,
  age,
  description,
  price,
  isNew
}`);

export const FEATURED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && isNew == true] | order(name asc) [0...8] {
  _id,
  name,
  sku,
  "slug": slug.current,
  image,
  age,
  description,
  price,
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

export const ACTIVE_SEASONAL_CAMPAIGN_QUERY = defineQuery(`*[_type == "seasonalCampaign" && isActive == true && count(products) > 0 && startDate <= now() && endDate >= now()] | order(coalesce(priority, 999) asc, startDate desc)[0] {
  _id,
  name,
  "slug": slug.current,
  title,
  badgeText,
  theme,
  description,
  banner,
  startDate,
  endDate
}`);

export const ACTIVE_SEASONAL_CAMPAIGNS_QUERY = defineQuery(`*[_type == "seasonalCampaign" && isActive == true && count(products) > 0 && startDate <= now() && endDate >= now()] | order(coalesce(priority, 999) asc, startDate desc)[0...2] {
  _id,
  name,
  "slug": slug.current,
  title,
  badgeText,
  theme,
  description,
  banner,
  startDate,
  endDate
}`);

export const SEASONAL_CAMPAIGN_BY_SLUG_QUERY = defineQuery(`*[_type == "seasonalCampaign" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  title,
  badgeText,
  theme,
  description,
  banner,
  startDate,
  endDate,
  isActive,
  "products": products[]->{
    _id,
    name,
    sku,
    "slug": slug.current,
    image,
    age,
    description,
    price,
    isNew
  }
}`);

export const ALL_SEASONAL_CAMPAIGNS_QUERY = defineQuery(`*[_type == "seasonalCampaign" && defined(slug.current)] | order(coalesce(priority, 999) asc, startDate desc) {
  _id,
  name,
  "slug": slug.current,
  title,
  badgeText,
  theme,
  description,
  banner,
  startDate,
  endDate,
  isActive,
  "products": products[]->{
    _id,
    name,
    sku,
    "slug": slug.current,
    image,
    age,
    description,
    price,
    isNew
  }
}`);

export const ALL_CAMPAIGN_SLUGS_QUERY = defineQuery(`*[_type == "seasonalCampaign" && defined(slug.current)] {
  "slug": slug.current
}`);
