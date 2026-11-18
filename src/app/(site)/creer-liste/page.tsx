import { getProducts } from "@/lib/getProducts";
import CreateListForm from "@/components/GiftLists/CreateListForm";
import { Sparkles, Gift, Heart, ShieldCheck, Store, Calendar, Smile } from "lucide-react";

export const metadata = {
    title: "Créer une Liste de Cadeaux | La Maison des Petits Loups",
    description: "Créez la liste de cadeaux (anniversaire, naissance, fête...) de votre enfant en 1 minute et partagez-la à vos proches sans aucun doublon.",
};

export default async function CreerListePage() {
    const products = await getProducts();

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Hero Header - Modeled with the vibrant energy of the Anniversaires page */}
            <div className="bg-secondary/10 py-16 md:py-20 relative overflow-hidden border-b border-secondary/15">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs text-primary border border-primary/20 text-xs md:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-xs animate-in fade-in slide-in-from-top-2 duration-500">
                        <Sparkles size={16} className="text-primary animate-pulse" />
                        <span className="tracking-wide">Service 100% Gratuit & Local à Puteaux 🎈</span>
                    </div>

                    <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-foreground mb-6 leading-tight">
                        Créez la Liste de Cadeaux <br className="hidden sm:inline" />
                        <span className="text-secondary">des Petits Loups</span> 🎁
                    </h1>

                    <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
                        Pour un anniversaire, une naissance ou toute autre occasion spéciale, choisissez les jouets coups de cœur de votre enfant.
                        Vos proches réservent en 1 clic et récupèrent leur cadeau en boutique à Puteaux :{" "}
                        <strong className="text-[#264653] font-bold">aucun risque de doublon !</strong>
                    </p>

                    {/* Highlights Cards (à la mode Anniversaires) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 text-left">
                        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl bg-primary/10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">
                                    🎁
                                </span>
                                <div>
                                    <strong className="text-[#264653] text-sm block font-heading font-bold">Zéro Doublon</strong>
                                    <span className="text-[13px] text-[#475569]">Bloqué dès réservation</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl bg-secondary/10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">
                                    💌
                                </span>
                                <div>
                                    <strong className="text-[#264653] text-sm block font-heading font-bold">Mots Doux</strong>
                                    <span className="text-[13px] text-[#475569]">Messages des proches</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl bg-accent/20 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">
                                    🏪
                                </span>
                                <div>
                                    <strong className="text-[#264653] text-sm block font-heading font-bold">Retrait en boutique</strong>
                                    <span className="text-[13px] text-[#475569]">À Puteaux sans frais</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl bg-green-100 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">
                                    ✨
                                </span>
                                <div>
                                    <strong className="text-[#264653] text-sm block font-heading font-bold">Création simple et gratuite</strong>
                                    <span className="text-[13px] text-[#475569]">En 2 minutes chrono</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative blurred background elements matching /anniversaires */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/25 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/25 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Form Section */}
            <div className="container mx-auto px-4 -mt-6 relative z-20">
                <CreateListForm availableProducts={products} />
            </div>
        </div>
    );
}
