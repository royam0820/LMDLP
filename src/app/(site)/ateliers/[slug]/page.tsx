import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { getAtelierImageUrl } from "@/lib/getAteliers";
import Image from "next/image";
import { Calendar, Users, Sparkles, ExternalLink, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const ATELIER_BY_SLUG_QUERY = defineQuery(`*[_type == "atelier" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  image,
  description,
  ageRange,
  schedule,
  period,
  organizer,
  price,
  sessionsCount,
  startDate,
  endDate,
  bookingUrl
}`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const atelier = await client.fetch(ATELIER_BY_SLUG_QUERY, { slug });

    if (!atelier) {
        return {
            title: "Atelier non trouvé | La Maison des Petits Loups",
        };
    }

    return {
        title: `${atelier.title} | La Maison des Petits Loups`,
        description: atelier.description,
    };
}

export default async function AtelierPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const atelier = await client.fetch(ATELIER_BY_SLUG_QUERY, { slug });

    if (!atelier) {
        notFound();
    }

    const imageUrl = getAtelierImageUrl(atelier.image);

    const formatPrice = () => {
        const { price, sessionsCount, period, startDate, endDate } = atelier;
        const dates = startDate && endDate
            ? `(du ${new Date(startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au ${new Date(endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })})`
            : "";

        if (period === "year") {
            return `${price} € – ${sessionsCount || 0} séances ${dates}`;
        }

        if (period === "holidays") {
            const suffix = dates ? dates : "(vacances scolaires)";
            return `${price} € – ${sessionsCount || 0} séances ${suffix}`;
        }

        return `${price} €`;
    };

    const getBookingAction = () => {
        if (atelier.organizer === "codeacademy123" && atelier.bookingUrl) {
            return (
                <a
                    href={atelier.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto"
                >
                    Réserver <ExternalLink size={18} />
                </a>
            );
        }

        const subject = encodeURIComponent(`Demande de réservation – ${atelier.title}`);
        const body = encodeURIComponent(
            `Bonjour,\n\nJe souhaite des informations pour l'atelier "${atelier.title}" (${atelier.ageRange}), le ${atelier.schedule}.\n\nMerci !`
        );

        return (
            <a
                href={`mailto:lamaisondespetitsloups@gmail.com?subject=${subject}&body=${body}`}
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-colors w-full md:w-auto"
            >
                Réserver par Email <Mail size={18} />
            </a>
        );
    };

    return (
        <div className="bg-background min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/ateliers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={18} />
                    Retour aux ateliers
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {imageUrl && (
                        <div className="relative w-full h-64 md:h-96">
                            <Image
                                src={imageUrl}
                                alt={atelier.title || "Atelier"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
                                {atelier.title}
                            </h1>
                            {atelier.organizer === "codeacademy123" && (
                                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-4 py-2 rounded-full shrink-0 self-start">
                                    Codeacademy123
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8 text-sm md:text-base">
                            <div className="flex items-center gap-2 text-foreground bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                <Calendar size={20} className="text-primary" />
                                <span className="font-medium">{atelier.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                <Users size={20} className="text-secondary" />
                                <span>{atelier.ageRange}</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                <Sparkles size={20} className="text-yellow-500" />
                                <span className="font-semibold">{formatPrice()}</span>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                            <p>{atelier.description}</p>
                            {/* Assuming plain text description for now as per schema provided earlier */}
                        </div>

                        <div className="flex justify-center md:justify-start">
                            {getBookingAction()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
