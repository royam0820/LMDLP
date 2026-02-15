import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";


const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://lmdpl.fr'),
  title: {
    default: "La Maison des Petits Loups | Jouets & Ateliers à Puteaux",
    template: "%s | La Maison des Petits Loups"
  },
  description: "Boutique de jouets, ateliers créatifs et anniversaires pour enfants à Puteaux (92800). Découvrez nos activités et notre sélection de jeux.",
  keywords: ["jouets", "puteaux", "ateliers enfants", "anniversaire enfant puteaux", "boutique jouets 92", "activités enfants puteaux"],
  openGraph: {
    title: "La Maison des Petits Loups",
    description: "Un lieu pour jouer, créer et grandir à Puteaux.",
    url: 'https://lmdpl.fr',
    siteName: 'La Maison des Petits Loups',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${nunito.variable} ${quicksand.variable}`}>
      <body className="antialiased font-sans min-h-screen">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
