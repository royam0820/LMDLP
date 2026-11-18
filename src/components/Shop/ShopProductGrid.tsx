"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/Shop/ProductCard";
import { AGE_CATEGORIES, AgeCategoryKey, normalizeAgeCategory } from "@/lib/ageCategories";
import { Sparkles, RotateCcw } from "lucide-react";

interface ShopProductGridProps {
    products: Product[];
}

export default function ShopProductGrid({ products }: ShopProductGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<AgeCategoryKey>("all");

    // Precalculate counts for each age bracket
    const counts = useMemo(() => {
        const countsMap: Record<AgeCategoryKey, number> = {
            all: products.length,
            "0-12m": 0,
            "1-3y": 0,
            "3-6y": 0,
            "6y+": 0,
        };

        products.forEach((p) => {
            const cat = normalizeAgeCategory(p.age);
            if (cat && countsMap[cat] !== undefined) {
                countsMap[cat]++;
            }
        });

        return countsMap;
    }, [products]);

    // Filter products according to the active pill
    const filteredProducts = useMemo(() => {
        if (selectedCategory === "all") return products;
        return products.filter((p) => normalizeAgeCategory(p.age) === selectedCategory);
    }, [products, selectedCategory]);

    const activeCategoryInfo = AGE_CATEGORIES.find((c) => c.id === selectedCategory);

    return (
        <div className="space-y-8">
            {/* Age Filter Pills with Discrete Counters */}
            <div className="flex flex-col items-center gap-3">
                <div
                    role="tablist"
                    aria-label="Filtrer par tranche d'âge"
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto"
                >
                    {AGE_CATEGORIES.map((cat) => {
                        const count = counts[cat.id] ?? 0;
                        const isSelected = selectedCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer border shadow-xs ${
                                    isSelected
                                        ? "bg-[#264653] text-white border-[#264653] shadow-md scale-105"
                                        : "bg-white text-[#334155] border-[#CBD5E1] hover:border-[#264653]/40 hover:bg-[#F8FAFC]"
                                }`}
                            >
                                <span className="text-base sm:text-lg leading-none">{cat.icon}</span>
                                <span>{cat.label}</span>
                                {/* Discrete badge counter */}
                                <span
                                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                                        isSelected
                                            ? "bg-white/20 text-white"
                                            : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#E2E8F0] group-hover:text-[#334155]"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Discrete context line */}
                <div className="text-xs sm:text-[13px] text-[#475569] text-center font-medium">
                    {selectedCategory === "all" ? (
                        <span>
                            Affichage des <strong>{products.length}</strong> merveilles de notre boutique
                        </span>
                    ) : (
                        <span>
                            {filteredProducts.length} article{filteredProducts.length > 1 ? "s" : ""} dans l'univers{" "}
                            <strong className="text-[#264653]">{activeCategoryInfo?.label}</strong> ({activeCategoryInfo?.subLabel})
                        </span>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-300">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                /* Friendly Empty State if no product is available in this category */
                <div className="bg-white rounded-3xl p-12 text-center border border-[#CBD5E1] shadow-xs max-w-md mx-auto my-12 space-y-4 animate-in fade-in duration-300">
                    <span className="text-5xl block animate-bounce">🧸</span>
                    <h3 className="font-heading font-extrabold text-xl text-[#264653]">
                        Aucun article pour cette tranche d'âge
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                        De nouveaux jouets et doudous arrivent très bientôt en boutique pour cet univers !
                    </p>
                    <button
                        type="button"
                        onClick={() => setSelectedCategory("all")}
                        className="inline-flex items-center gap-2 bg-[#264653] hover:bg-[#1f3742] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
                    >
                        <RotateCcw size={14} />
                        <span>Voir tous les âges</span>
                    </button>
                </div>
            )}
        </div>
    );
}
