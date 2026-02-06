import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
    // Select new products or just the first 4
    const featured = products.filter((p) => p.isNew).slice(0, 4);
    // Fallback if not enough new items
    const displayProducts =
        featured.length < 3 ? products.slice(0, 4) : featured;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                            Nos Nouveautés
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Les derniers arrivages de peluches toutes douces.
                        </p>
                    </div>
                    <Link
                        href="/boutique"
                        className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                    >
                        Voir toute la collection <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product) => (
                        <Link
                            key={product.id}
                            href="/boutique"
                            className="group block"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-foreground">
                                    {product.age}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {product.description}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/boutique"
                        className="inline-flex items-center gap-2 text-primary font-bold"
                    >
                        Voir toute la collection <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
