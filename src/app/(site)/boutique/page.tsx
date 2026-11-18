import ShopProductGrid from "@/components/Shop/ShopProductGrid";
import { getProducts } from "@/lib/getProducts";

export const metadata = {
    title: "La Boutique | La Maison des Petits Loups",
    description: "Découvrez notre sélection de peluches et jouets pour enfants.",
};

export default async function BoutiquePage() {
    const products = await getProducts();

    return (
        <div className="bg-background min-h-screen pb-16">
            {/* Header / Hero for Shop */}
            <div className="bg-secondary/5 py-14 md:py-16 border-b border-[#CBD5E1]/60">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-[#264653] mb-4">
                        La Boutique
                    </h1>
                    <p className="text-base md:text-lg text-[#475569] max-w-2xl mx-auto mb-6 leading-relaxed">
                        Une sélection soignée de doudous, peluches et jouets d'éveil.
                        Retrouvez toutes nos merveilles en magasin à Puteaux.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xs">
                        <span>🛍️</span>
                        <span>Click & Collect disponible : réservez en ligne et payez lors de votre retrait en magasin</span>
                    </div>
                </div>
            </div>

            {/* Interactive Shop Grid with Age Filters */}
            <div className="container mx-auto px-4 py-12">
                <ShopProductGrid products={products} />

                {/* Gift List Banner */}
                <div className="mt-16 bg-gradient-to-r from-primary/10 via-accent/15 to-secondary/10 rounded-3xl p-8 md:p-10 border border-[#CBD5E1] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                    <div className="max-w-2xl lg:max-w-3xl text-center md:text-left space-y-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                            🎁 Nouveau service gratuit
                        </span>
                        <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-[#264653] leading-snug">
                            Une fête, un anniversaire ou une naissance en vue&nbsp;?
                        </h2>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Créez la liste de cadeaux de votre enfant avec nos doudous et jouets coups de cœur. Vos proches réservent en 1 clic : <strong>zéro risque de doublon</strong> et retrait en boutique à Puteaux&nbsp;!
                        </p>
                    </div>

                    <a
                        href="/creer-liste"
                        className="bg-primary hover:bg-primary/95 text-white font-heading font-bold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md text-sm shrink-0 flex items-center gap-2 cursor-pointer"
                    >
                        <span>Créer une liste de cadeaux</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
