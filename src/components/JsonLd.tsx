export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ToyStore",
        "name": "La Maison des Petits Loups",
        "image": "https://lmdpl.fr/images/og-image.jpg", // Needs a real image URL
        "description": "Boutique de jouets, ateliers créatifs et organisation d'anniversaires pour enfants à Puteaux.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "2 Place du Théâtre",
            "addressLocality": "Puteaux",
            "postalCode": "92800",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.8804789,
            "longitude": 2.2395431
        },
        url: "https://lmdpl.fr",
        "telephone": "+33147759719", // Verify this number
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "10:30",
                "closes": "19:00"
            }
        ],
        "priceRange": "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
