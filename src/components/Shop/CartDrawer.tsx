"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatFrenchPhone } from "@/lib/formatPhone";
import {
    X,
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    CheckCircle2,
    Calendar,
    Clock,
    MapPin,
    AlertCircle,
    Store,
    Phone,
    Mail,
} from "lucide-react";

export default function CartDrawer() {
    const {
        items,
        isOpen,
        closeCart,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    const [step, setStep] = useState<"cart" | "form" | "success">("cart");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [reservationId, setReservationId] = useState("");

    // Form state
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupSlot, setPickupSlot] = useState("Après-midi (14h - 19h)");
    const [note, setNote] = useState("");

    if (!isOpen) return null;

    // Minimum date: today (YYYY-MM-DD)
    const todayStr = new Date().toISOString().split("T")[0];

    const handleSubmitReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!name.trim() || !phone.trim() || !email.trim()) {
            setErrorMessage("Veuillez renseigner votre nom, téléphone et adresse email.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/click-and-collect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: {
                        name: name.trim(),
                        phone: formatFrenchPhone(phone.trim()),
                        email: email.trim(),
                        pickupDate: pickupDate || "Dès que possible",
                        pickupSlot,
                        note: note.trim(),
                    },
                    items,
                    total: totalPrice,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Une erreur est survenue.");
            }

            setReservationId(data.reservationId || "CC-ENREGISTRE");
            setStep("success");
            clearCart();
        } catch (err: any) {
            setErrorMessage(err.message || "Erreur de connexion. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        closeCart();
        // Reset step after closing if was on success
        if (step === "success") {
            setStep("cart");
            setName("");
            setPhone("");
            setEmail("");
            setPickupDate("");
            setNote("");
            setReservationId("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Slide-over panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-primary/5">
                        <div className="flex items-center gap-2">
                            {step === "form" && (
                                <button
                                    onClick={() => setStep("cart")}
                                    className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors mr-1"
                                    title="Retour au panier"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Store size={20} />
                            </div>
                            <div>
                                <h2 className="font-heading font-bold text-lg text-foreground leading-tight">
                                    {step === "cart" && "Mon Panier Click & Collect"}
                                    {step === "form" && "Réserver en boutique"}
                                    {step === "success" && "Réservation validée !"}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Retrait & règlement à Puteaux
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                            title="Fermer et retourner à la boutique"
                        >
                            <span>Retour boutique</span>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* STEP 1: CART ITEMS */}
                        {step === "cart" && (
                            <>
                                {items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground mb-4">
                                            <ShoppingBag size={28} />
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                                            Votre panier est vide
                                        </h3>
                                        <p className="text-sm text-muted-foreground max-w-xs mb-6">
                                            Parcourez nos coups de cœur et réservez-les pour venir les chercher en boutique.
                                        </p>
                                        <Link
                                            href="/boutique"
                                            onClick={handleClose}
                                            className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                                        >
                                            Découvrir la boutique
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Info banner */}
                                        <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-3.5 text-xs text-secondary-foreground flex items-start gap-2.5">
                                            <Store className="text-secondary shrink-0 mt-0.5" size={16} />
                                            <div>
                                                <strong className="text-secondary font-semibold">
                                                    100% simple & local :
                                                </strong>{" "}
                                                Réservation immédiate et gratuite. Vous réglez sur place lors de votre passage au magasin.
                                            </div>
                                        </div>

                                        {/* Items list */}
                                        <div className="divide-y divide-gray-100">
                                            {items.map((item) => (
                                                <div key={item.id} className="py-4 flex gap-4 items-center">
                                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-gray-100">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-heading font-bold text-sm text-foreground truncate">
                                                            {item.name}
                                                        </h4>
                                                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                                            {item.sku && (
                                                                <span className="text-[11px] font-mono text-muted-foreground bg-gray-100 px-1.5 py-0.5 rounded">
                                                                    Réf : {item.sku}
                                                                </span>
                                                            )}
                                                            {item.age && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    {item.age}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm font-bold text-primary mt-1">
                                                            {item.price
                                                                ? `${item.price.toFixed(2).replace(".", ",")} €`
                                                                : "Prix en boutique"}
                                                        </div>
                                                    </div>

                                                    {/* Quantity controls */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="p-1 hover:text-primary transition-colors text-gray-500"
                                                                title="Diminuer"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="px-2 text-xs font-bold text-foreground">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="p-1 hover:text-primary transition-colors text-gray-500"
                                                                title="Augmenter"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-gray-400 hover:text-destructive transition-colors p-1"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* STEP 2: RESERVATION FORM */}
                        {step === "form" && (
                            <form onSubmit={handleSubmitReservation} className="space-y-4">
                                <div className="bg-primary/5 rounded-xl p-3 text-xs text-muted-foreground">
                                    <strong className="text-primary font-bold">Rappel :</strong> Nous préparons votre paquet avec un post-it à votre nom. Le paiement s'effectue en caisse au moment du retrait.
                                </div>

                                {errorMessage && (
                                    <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-3 text-xs flex items-center gap-2">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                                        Nom & Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: Sophie Martin"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                                        Téléphone *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(formatFrenchPhone(e.target.value))}
                                        onBlur={() => setPhone((prev) => formatFrenchPhone(prev))}
                                        placeholder="06 12 34 56 78"
                                        maxLength={14}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                    <span className="text-[11px] text-muted-foreground mt-0.5 block">
                                        Pour vous prévenir dès que le paquet est prêt.
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                                        Adresse E-mail *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Ex: sophie.martin@example.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                    <span className="text-[11px] text-muted-foreground mt-0.5 block">
                                        Votre confirmation de réservation et les informations de retrait, directement par email.
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                                            Date de passage *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                min={todayStr}
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                                            Créneau horaire
                                        </label>
                                        <select
                                            value={pickupSlot}
                                            onChange={(e) => setPickupSlot(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-primary"
                                        >
                                            <option value="Matin (10h - 13h)">Matin (10h - 13h)</option>
                                            <option value="Après-midi (14h - 19h)">Après-midi (14h - 19h)</option>
                                            <option value="Dès que possible">Dès que possible</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                                        Remarque éventuelle
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Ex: Emballage cadeau souhaité..."
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Order summary box */}
                                <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 border border-gray-100 mt-2">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Nombre d'articles :</span>
                                        <span className="font-bold text-foreground">{totalItems}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-sm text-foreground pt-1 border-t border-gray-200">
                                        <span>Montant total :</span>
                                        <span className="text-secondary font-bold text-base">
                                            {totalPrice.toFixed(2).replace(".", ",")} €
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-muted-foreground block text-right">
                                        (Règlement à la caisse en boutique)
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-secondary text-white font-bold py-3.5 rounded-full hover:bg-secondary/90 transition-colors shadow-md text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <span>Enregistrement en cours...</span>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} />
                                            <span>Confirmer ma réservation</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* STEP 3: SUCCESS */}
                        {step === "success" && (
                            <div className="h-full flex flex-col items-center justify-center text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                    <CheckCircle2 size={36} />
                                </div>

                                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 mb-2">
                                    Réf : #{reservationId}
                                </span>

                                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                                    Réservation enregistrée !
                                </h3>

                                <p className="text-sm text-muted-foreground max-w-xs mb-6">
                                    Notre équipe a bien reçu votre demande et prépare votre sélection avec un post-it à votre nom.
                                </p>

                                <div className="bg-muted/40 rounded-2xl p-4 text-xs text-left w-full space-y-2.5 border border-gray-100 mb-6">
                                    <div className="flex items-start gap-2.5 text-foreground font-medium">
                                        <MapPin className="text-primary shrink-0 mt-0.5" size={16} />
                                        <div>
                                            <strong>Lieu de retrait :</strong>
                                            <br />
                                            La Maison des Petits Loups
                                            <br />
                                            2 Place du Théâtre, 92800 Puteaux
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-muted-foreground pt-2 border-t border-gray-200">
                                        <Phone className="text-primary shrink-0" size={16} />
                                        <span>
                                            Téléphone :{" "}
                                            <a href="tel:+33147727371" className="text-foreground font-bold hover:text-primary transition-colors">
                                                01 47 72 73 71
                                            </a>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-muted-foreground pt-1">
                                        <Mail className="text-primary shrink-0" size={16} />
                                        <span>
                                            Email :{" "}
                                            <a href="mailto:contact@lmdpl.fr" className="text-foreground font-bold hover:text-primary transition-colors">
                                                contact@lmdpl.fr
                                            </a>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-muted-foreground pt-2 border-t border-gray-200">
                                        <Clock className="text-primary shrink-0" size={16} />
                                        <span>Règlement sur place lors de votre venue</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm text-sm"
                                >
                                    Fermer et continuer ma visite
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer for Step 1 */}
                    {step === "cart" && items.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Articles sélectionnés :</span>
                                    <span>{totalItems}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-heading font-bold text-foreground">
                                        Total à régler sur place :
                                    </span>
                                    <span className="font-heading font-bold text-2xl text-secondary">
                                        {totalPrice.toFixed(2).replace(".", ",")} €
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep("form")}
                                className="w-full bg-primary text-white font-bold py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-md text-sm flex items-center justify-center gap-2 hover:gap-3"
                            >
                                <span>Réserver en boutique (Click & Collect)</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-full py-2 px-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-foreground text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-gray-50 shadow-xs"
                            >
                                <ArrowLeft size={15} />
                                <span>Retour à la boutique (Continuer mes achats)</span>
                            </button>

                            <p className="text-[11px] text-center text-muted-foreground">
                                Règlement à la caisse du magasin lors du retrait
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
