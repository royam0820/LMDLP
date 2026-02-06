import ProductCard from "@/components/Shop/ProductCard";
import { getProducts } from "@/lib/getProducts";

export const metadata = {
    title: "La Boutique | La Maison des Petits Loups",
    description: "Découvrez notre sélection de peluches et jouets pour enfants.",
};

export default async function BoutiquePage() {
    const products = await getProducts();

    return (
        <div className="bg-background min-h-screen">
            {/* Header / Hero for Shop */}
            <div className="bg-secondary/5 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                        La Boutique
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Une sélection soignée de doudous, peluches et jouets d'éveil.
                        Retrouvez toutes nos merveilles en magasin à Puteaux.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        Aucun produit trouvé pour le moment.
                    </div>
                )}
            </div>
        </div>
    );
}
