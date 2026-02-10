"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Accueil" },
        { href: "/boutique", label: "La Boutique" },
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
                    <span className="font-heading font-bold text-lg md:text-2xl text-primary leading-tight">
                        La Maison des Petits Loups
                    </span>
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
                    <Link
                        href="/anniversaires"
                        className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md"
                    >
                        Réserver
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
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
