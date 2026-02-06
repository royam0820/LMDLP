import BookingForm from "@/components/Forms/BookingForm";
import Image from "next/image";
import { Check } from "lucide-react";

export const metadata = {
    title: "Anniversaires | La Maison des Petits Loups",
    description: "Organisez un anniversaire inoubliable pour votre enfant à Puteaux.",
};

export default function AnniversairesPage() {
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
                    <div className="space-y-8 mt-10 lg:mt-0 order-2 lg:order-1">
                        {/* Image */}
                        <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8">
                            {/* Placeholder using vitrine image for now since we don't have distinct birthday room pics */}
                            <Image
                                src="/images/ldmp-vitrine.jpg"
                                alt="Espace Anniversaire"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="prose prose-lg text-muted-foreground">
                            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
                                La Formule "Petits Loups"
                            </h2>
                            <p>
                                Notre espace privatisé à l'étage accueille jusqu'à 12 enfants pour un après-midi festif et créatif.
                            </p>

                            <h3 className="font-heading font-bold text-xl text-foreground mt-6 mb-3">
                                Ce qui est inclus :
                            </h3>
                            <ul className="space-y-4 not-prose">
                                {[
                                    "Privatisation de l'espace (2h30)",
                                    "Animateur dédié pour encadrer le groupe",
                                    "Atelier créatif au choix (selon l'âge)",
                                    "Gâteau d'anniversaire fait maison (ou partenaire local)",
                                    "Boissons et bonbons à volonté",
                                    "Cartons d'invitation fournis"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="bg-green-100 text-green-600 p-1 rounded-full">
                                            <Check size={16} />
                                        </div>
                                        <span className="font-medium text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="order-1 lg:order-2 sticky top-24">
                        <BookingForm />
                    </div>

                </div>
            </div>
        </div>
    );
}
