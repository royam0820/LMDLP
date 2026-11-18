"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Plus, Minus, Store, Check } from "lucide-react";

export default function ProductActions({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity((q) => q + 1);
    const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const priceFormatted = product.price
        ? `${product.price.toFixed(2).replace(".", ",")} €`
        : null;

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            {/* Price display */}
            <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block font-bold">
                        Prix boutique
                    </span>
                    <span className="font-heading font-extrabold text-3xl md:text-4xl text-secondary">
                        {priceFormatted || "Prix affiché en magasin"}
                    </span>
                </div>
                <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        <Check size={14} /> Disponible en boutique
                    </span>
                </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">Quantité :</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-xs transition-all disabled:opacity-30"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold text-base text-foreground">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={handleIncrement}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-xs transition-all"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Click and Collect CTA */}
            <button
                type="button"
                onClick={() => addItem(product, quantity)}
                className="w-full bg-primary text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 text-base"
            >
                <ShoppingBag size={20} />
                <span>Réserver en boutique (Click & Collect)</span>
            </button>

            {/* Reassurance text */}
            <div className="bg-muted/40 rounded-xl p-3.5 text-xs text-muted-foreground flex items-start gap-2.5">
                <Store size={18} className="text-secondary shrink-0 mt-0.5" />
                <div>
                    <span className="font-bold text-foreground">Réservation 100% gratuite :</span>
                    <br />
                    Aucun paiement en ligne. Vous payez directement en caisse lors de votre venue en boutique à Puteaux.
                </div>
            </div>
        </div>
    );
}
