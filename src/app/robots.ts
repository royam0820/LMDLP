import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/studio/', // Prevent indexing of the studio
        },
        sitemap: 'https://lmdlp.fr/sitemap.xml',
    }
}
