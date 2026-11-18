"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import LogoText from "./LogoText";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems, openCart } = useCart();

    const links = [
        { href: "/", label: "Accueil" },
        { href: "/boutique", label: "La Boutique" },
        { href: "/creer-liste", label: "Listes Cadeaux" },
        { href: "/anniversaires", label: "Anniversaires" },
        { href: "/ateliers", label: "Ateliers & Stages" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-full border-2 border-primary/20">
                        <Image
                            src="/images/logo.jpg"
                            alt="LMDPL Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <LogoText />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-medium text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    {/* Cart Button */}
                    <button
                        onClick={openCart}
                        aria-label="Mon Panier Click & Collect"
                        className="relative p-2.5 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all flex items-center gap-2 font-bold text-sm"
                    >
                        <ShoppingBag size={20} />
                        <span className="hidden lg:inline text-xs">Click & Collect</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <Link
                        href="/anniversaires"
                        className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md"
                    >
                        Réserver
                    </Link>
                </nav>

                {/* Right actions on Mobile */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={openCart}
                        aria-label="Mon Panier Click & Collect"
                        className="relative p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all"
                    >
                        <ShoppingBag size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <button
                        className="p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <nav className="flex flex-col p-4 gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-medium text-foreground hover:text-primary py-2 border-b border-gray-50 last:border-0"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/anniversaires"
                            className="bg-primary text-white text-center py-3 rounded-lg font-bold mt-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Réserver un anniversaire
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
