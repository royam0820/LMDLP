import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-muted pt-12 pb-6 text-muted-foreground">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xl text-primary">
                            La Maison des Petits Loups
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Un lieu unique à Puteaux dédié aux familles. Boutique de jeux et
                        jouets, ateliers créatifs et anniversaires inoubliables.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://www.instagram.com/lamaisondespetitsloups/" className="text-primary hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer">
                            <Instagram size={24} />
                        </a>
                        <a href="https://www.facebook.com/LMDPL" className="text-primary hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer">
                            <Facebook size={24} />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-heading font-bold text-foreground text-lg mb-4">À découvrir</h3>
                    <ul className="space-y-2">
                        <li><Link href="/boutique" className="hover:text-primary transition-colors">La Boutique</Link></li>
                        <li><Link href="/anniversaires" className="hover:text-primary transition-colors">Formules Anniversaires</Link></li>
                        <li><Link href="/ateliers" className="hover:text-primary transition-colors">Ateliers & Stages</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-heading font-bold text-foreground text-lg mb-4">Infos Pratiques</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="shrink-0 text-primary" size={20} />
                            <span>
                                2 Place du Théâtre<br />
                                92800 Puteaux
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="shrink-0 text-primary" size={20} />
                            <a href="tel:+33147727371">01 47 72 73 71</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="shrink-0 text-primary" size={20} />
                            <a href="mailto:contact@lmdpl.fr">contact@lmdpl.fr</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-muted-foreground/10 mt-12 pt-6 text-center text-xs">
                <p>&copy; {new Date().getFullYear()} La Maison des Petits Loups. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
