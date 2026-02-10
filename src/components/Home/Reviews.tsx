import { getTestimonials } from "@/lib/getTestimonials";
import { Star } from "lucide-react";
import Link from "next/link";

export default async function Reviews() {
    const reviews = await getTestimonials(3);

    if (reviews.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">
                    Ce que disent les parents
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-1 text-accent mb-4">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-muted-foreground italic mb-6 flex-grow">"{review.text}"</p>
                            <div className="font-bold text-foreground text-sm mt-auto">
                                {review.name}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/temoignages"
                        className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-full text-secondary border-2 border-secondary hover:bg-secondary hover:text-white transition-colors"
                    >
                        Lire tous les témoignages
                    </Link>
                </div>
            </div>
        </section>
    );
}
