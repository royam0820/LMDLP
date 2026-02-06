import Link from "next/link";
import { Cake, Paintbrush } from "lucide-react";

export default function QuickLinks() {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
                {/* Anniversaires */}
                <div className="bg-secondary/10 rounded-3xl p-8 md:p-12 flex flex-col items-start justify-center relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-sm">
                            <Cake size={40} className="text-secondary" />
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                            Anniversaires <br /> Inoubliables
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md">
                            Offrez à votre enfant une fête magique avec ses amis. Formules clé en main, animation, gâteau et bonne humeur garantis !
                        </p>
                        <Link
                            href="/anniversaires"
                            className="bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary/90 transition-colors inline-block shadow-md"
                        >
                            Voir les formules
                        </Link>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Ateliers */}
                <div className="bg-primary/10 rounded-3xl p-8 md:p-12 flex flex-col items-start justify-center relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-sm">
                            <Paintbrush size={40} className="text-primary" />
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                            Ateliers & <br /> Stages Créatifs
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md">
                            Peinture, éveil musical, codage, couture... De nombreuses activités pour éveiller les talents de vos enfants tout au long de l'année.
                        </p>
                        <Link
                            href="/ateliers"
                            className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition-colors inline-block shadow-md"
                        >
                            Découvrir le programme
                        </Link>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>
        </section>
    );
}
