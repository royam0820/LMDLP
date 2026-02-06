import ProductCard from "@/components/Shop/ProductCard";
import { products } from "@/data/products";

export const metadata = {
    title: "La Boutique | La Maison des Petits Loups",
    description: "Découvrez notre sélection de peluches douces et originales.",
};

export default function BoutiquePage() {
    return (
        <div className="bg-background min-h-screen pb-16">
            {/* Header Section */}
            <div className="bg-primary/5 py-16 md:py-20 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                        La Boutique
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Une sélection pointue de peluches pour tous les âges. Venez les découvrir et les adopter en magasin.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Info Banner */}
                <div className="mt-16 bg-muted rounded-2xl p-8 text-center max-w-3xl mx-auto border border-primary/20">
                    <h3 className="font-heading font-bold text-xl mb-2 text-foreground">
                        Envie d'en voir plus ?
                    </h3>
                    <p className="text-muted-foreground">
                        Notre stock évolue chaque semaine. Passez nous voir en boutique au 12 Rue de la République pour découvrir toutes nos merveilles et bénéficier de nos conseils personnalisés.
                    </p>
                </div>
            </div>
        </div>
    );
}
