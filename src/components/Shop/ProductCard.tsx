"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { Check, Info, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatAgeBadge } from "@/lib/ageCategories";

interface ProductCardProps {
    product: Product;
    truncate?: boolean;
}

export default function ProductCard({ product, truncate = false }: ProductCardProps) {
    const { addItem } = useCart();
    const descriptionClass = truncate ? "line-clamp-2" : "";

    const priceFormatted = product.price
        ? `${product.price.toFixed(2).replace(".", ",")} €`
        : null;

    const displayAge = formatAgeBadge(product.age);

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all border border-[#CBD5E1] flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square bg-muted/50 overflow-hidden">
                {product.slug ? (
                    <Link href={`/boutique/${product.slug}`} className="block w-full h-full">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                    </Link>
                ) : (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                )}

                {product.isNew && (
                    <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Coup de cœur
                    </div>
                )}

                {displayAge && (
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-xs font-bold px-3 py-1 rounded-full text-[#264653] border border-[#CBD5E1] flex items-center gap-1 shadow-xs">
                        <Info size={14} className="text-secondary" /> {displayAge}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="min-w-0">
                        <h3 className="font-heading font-bold text-lg text-[#264653] group-hover:text-primary transition-colors leading-snug">
                            {product.slug ? (
                                <Link href={`/boutique/${product.slug}`}>{product.name}</Link>
                            ) : (
                                product.name
                            )}
                        </h3>
                        {product.sku && (
                            <span className="inline-block text-[11px] font-mono font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1]/70 px-2 py-0.5 rounded-md mt-1">
                                Réf : {product.sku}
                            </span>
                        )}
                    </div>
                    {priceFormatted && (
                        <span className="font-heading font-bold text-lg text-secondary shrink-0">
                            {priceFormatted}
                        </span>
                    )}
                </div>

                <p className={`text-[#475569] text-sm mb-4 flex-grow leading-relaxed ${descriptionClass}`}>
                    {product.description}
                </p>

                {/* Card Bottom Actions */}
                <div className="mt-auto pt-3 border-t border-[#CBD5E1]/60 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-[#475569]">
                        <span className="flex items-center text-green-700 font-bold">
                            <Check size={14} className="mr-1 text-green-600" /> Disponible en boutique
                        </span>
                        {product.slug && (
                            <Link
                                href={`/boutique/${product.slug}`}
                                className="text-primary font-bold hover:underline"
                            >
                                Détails &rarr;
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => addItem(product)}
                        className="w-full mt-1 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold py-2 px-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-xs group-hover:bg-primary group-hover:text-white"
                    >
                        <ShoppingBag size={15} />
                        <span>Réserver (Click & Collect)</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
