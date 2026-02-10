import WorkshopList from "@/components/Workshops/WorkshopList";
import { getAteliers } from "@/lib/getAteliers";
import { CalendarRange, Sparkles } from "lucide-react";

export const metadata = {
    title: "Ateliers & Stages | La Maison des Petits Loups",
    description: "Des activités créatives et ludiques pour les enfants à Puteaux.",
};

export default async function AteliersPage() {
    const ateliers = await getAteliers();

    const regularWorkshops = ateliers.filter((w) => w.period === "year");
    const holidaysWorkshops = ateliers.filter((w) => w.period === "holidays");

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-primary/5 py-16 md:py-20 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                        Ateliers & Stages
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Pour apprendre en s'amusant. Nos animateurs passionnés accompagnent vos enfants dans la découverte de nouvelles activités.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">

                {/* Ateliers Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-secondary/10 p-3 rounded-xl">
                            <Sparkles size={32} className="text-secondary" />
                        </div>
                        <div>
                            <h2 className="font-heading font-bold text-3xl text-foreground">
                                Ateliers de l'année
                            </h2>
                            <p className="text-muted-foreground">Tous les mercredis et samedis (Année scolaire)</p>
                        </div>
                    </div>
                    <WorkshopList workshops={regularWorkshops} />
                </section>

                {/* Stages Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-primary/10 p-3 rounded-xl">
                            <CalendarRange size={32} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="font-heading font-bold text-3xl text-foreground">
                                Stages Vacances
                            </h2>
                            <p className="text-muted-foreground">Pendant les vacances scolaires (Zone C)</p>
                        </div>
                    </div>
                    <WorkshopList workshops={holidaysWorkshops} />
                </section>

                {/* Note on Codeacademy */}
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                        Partenariat Codeacademy123
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Retrouvez tous nos ateliers numériques en partenariat avec <strong>Codeacademy123</strong>.
                        Des activités ludiques pour comprendre le monde numérique, s'initier au code et découvrir les pouvoirs de l'IA.
                    </p>
                    <a
                        href="https://www.codeacademy123.com/book-online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Réserver un atelier Codeacademy123
                    </a>
                </div>

            </div>
        </div>
    );
}
