import { Atelier, getAtelierImageUrl } from "@/lib/getAteliers";
import { Calendar, Users, Sparkles, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkshopList({ workshops }: { workshops: Atelier[] }) {
    if (workshops.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/50 rounded-2xl">
                <p className="text-muted-foreground">Aucune date prévue pour le moment.</p>
            </div>
        );
    }

    const formatPrice = (workshop: Atelier) => {
        const { price, sessionsCount, period, startDate, endDate } = workshop;

        const dates = startDate && endDate
            ? `(du ${new Date(startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au ${new Date(endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })})`
            : "";

        if (period === "year") {
            return `${price} € – ${sessionsCount || 0} séances ${dates}`;
        }

        if (period === "holidays") {
            // If dates are provided, show them, otherwise default to "(vacances scolaires)"
            const suffix = dates ? dates : "(vacances scolaires)";
            return `${price} € – ${sessionsCount || 0} séances ${suffix}`;
        }

        return `${price} €`;
    };

    const getBookingAction = (workshop: Atelier) => {
        if (workshop.organizer === "codeacademy123" && workshop.bookingUrl) {
            return (
                <a
                    href={workshop.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Réserver <ExternalLink size={18} />
                </a>
            );
        }

        const subject = encodeURIComponent(`Demande de réservation – ${workshop.title}`);
        const body = encodeURIComponent(
            `Bonjour,\n\nJe souhaite des informations pour l'atelier "${workshop.title}" (${workshop.ageRange}), le ${workshop.schedule}.\n\nMerci !`
        );

        return (
            <a
                href={`mailto:lamaisondespetitsloups@gmail.com?subject=${subject}&body=${body}`}
                className="w-full mt-6 flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
                Réserver par Email <Mail size={18} />
            </a>
        );
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {workshops.map((workshop) => {
                const imageUrl = getAtelierImageUrl(workshop.image);

                return (
                    <div
                        key={workshop._id}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
                    >
                        {imageUrl && (
                            <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden bg-gray-100">
                                <Image
                                    src={imageUrl}
                                    alt={workshop.title || "Atelier"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-heading font-bold text-xl text-foreground">
                                {workshop.title}
                            </h3>
                            {workshop.organizer === "codeacademy123" && (
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-2">
                                    Codeacademy123
                                </span>
                            )}
                        </div>

                        <div className="mb-6">
                            <p className="text-muted-foreground line-clamp-3 mb-2">
                                {workshop.description}
                            </p>
                            <Link
                                href={`/ateliers/${workshop.slug}`}
                                className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1"
                            >
                                Lire la suite
                            </Link>
                        </div>

                        <div className="space-y-4 text-sm flex-grow">
                            <div className="flex items-center gap-3 text-foreground">
                                <Calendar size={18} className="text-primary shrink-0" />
                                <span className="font-medium">{workshop.schedule}</span>
                            </div>
                            <div className="flex items-center gap-3 text-foreground">
                                <Users size={18} className="text-secondary shrink-0" />
                                <span>Âge : {workshop.ageRange}</span>
                            </div>
                            <div className="flex items-start gap-3 text-foreground bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <Sparkles size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                                <span className="font-semibold text-gray-700">{formatPrice(workshop)}</span>
                            </div>
                        </div>

                        {getBookingAction(workshop)}
                    </div>
                );
            })}
        </div>
    );
}
