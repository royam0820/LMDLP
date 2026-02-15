import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "@/components/Home/ProductCarousel";
import { getFeaturedProducts } from "@/lib/getProducts";

export default async function FeaturedProducts() {
    const displayProducts = await getFeaturedProducts();

    return (
        <section className="pt-16 pb-4 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                            Nos Coups de Cœur
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Découvrez nos dernières pépites en boutique.
                        </p>
                    </div>
                    <Link
                        href="/boutique"
                        className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                    >
                        Voir toute la collection <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Carousel Component */}
                <ProductCarousel products={displayProducts} />

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
