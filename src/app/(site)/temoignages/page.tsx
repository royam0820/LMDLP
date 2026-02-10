import { getTestimonials } from "@/lib/getTestimonials";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Témoignages | La Maison des Petits Loups",
    description: "Découvrez les avis des parents et enfants sur nos ateliers et notre boutique.",
};

export default async function TemoignagesPage() {
    const reviews = await getTestimonials();

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-secondary/5 py-12 md:py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                        Témoignages
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ce que les parents et les enfants disent de nous.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-primary hover:underline gap-2 font-medium">
                        <ArrowLeft size={16} />
                        Retour à l'accueil
                    </Link>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">Aucun témoignage pour le moment.</p>
                        <p className="text-sm text-muted-foreground mt-2">Soyez le premier à donner votre avis via notre formulaire en boutique !</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-1 text-accent mb-6">
                                    {[...Array(review.rating || 5)].map((_, i) => (
                                        <Star key={i} size={20} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground italic mb-6 flex-grow text-lg leading-relaxed">"{review.text}"</p>
                                <div className="mt-auto pt-6 border-t border-gray-50">
                                    <div className="font-bold text-foreground">
                                        {review.name}
                                    </div>
                                    {review.date && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {new Date(review.date).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
