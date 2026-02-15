import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'

const BASE_URL = 'https://lmdpl.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const routes = [
        '',
        '/boutique',
        '/ateliers',
        '/temoignages',
        '/contact',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes (Ateliers)
    const ATELIERS_SLUG_QUERY = defineQuery(`*[_type == "atelier" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }`)

    const ateliers = await client.fetch(ATELIERS_SLUG_QUERY, {}, { next: { revalidate: 60 } })

    const atelierRoutes = ateliers.map((atelier: { slug: string, _updatedAt: string }) => ({
        url: `${BASE_URL}/ateliers/${atelier.slug}`,
        lastModified: new Date(atelier._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic routes (Products)
    const PRODUCTS_SLUG_QUERY = defineQuery(`*[_type == "product" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
    }`)

    const products = await client.fetch(PRODUCTS_SLUG_QUERY, {}, { next: { revalidate: 60 } })

    const productRoutes = products.map((product: { slug: string, _updatedAt: string }) => ({
        url: `${BASE_URL}/boutique/${product.slug}`,
        lastModified: new Date(product._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...atelierRoutes, ...productRoutes]
}
