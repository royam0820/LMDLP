import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
    title: "Contact | La Maison des Petits Loups",
    description: "Retrouvez-nous à Puteaux pour découvrir notre boutique et nos ateliers.",
};

export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen">
            <div className="bg-secondary/5 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                        Nous Contacter
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Une question sur un produit ? Envie de réserver un anniversaire ?
                        Passez nous voir ou envoyez-nous un message.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Info Cards */}
                    <div className="space-y-6">

                        {/* Address */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full shrink-0">
                                <MapPin size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg mb-1">Notre Adresse</h3>
                                <p className="text-muted-foreground">
                                    2 Place du Théâtre <br />
                                    92800 Puteaux
                                </p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <div className="bg-secondary/10 p-3 rounded-full shrink-0">
                                <Clock size={24} className="text-secondary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg mb-1">Horaires d'ouverture</h3>
                                <ul className="text-muted-foreground space-y-1 text-sm">
                                    <li className="flex justify-between w-48"><span>Lundi :</span> <span>Fermé</span></li>
                                    <li className="flex justify-between w-48"><span>Mardi - Samedi :</span> <span>10h - 19h</span></li>
                                    <li className="flex justify-between w-48"><span>Dimanche :</span> <span>Fermé</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <div className="bg-accent/20 p-3 rounded-full shrink-0">
                                <Mail size={24} className="text-accent-foreground" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg mb-1">Nous joindre</h3>
                                <div className="space-y-2 mt-2">
                                    <a href="tel:+33147727371" className="flex items-center gap-2 text-primary font-medium hover:underline">
                                        <Phone size={18} /> 01 47 72 73 71
                                    </a>
                                    <a href="mailto:contact@lmdpl.fr" className="flex items-center gap-2 text-primary font-medium hover:underline">
                                        <Mail size={18} /> contact@lmdpl.fr
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Map */}
                    <div className="h-full min-h-[400px] bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200 shadow-inner">
                        <iframe
                            title="Carte La Maison des Petits Loups"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.585727931346!2d2.2359418!3d48.8851412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66506dfddd47f%3A0x6338573133642398!2s2%20Pl.%20du%20Th%C3%A9%C3%A2tre%2C%2092800%20Puteaux!5e0!3m2!1sfr!2sfr!4v1707212000000!5m2!1sfr!2sfr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
