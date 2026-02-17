import BookingForm from "@/components/Forms/BookingForm";
import Image from "next/image";
import { getAnniversaryPage } from "@/lib/getAnniversaryPage";

export const metadata = {
    title: "Anniversaires | La Maison des Petits Loups",
    description: "Organisez un anniversaire inoubliable pour votre enfant à Puteaux.",
};

export default async function AnniversairesPage() {
    const data = await getAnniversaryPage();

    // Defaults in case data is missing or not yet populated
    const pricePerChild = data?.pricePerChild ?? 20;
    const animatorFee = data?.animatorFee ?? 180;
    const minChildren = data?.minChildren ?? 8;
    const assistantFee = data?.assistantFee ?? 90;
    const deposit = data?.deposit ?? 180;
    const sundayFee = data?.sundayFee ?? 60;
    const formulaIncludes = data?.formulaIncludes ?? [
        "Décoration de la salle selon le thème choisi",
        "Boissons, friandises & sacs surprises inclus",
        "Animateur dédié pendant 2 heures",
        "Espace réservé (jusqu’à 11 enfants avec 1 animateur)",
        "Gâteau et bougies à apporter par les parents"
    ];

    // Helper to pick an emoji based on the text content (simple heuristic)
    const getEmoji = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes("déco")) return "🎈";
        if (lower.includes("boisson") || lower.includes("friandise")) return "🧃";
        if (lower.includes("animateur")) return "👩‍🎨";
        if (lower.includes("espace")) return "🏠";
        if (lower.includes("gâteau")) return "🎂";
        return "✨";
    };

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-secondary/10 py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6">
                        Anniversaires Inoubliables
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Offrez à votre enfant une fête magique dont il se souviendra longtemps.
                        Nous nous occupons de tout pour que vous puissiez profiter du moment.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 -mt-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Details */}
                    <div className="space-y-8 mt-10 lg:mt-0">
                        {/* Image */}
                        <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8">
                            {/* Placeholder using vitrine image for now since we don't have distinct birthday room pics */}
                            <Image
                                src="/images/birthday-party.jpg"
                                alt="Espace Anniversaire"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="space-y-8">

                            {/* Formula */}
                            <div>
                                <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-6">
                                    🎉 Formule Anniversaire – On s’occupe de tout !
                                </h2>
                                <ul className="space-y-4 text-lg text-muted-foreground">
                                    {formulaIncludes.map((item, index) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="shrink-0">{getEmoji(item)}</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Slots */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                                    <span>🗓</span> Créneaux disponibles
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                    <div className="bg-secondary text-white py-2 px-4 rounded-lg text-center font-bold shadow-sm">10h30 – 12h30</div>
                                    <div className="bg-secondary text-white py-2 px-4 rounded-lg text-center font-bold shadow-sm">13h30 – 15h30</div>
                                    <div className="bg-secondary text-white py-2 px-4 rounded-lg text-center font-bold shadow-sm">16h30 – 18h30</div>
                                </div>
                                <p className="text-sm text-muted-foreground italic">
                                    (Samedis et dimanches – supplément de {sundayFee}€ le dimanche)
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="bg-primary/5 rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                                    <span>💰</span> Tarifs
                                </h3>
                                <ul className="space-y-2 text-muted-foreground mb-4">
                                    <li><strong>{pricePerChild}€</strong> par enfant</li>
                                    <li><strong>{animatorFee}€</strong> forfait animateur</li>
                                    <li>Base minimum : <strong>{minChildren} enfants</strong></li>
                                    <li>À partir de 12 enfants : animateur assistant (<strong>+{assistantFee}€</strong>)</li>
                                </ul>
                                <div className="bg-white/50 p-3 rounded-lg text-sm border border-primary/10 inline-block">
                                    Acompte de <strong>{deposit}€</strong> à la réservation
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="sticky top-24">
                        <BookingForm />
                    </div>

                </div>
            </div>
        </div>
    );
}
