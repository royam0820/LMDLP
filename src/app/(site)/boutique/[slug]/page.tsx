import { getProduct } from "@/lib/getProduct";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Info } from "lucide-react";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: "Produit non trouvé | La Maison des Petits Loups",
        };
    }

    return {
        title: `${product.name} | La Boutique`,
        description: product.description.slice(0, 160),
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header / Breadcrumb */}
            <div className="bg-secondary/5 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <Link
                        href="/boutique"
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Retour à la boutique
                    </Link>
                    <h1 className="font-heading font-bold text-3xl md:text-5xl text-foreground">
                        {product.name}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column: Image */}
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {product.isNew && (
                            <div className="absolute top-4 left-4 bg-secondary text-white font-bold px-4 py-2 rounded-full shadow-md z-10">
                                Nouveauté
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-full flex items-center gap-2">
                                <Info size={18} /> {product.age}
                            </span>
                            <span className="text-green-600 font-medium flex items-center gap-2">
                                <Check size={18} /> En stock magasin
                            </span>
                        </div>

                        <h2 className="text-2xl font-heading font-bold mb-4">Description</h2>
                        <div className="prose prose-lg text-muted-foreground mb-8">
                            <p>{product.description}</p>
                        </div>

                        <div className="mt-auto bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-lg mb-2">Envie de l'acheter ?</h3>
                            <p className="text-muted-foreground mb-4">
                                Ce produit est disponible directement dans notre boutique à Puteaux.
                                Passez nous voir pour le découvrir !
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors"
                            >
                                Voir les horaires et l'adresse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
