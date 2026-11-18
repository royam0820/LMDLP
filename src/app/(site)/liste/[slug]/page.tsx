"use client";

import React, { useEffect, useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Gift,
    Calendar,
    Heart,
    Check,
    Share2,
    Store,
    Clock,
    MapPin,
    Phone,
    Mail,
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    X,
    Archive,
    Trash2,
} from "lucide-react";
import { GiftList, GiftListItem } from "@/lib/giftLists";
import { formatFrenchPhone } from "@/lib/formatPhone";

export default function GiftListPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const [list, setList] = useState<GiftList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    // Multiple selection state
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reservation form state
    const [guestName, setGuestName] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [guestNote, setGuestNote] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupSlot, setPickupSlot] = useState("Après-midi (14h - 19h)");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState("");
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [reservedResultItems, setReservedResultItems] = useState<GiftListItem[]>([]);

    // Fetch list data
    useEffect(() => {
        async function fetchList() {
            try {
                const res = await fetch("/api/gift-lists");
                const data = await res.json();
                if (data.lists) {
                    const found = data.lists.find(
                        (l: GiftList) => l.slug.toLowerCase() === slug.toLowerCase()
                    );
                    if (found) {
                        setList(found);
                    } else {
                        setError("Cette liste de cadeaux n'existe pas ou a expiré.");
                    }
                }
            } catch (err) {
                setError("Impossible de charger la liste pour le moment.");
            } finally {
                setLoading(false);
            }
        }
        fetchList();
    }, [slug]);

    // Selected items derived from list
    const selectedItems = useMemo(() => {
        if (!list) return [];
        return list.items.filter((it) => selectedProductIds.includes(it.productId));
    }, [list, selectedProductIds]);

    const totalSelectedPrice = useMemo(() => {
        return selectedItems.reduce((acc, it) => acc + (it.price || 0), 0);
    }, [selectedItems]);

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    const toggleSelectProduct = (productId: string) => {
        if (list?.isArchived) return;
        const target = list?.items.find((it) => it.productId === productId);
        if (target?.isReserved) return;

        setSelectedProductIds((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
        setModalError("");
    };

    const removeSelectedProduct = (productId: string) => {
        setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    };

    const handleOpenModal = () => {
        if (selectedProductIds.length === 0) return;
        setModalError("");
        setReservationSuccess(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalError("");
        if (reservationSuccess) {
            setReservationSuccess(false);
            setReservedResultItems([]);
        }
    };

    const handleSubmitReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProductIds.length === 0) {
            setModalError("Veuillez sélectionner au moins un cadeau à offrir.");
            return;
        }

        if (!guestName.trim() || !guestPhone.trim() || !guestEmail.trim()) {
            setModalError("Veuillez renseigner votre nom, votre numéro de téléphone et votre adresse email.");
            return;
        }

        setIsSubmitting(true);
        setModalError("");

        try {
            const res = await fetch(`/api/gift-lists/${slug}/reserve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productIds: selectedProductIds,
                    guestName: guestName.trim(),
                    guestPhone: formatFrenchPhone(guestPhone.trim()),
                    guestEmail: guestEmail.trim(),
                    guestNote: guestNote.trim(),
                    pickupDate,
                    pickupSlot,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Une erreur est survenue lors de la réservation.");
            }

            // Update list state locally
            if (data.items && data.items.length > 0) {
                setReservedResultItems(data.items);
                setList((prev) => {
                    if (!prev) return prev;
                    const updatedMap = new Map(data.items.map((it: GiftListItem) => [it.productId, it]));
                    return {
                        ...prev,
                        items: prev.items.map((it) => (updatedMap.get(it.productId) as GiftListItem) || it),
                    };
                });
            }

            setReservationSuccess(true);
            setSelectedProductIds([]);
        } catch (err: any) {
            setModalError(err.message || "Erreur lors de la réservation.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const todayStr = new Date().toISOString().split("T")[0];

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center py-20">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[#475569] text-[15px] font-medium">Chargement de la liste de cadeaux...</p>
                </div>
            </div>
        );
    }

    if (error || !list) {
        return (
            <div className="min-h-screen bg-background py-20">
                <div className="container mx-auto px-4 max-w-lg text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                        <AlertCircle size={32} />
                    </div>
                    <h1 className="font-heading font-bold text-2xl text-[#264653]">
                        Liste introuvable
                    </h1>
                    <p className="text-[#475569] text-[15px]">
                        {error || "Nous n'avons pas trouvé cette liste de cadeaux."}
                    </p>
                    <Link
                        href="/boutique"
                        className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors text-sm shadow-sm"
                    >
                        <ArrowLeft size={16} /> Découvrir la boutique
                    </Link>
                </div>
            </div>
        );
    }

    const reservedCount = list.items.filter((it) => it.isReserved).length;
    const totalCount = list.items.length;
    const progressPercent = totalCount > 0 ? Math.round((reservedCount / totalCount) * 100) : 0;

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Hero Banner */}
            <div className="bg-gradient-to-b from-primary/10 via-background to-background pt-12 pb-8 border-b border-[#CBD5E1]/60">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link
                        href="/boutique"
                        className="inline-flex items-center text-[13px] font-bold text-[#475569] hover:text-[#264653] transition-colors mb-6"
                    >
                        <ArrowLeft size={16} className="mr-1" /> Retour à la boutique
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div
                                className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1 rounded-full mb-3 ${
                                    list.eventType === "naissance"
                                        ? "bg-secondary/15 text-secondary"
                                        : list.eventType === "autre"
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-primary/15 text-primary"
                                }`}
                            >
                                <Sparkles size={14} />
                                <span className="uppercase tracking-wider">
                                    {list.eventType === "naissance"
                                        ? "Liste de Naissance"
                                        : list.eventType === "autre"
                                        ? "Liste de Cadeaux"
                                        : "Liste d'Anniversaire"}
                                </span>
                            </div>

                            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-[#264653]">
                                La liste de {list.childName}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#475569] mt-2">
                                <span className="font-bold text-secondary text-[15px]">
                                    {list.age}
                                </span>
                                {list.eventDate && (
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <Calendar size={16} className="text-primary" />
                                        <span>
                                            {list.eventType === "naissance"
                                                ? `Arrivée prévue le ${new Date(list.eventDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
                                                : list.eventType === "autre"
                                                ? `Événement le ${new Date(list.eventDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
                                                : `Fête le ${new Date(list.eventDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Share action button */}
                        <div>
                            <button
                                onClick={handleShare}
                                className="inline-flex items-center gap-2 bg-white border border-[#CBD5E1] hover:border-primary/50 text-[#264653] font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all text-sm cursor-pointer"
                            >
                                <Share2 size={16} className="text-primary" />
                                <span>{copied ? "Lien copié !" : "Partager la liste"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Parents Welcome Note */}
                    {list.welcomeMessage && (
                        <div className="mt-6 bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                            <p className="text-[14px] sm:text-[15px] text-[#475569] italic leading-relaxed pl-2">
                                « {list.welcomeMessage} »
                            </p>
                            {list.parentName && (
                                <p className="text-xs text-[#264653] font-bold text-right mt-2">
                                    — {list.parentName}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Archive alert banner */}
                    {list.isArchived && (
                        <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl text-xs flex items-center gap-3">
                            <Archive size={20} className="text-amber-600 shrink-0" />
                            <div>
                                <strong className="block font-bold">Liste archivée</strong>
                                <span>L'événement a eu lieu il y a plus de 15 jours. Les réservations sont désormais clôturées. Merci à tous les participants !</span>
                            </div>
                        </div>
                    )}

                    {/* All items reserved celebratory banner */}
                    {totalCount > 0 && reservedCount === totalCount && !list.isArchived && (
                        <div className="mt-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5 text-left">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-2xl shadow-xs">
                                    🎉
                                </div>
                                <div>
                                    <h2 className="font-heading font-extrabold text-base md:text-lg text-emerald-950">
                                        Tous les souhaits de cette liste ont été comblés !
                                    </h2>
                                    <p className="text-xs text-emerald-800/90 mt-0.5">
                                        Un grand merci à tous les proches pour leur attention envers {list.childName}. Si vous souhaitez également faire plaisir, vous pouvez explorer notre boutique.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/boutique"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-full text-xs shadow-xs transition-all shrink-0 hover:scale-[1.02]"
                            >
                                <Store size={15} />
                                <span>Découvrir la boutique</span>
                            </Link>
                        </div>
                    )}

                    {/* Progress indicator */}
                    <div className="mt-8 bg-white p-4 rounded-2xl border border-[#CBD5E1] shadow-xs space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-[#264653]">
                                {reservedCount} sur {totalCount} cadeaux déjà offerts
                            </span>
                            <span className={reservedCount === totalCount ? "text-emerald-600 font-extrabold" : "text-secondary"}>
                                {progressPercent}% {reservedCount === totalCount ? "🎉" : ""}
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                    reservedCount === totalCount ? "bg-emerald-500" : "bg-secondary"
                                }`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="text-[12px] text-[#475569] text-center pt-1 font-medium">
                            {reservedCount === totalCount ? (
                                <span className="text-emerald-700 font-bold">
                                    ✨ 100% des cadeaux de la liste ont trouvé leur bienfaiteur !
                                </span>
                            ) : (
                                "💡 Cochez un ou plusieurs cadeaux pour les réserver ensemble à votre nom !"
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Gifts Grid */}
            <div className="container mx-auto px-4 max-w-5xl py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.items.map((item) => {
                        const priceFormatted = item.price
                            ? `${item.price.toFixed(2).replace(".", ",")} €`
                            : null;
                        const isSelected = selectedProductIds.includes(item.productId);

                        return (
                            <div
                                key={item.productId}
                                className={`bg-white rounded-3xl overflow-hidden border transition-all flex flex-col relative ${
                                    item.isReserved
                                        ? "border-green-200/60 bg-green-50/20 shadow-xs"
                                        : isSelected
                                        ? "border-secondary ring-2 ring-secondary/40 shadow-lg scale-[1.01]"
                                        : "border-[#CBD5E1] shadow-sm hover:shadow-md"
                                }`}
                            >
                                {/* Image & Reserved Badge / Selection Tag */}
                                <div className="relative aspect-square bg-muted/40 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className={`object-cover transition-transform duration-300 ${
                                            item.isReserved ? "opacity-85" : "hover:scale-105"
                                        }`}
                                    />

                                    {/* Reserved Overlay */}
                                    {item.isReserved && (
                                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
                                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-2 shadow-sm">
                                                <Heart size={22} className="fill-green-600" />
                                            </div>
                                            <span className="font-heading font-extrabold text-base text-green-800">
                                                Réservé par {item.reservedBy}
                                            </span>
                                            {item.guestNote && (
                                                <p className="text-xs text-green-900/80 italic mt-1 line-clamp-2 px-2">
                                                    « {item.guestNote} »
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Selection Checkmark Button on Image */}
                                    {!item.isReserved && !list.isArchived && (
                                        <button
                                            type="button"
                                            onClick={() => toggleSelectProduct(item.productId)}
                                            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md z-10 cursor-pointer ${
                                                isSelected
                                                    ? "bg-secondary text-white scale-110"
                                                    : "bg-white/95 text-[#94A3B8] hover:text-secondary hover:scale-105"
                                            }`}
                                            title={isSelected ? "Désélectionner ce cadeau" : "Sélectionner ce cadeau"}
                                            aria-label={isSelected ? "Désélectionner ce cadeau" : "Sélectionner ce cadeau"}
                                        >
                                            <Check size={20} className={isSelected ? "stroke-[3]" : "stroke-[2.5]"} />
                                        </button>
                                    )}

                                    {item.age && !item.isReserved && (
                                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-[#264653] shadow-xs border border-[#CBD5E1]">
                                            {item.age}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="min-w-0">
                                            <h3 className="font-heading font-bold text-lg text-[#264653] leading-snug">
                                                {item.name}
                                            </h3>
                                            {item.sku && (
                                                <span className="inline-block text-[11px] font-mono font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1]/70 px-2 py-0.5 rounded-md mt-1">
                                                    Réf : {item.sku}
                                                </span>
                                            )}
                                        </div>
                                        {priceFormatted && (
                                            <span className="font-heading font-bold text-lg text-secondary shrink-0">
                                                {priceFormatted}
                                            </span>
                                        )}
                                    </div>

                                    {item.description && (
                                        <p className="text-[#475569] text-[13px] sm:text-[14px] mb-4 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-3 border-t border-[#CBD5E1]/60">
                                        {item.isReserved ? (
                                            <div className="w-full py-2.5 px-4 rounded-xl bg-green-100/60 text-green-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed">
                                                <Check size={16} />
                                                <span>Cadeau déjà réservé</span>
                                            </div>
                                        ) : list.isArchived ? (
                                            <div className="w-full py-2.5 px-4 rounded-xl bg-[#F1F5F9] text-[#64748B] text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed">
                                                <Archive size={15} />
                                                <span>Liste archivée</span>
                                            </div>
                                        ) : isSelected ? (
                                            <button
                                                type="button"
                                                onClick={() => toggleSelectProduct(item.productId)}
                                                className="w-full bg-secondary/15 text-secondary border border-secondary/40 hover:bg-secondary/25 font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <Check size={18} className="stroke-[3]" />
                                                <span>Cadeau sélectionné (retirer)</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => toggleSelectProduct(item.productId)}
                                                className="w-full bg-secondary text-white hover:bg-secondary/90 font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                                            >
                                                <Gift size={16} />
                                                <span>Choisir ce cadeau</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sticky Floating Action Bar when 1+ gifts are selected */}
            {selectedProductIds.length > 0 && !isModalOpen && (
                <div className="fixed bottom-0 inset-x-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-[#CBD5E1] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
                    <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="w-11 h-11 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 shadow-xs">
                                <Gift size={22} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-heading font-extrabold text-[#264653] text-base md:text-lg">
                                        {selectedProductIds.length} {selectedProductIds.length > 1 ? "cadeaux choisis" : "cadeau choisi"}
                                    </span>
                                    {totalSelectedPrice > 0 && (
                                        <span className="text-secondary font-extrabold text-base md:text-lg">
                                            • {totalSelectedPrice.toFixed(2).replace(".", ",")} €
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-[#475569]">
                                    Paiement et retrait sur place à Puteaux
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => setSelectedProductIds([])}
                                className="px-4 py-2.5 rounded-full text-xs font-bold text-[#64748B] hover:text-[#264653] hover:bg-[#F1F5F9] transition-colors"
                            >
                                Tout désélectionner
                            </button>
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="flex-1 sm:flex-initial bg-primary hover:bg-primary/90 text-white font-extrabold py-3 px-6 rounded-full transition-all text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Valider ma sélection</span>
                                <ArrowRight size={17} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reservation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                        onClick={handleCloseModal}
                    />

                    <div className="min-h-full flex items-center justify-center p-4">
                        <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#CBD5E1] overflow-hidden my-8">
                            <button
                                onClick={handleCloseModal}
                                aria-label="Fermer"
                                className="absolute top-5 right-5 p-2 text-[#475569] hover:text-[#264653] rounded-full hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {!reservationSuccess ? (
                                <form onSubmit={handleSubmitReservation} className="space-y-4">
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-primary font-extrabold block">
                                            Réservation pour {list.childName}
                                        </span>
                                        <h3 className="font-heading font-extrabold text-xl md:text-2xl text-[#264653] leading-tight mt-1">
                                            {selectedItems.length > 1
                                                ? `Vos ${selectedItems.length} cadeaux sélectionnés`
                                                : "Votre cadeau sélectionné"}
                                        </h3>
                                    </div>

                                    {/* Selected Items summary list with remove buttons */}
                                    <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-[#CBD5E1]/70 max-h-52 overflow-y-auto space-y-2">
                                        {selectedItems.map((item) => (
                                            <div
                                                key={item.productId}
                                                className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-[#CBD5E1]/60 shadow-2xs"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0 border border-[#CBD5E1]/50">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-xs sm:text-sm text-[#264653] truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-secondary font-extrabold">
                                                            {item.price
                                                                ? `${item.price.toFixed(2).replace(".", ",")} €`
                                                                : "Prix en boutique"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeSelectedProduct(item.productId)}
                                                    className="p-1.5 text-[#94A3B8] hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0 cursor-pointer"
                                                    title="Retirer ce cadeau"
                                                    aria-label={`Retirer ${item.name}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Total Summary Row */}
                                        {totalSelectedPrice > 0 && selectedItems.length > 1 && (
                                            <div className="flex justify-between items-center pt-2 px-1 text-sm font-bold border-t border-[#CBD5E1]/60">
                                                <span className="text-[#264653]">Total estimé :</span>
                                                <span className="text-secondary text-base font-extrabold">
                                                    {totalSelectedPrice.toFixed(2).replace(".", ",")} €
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Simple Notice */}
                                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3.5 text-[14px] text-[#334155] leading-relaxed">
                                        <strong className="text-[#264653] font-extrabold">100% simple :</strong> Vos cadeaux apparaîtront immédiatement comme réservés à votre nom pour éviter tout doublon avec les autres invités. Vous réglez sur place lors de votre passage au magasin.
                                    </div>

                                    {modalError && (
                                        <div className="bg-destructive/10 text-destructive text-[14px] p-3 rounded-xl flex items-center gap-2 border border-destructive/20 font-medium">
                                            <AlertCircle size={18} className="shrink-0" />
                                            <span>{modalError}</span>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                            Votre Nom ou Surnom *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="Ex: Tata Sophie, Parrain Nicolas..."
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                            Votre Téléphone *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={guestPhone}
                                            onChange={(e) => setGuestPhone(formatFrenchPhone(e.target.value))}
                                            onBlur={() => setGuestPhone((prev) => formatFrenchPhone(prev))}
                                            placeholder="06 12 34 56 78"
                                            maxLength={14}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
                                        />
                                        <span className="text-[13px] text-[#475569] mt-1 block leading-snug">
                                            Pour que notre équipe prépare les paquets avec votre nom.
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                            Votre Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            placeholder="Ex: sophie@example.com"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
                                        />
                                        <span className="text-[13px] text-[#475569] mt-1 block leading-snug">
                                            Votre récapitulatif complet de réservation directement par email.
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                            Un mot doux pour {list.childName} (facultatif)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={guestNote}
                                            onChange={(e) => setGuestNote(e.target.value)}
                                            placeholder="Ex: Joyeux anniversaire mon grand !"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                                Date de passage
                                            </label>
                                            <input
                                                type="date"
                                                min={todayStr}
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                                Créneau horaire
                                            </label>
                                            <select
                                                value={pickupSlot}
                                                onChange={(e) => setPickupSlot(e.target.value)}
                                                className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                                            >
                                                <option value="Matin (10h - 13h)">Matin (10h - 13h)</option>
                                                <option value="Après-midi (14h - 19h)">Après-midi (14h - 19h)</option>
                                                <option value="Dès que possible">Dès que possible</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || selectedItems.length === 0}
                                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-extrabold py-3.5 rounded-full transition-colors shadow-md text-base flex items-center justify-center gap-2 disabled:opacity-50 mt-3 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <span>Réservation en cours...</span>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                <span>
                                                    {selectedItems.length > 1
                                                        ? `Confirmer mes ${selectedItems.length} cadeaux`
                                                        : "Confirmer ma réservation"}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-4 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-xs">
                                        <CheckCircle2 size={36} />
                                    </div>

                                    <h3 className="font-heading font-extrabold text-2xl text-[#264653]">
                                        {reservedResultItems.length > 1
                                            ? "Cadeaux réservés avec succès !"
                                            : "Cadeau réservé avec succès !"}
                                    </h3>

                                    <p className="text-[15px] text-[#475569] leading-relaxed">
                                        Merci <strong className="text-[#264653] font-bold">{guestName}</strong> ! Vos {reservedResultItems.length > 1 ? `${reservedResultItems.length} cadeaux sont maintenant bloqués` : "cadeau est maintenant bloqué"} à votre nom sur la liste de {list.childName}.
                                    </p>

                                    {/* List of successfully reserved items */}
                                    <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-[#CBD5E1] text-left space-y-2 max-h-48 overflow-y-auto">
                                        {reservedResultItems.map((item) => (
                                            <div key={item.productId} className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-[#CBD5E1]/40 last:border-b-0">
                                                <span className="font-bold text-[#264653] truncate pr-2">
                                                    🎁 {item.name}
                                                </span>
                                                <span className="font-extrabold text-secondary shrink-0">
                                                    {item.price ? `${item.price.toFixed(2).replace(".", ",")} €` : "En boutique"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-muted/40 rounded-2xl p-4 text-[14px] text-left w-full space-y-2 border border-[#CBD5E1]">
                                        <div className="flex items-start gap-2 text-[#264653] font-medium">
                                            <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                                            <div>
                                                <strong className="text-[#264653]">Retrait & règlement :</strong>
                                                <br />
                                                La Maison des Petits Loups
                                                <br />
                                                2 Place du Théâtre, 92800 Puteaux
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-[#264653] pt-1">
                                            <Phone className="text-primary shrink-0" size={16} />
                                            <span>01 47 72 73 71</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-[#264653]">
                                            <Clock className="text-primary shrink-0" size={16} />
                                            <span>Mardi au Samedi : 10h - 19h</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-full transition-colors text-sm shadow-sm cursor-pointer"
                                    >
                                        Fermer et retourner à la liste
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
