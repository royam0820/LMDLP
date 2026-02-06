import { Star } from "lucide-react";

export default function Reviews() {
    const reviews = [
        {
            id: 1,
            author: "Sophie M.",
            text: "Un lieu magique ! Ma fille a adoré son anniversaire sur le thème des fées. L'équipe est adorable et très professionnelle.",
            rating: 5,
        },
        {
            id: 2,
            author: "Thomas L.",
            text: "Super boutique avec une belle sélection de peluches de qualité. On a envie de tout acheter !",
            rating: 5,
        },
        {
            id: 3,
            author: "Camille D.",
            text: "Mon fils participe aux ateliers du mercredi et il est ravi. C'est créatif et bien encadré. Je recommande.",
            rating: 5,
        },
    ];

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">
                    Ce que disent les parents
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <div className="flex gap-1 text-accent mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-muted-foreground italic mb-6">"{review.text}"</p>
                            <div className="font-bold text-foreground text-sm">
                                {review.author}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
