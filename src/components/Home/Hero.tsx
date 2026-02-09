import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] w-full flex items-start justify-center text-center text-white pt-24 md:pt-40">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/ldmp-vitrine.jpg"
                    alt="Vitrine La Maison des Petits Loups"
                    fill
                    className="object-cover brightness-75"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 space-y-6">
                <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl drop-shadow-md">
                    Un lieu pour jouer, <br className="hidden md:block" />
                    créer et grandir
                </h1>
                <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto drop-shadow-sm">
                    Votre boutique de jouets, ateliers créatifs et organisation d'anniversaires à Puteaux.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link
                        href="/boutique"
                        className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all text-lg shadow-lg"
                    >
                        Découvrir la boutique
                    </Link>
                    <Link
                        href="/anniversaires"
                        className="bg-white hover:bg-gray-100 text-foreground font-bold py-3 px-8 rounded-full transition-all text-lg shadow-lg"
                    >
                        Réserver un anniversaire
                    </Link>
                </div>
            </div>
        </section>
    );
}
