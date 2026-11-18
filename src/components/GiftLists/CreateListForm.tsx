"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import {
    Gift,
    Calendar,
    Sparkles,
    Check,
    Plus,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Copy,
    Share2,
    ExternalLink,
    AlertCircle,
    Search,
    User,
    Mail,
    Heart,
    MessageSquare,
    PartyPopper,
    Cake,
    Baby,
    Store,
    Smile,
    Send,
    CheckCheck,
    X,
    Phone,
    Lock,
} from "lucide-react";
import { formatFrenchPhone } from "@/lib/formatPhone";

export default function CreateListForm({ availableProducts }: { availableProducts: Product[] }) {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Step 1: Event Details
    const [eventType, setEventType] = useState<"anniversaire" | "naissance" | "autre">("anniversaire");
    const [childName, setChildName] = useState("");
    const [age, setAge] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [parentName, setParentName] = useState("");
    const [parentEmail, setParentEmail] = useState("");
    const [parentPhone, setParentPhone] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    // Step 2: Product selection & filtering
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [ageFilter, setAgeFilter] = useState<string>("all");

    // Step 3: Success state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [createdSlug, setCreatedSlug] = useState("");
    const [copied, setCopied] = useState(false);

    // Quick suggestion age pills
    const quickAges = eventType === "naissance"
        ? ["Naissance", "0-3 mois", "3-6 mois", "6-12 mois", "1 an"]
        : ["1 an", "2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "7 ans", "8 ans", "9+ ans"];

    // Filter products
    const filteredProducts = useMemo(() => {
        return availableProducts.filter((product) => {
            const matchesSearch =
                !searchQuery.trim() ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            if (ageFilter === "all") return true;
            const ageStr = (product.age || "").toLowerCase();
            if (ageFilter === "baby") {
                return (
                    ageStr.includes("0") ||
                    ageStr.includes("1") ||
                    ageStr.includes("naissance") ||
                    ageStr.includes("mois")
                );
            }
            if (ageFilter === "toddler") {
                return ageStr.includes("2") || ageStr.includes("3") || ageStr.includes("4");
            }
            if (ageFilter === "kids") {
                return ageStr.includes("5") || ageStr.includes("6") || ageStr.includes("7");
            }
            if (ageFilter === "older") {
                return (
                    ageStr.includes("8") ||
                    ageStr.includes("9") ||
                    ageStr.includes("10") ||
                    ageStr.includes("12") ||
                    ageStr.includes("+")
                );
            }
            return true;
        });
    }, [availableProducts, searchQuery, ageFilter]);

    const toggleProduct = (productId: string) => {
        setSelectedProductIds((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const handleNextToProducts = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!childName.trim()) {
            setErrorMessage("Veuillez renseigner le prénom de l'enfant.");
            return;
        }
        if (!age.trim()) {
            setErrorMessage("Veuillez indiquer l'âge fêté.");
            return;
        }
        if (!parentEmail.trim()) {
            setErrorMessage("Veuillez renseigner votre adresse e-mail pour recevoir le récapitulatif.");
            return;
        }

        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCreateList = async () => {
        if (selectedProductIds.length === 0) {
            setErrorMessage("Veuillez sélectionner au moins 1 cadeau pour la liste.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        const selectedItems = availableProducts
            .filter((p) => selectedProductIds.includes(p.id))
            .map((p) => ({
                productId: p.id,
                name: p.name,
                sku: p.sku,
                slug: p.slug,
                image: p.image,
                price: p.price,
                age: p.age,
                description: p.description,
            }));

        try {
            const res = await fetch("/api/gift-lists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    childName: childName.trim(),
                    age: age.trim(),
                    eventType,
                    eventDate,
                    parentName: parentName.trim(),
                    parentEmail: parentEmail.trim(),
                    parentPhone: parentPhone.trim() ? formatFrenchPhone(parentPhone.trim()) : undefined,
                    welcomeMessage:
                        welcomeMessage.trim() ||
                        `Bienvenue sur la liste de cadeaux de ${childName.trim()} ! Retrouvez sa sélection de jouets coups de cœur chez La Maison des Petits Loups.`,
                    items: selectedItems,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Une erreur est survenue lors de la création.");
            }

            setCreatedSlug(data.slug);
            setStep(3);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err: any) {
            setErrorMessage(err.message || "Erreur de connexion. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fullShareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/liste/${createdSlug}`
            : `https://lmdpl.fr/liste/${createdSlug}`;

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullShareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Step indicators with high contrast & accessible colors */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
                <button
                    type="button"
                    onClick={() => step > 1 && setStep(1)}
                    className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all shadow-xs ${
                        step === 1
                            ? "bg-primary text-white scale-105 shadow-md ring-4 ring-primary/20"
                            : step > 1
                            ? "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200"
                            : "bg-white text-[#475569] border border-[#CBD5E1]"
                    }`}
                >
                    <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                            step === 1
                                ? "bg-white text-primary"
                                : step > 1
                                ? "bg-green-600 text-white"
                                : "bg-[#F1F5F9] text-[#475569]"
                        }`}
                    >
                        {step > 1 ? <Check size={14} /> : "1"}
                    </span>
                    <span className="hidden sm:inline">1. Infos de la fête</span>
                    <span className="sm:hidden">1. Infos</span>
                </button>

                <div
                    className={`w-6 sm:w-12 h-1 rounded-full transition-colors ${
                        step >= 2 ? "bg-secondary" : "bg-[#CBD5E1]"
                    }`}
                />

                <button
                    type="button"
                    onClick={() => {
                        if (childName && age && parentEmail) setStep(2);
                    }}
                    disabled={step < 2}
                    className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all shadow-xs ${
                        step === 2
                            ? "bg-secondary text-white scale-105 shadow-md ring-4 ring-secondary/20"
                            : step > 2
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-white text-[#475569] border border-[#CBD5E1] cursor-not-allowed"
                    }`}
                >
                    <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                            step === 2
                                ? "bg-white text-secondary"
                                : step > 2
                                ? "bg-green-600 text-white"
                                : "bg-[#F1F5F9] text-[#475569]"
                        }`}
                    >
                        {step > 2 ? <Check size={14} /> : "2"}
                    </span>
                    <span className="hidden sm:inline">2. Choix des cadeaux</span>
                    <span className="sm:hidden">2. Cadeaux</span>
                </button>

                <div
                    className={`w-6 sm:w-12 h-1 rounded-full transition-colors ${
                        step === 3 ? "bg-accent" : "bg-[#CBD5E1]"
                    }`}
                />

                <div
                    className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all shadow-xs ${
                        step === 3
                            ? "bg-gradient-to-r from-accent to-primary text-[#264653] scale-105 shadow-md ring-4 ring-accent/30 font-extrabold"
                            : "bg-white text-[#475569] border border-[#CBD5E1]"
                    }`}
                >
                    <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                            step === 3 ? "bg-[#264653] text-accent" : "bg-[#F1F5F9] text-[#475569]"
                        }`}
                    >
                        3
                    </span>
                    <span className="hidden sm:inline">3. Partage magique</span>
                    <span className="sm:hidden">3. Partage</span>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="bg-destructive/10 border-2 border-destructive/20 text-destructive text-sm font-medium p-4 rounded-2xl flex items-center gap-3 mb-6 shadow-xs animate-in fade-in duration-300">
                    <AlertCircle size={20} className="shrink-0 text-destructive" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* STEP 1: EVENT DETAILS FORM */}
            {step === 1 && (
                <form
                    onSubmit={handleNextToProducts}
                    className="bg-white p-6 sm:p-10 rounded-3xl border border-[#CBD5E1] shadow-xl space-y-8 relative overflow-hidden"
                >
                    {/* Top title banner */}
                    <div className="border-b border-[#CBD5E1]/70 pb-5">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
                            <span>Étape 1 sur 2</span>
                        </div>
                        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#264653] flex items-center gap-2">
                            <span>🎉</span> C'est pour quel grand événement ?
                        </h2>
                        <p className="text-[14px] sm:text-[15px] text-[#475569] mt-1 leading-relaxed">
                            Personnalisez les informations pour accueillir chaleureusement vos proches.
                        </p>
                    </div>

                    {/* Event Type selector - High impact, playful cards with readable text */}
                    <div>
                        <label className="block text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-2.5">
                            Type d'occasion :
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1: Anniversaire */}
                            <button
                                type="button"
                                onClick={() => {
                                    setEventType("anniversaire");
                                    if (!age || age === "Naissance") setAge("5 ans");
                                }}
                                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all relative flex items-start gap-3.5 sm:gap-4 cursor-pointer ${
                                    eventType === "anniversaire"
                                        ? "border-primary bg-primary/5 ring-4 ring-primary/15 shadow-md"
                                        : "border-[#CBD5E1] bg-white hover:border-primary/50 hover:bg-gray-50/50"
                                }`}
                            >
                                <span className="text-[32px] sm:text-[38px] leading-none bg-primary/10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0">
                                    🎂
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                        <h3 className="font-heading font-bold text-base sm:text-lg text-[#264653]">
                                            Fête d'Anniversaire
                                        </h3>
                                        {eventType === "anniversaire" && (
                                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0">
                                                <Check size={14} />
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[12px] sm:text-[13px] text-[#475569] mt-1 leading-snug">
                                        Pour souffler ses bougies et recevoir ses jouets de rêve sans aucun doublon !
                                    </p>
                                </div>
                            </button>

                            {/* Card 2: Naissance */}
                            <button
                                type="button"
                                onClick={() => {
                                    setEventType("naissance");
                                    setAge("Naissance");
                                }}
                                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all relative flex items-start gap-3.5 sm:gap-4 cursor-pointer ${
                                    eventType === "naissance"
                                        ? "border-secondary bg-secondary/5 ring-4 ring-secondary/15 shadow-md"
                                        : "border-[#CBD5E1] bg-white hover:border-secondary/50 hover:bg-gray-50/50"
                                }`}
                            >
                                <span className="text-[32px] sm:text-[38px] leading-none bg-secondary/10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0">
                                    🍼
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                        <h3 className="font-heading font-bold text-base sm:text-lg text-[#264653]">
                                            Naissance & Bébé
                                        </h3>
                                        {eventType === "naissance" && (
                                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs shrink-0">
                                                <Check size={14} />
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[12px] sm:text-[13px] text-[#475569] mt-1 leading-snug">
                                        Pour préparer la venue de bébé avec doudous, peluches et premiers jouets d'éveil.
                                    </p>
                                </div>
                            </button>

                            {/* Card 3: Autre occasion */}
                            <button
                                type="button"
                                onClick={() => {
                                    setEventType("autre");
                                    if (!age || age === "Naissance") setAge("5 ans");
                                }}
                                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all relative flex items-start gap-3.5 sm:gap-4 cursor-pointer ${
                                    eventType === "autre"
                                        ? "border-purple-600 bg-purple-500/5 ring-4 ring-purple-500/15 shadow-md"
                                        : "border-[#CBD5E1] bg-white hover:border-purple-500/50 hover:bg-gray-50/50"
                                }`}
                            >
                                <span className="text-[28px] sm:text-[32px] leading-none bg-purple-100 text-purple-600 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border border-purple-200/60">
                                    <Gift size={26} strokeWidth={2.2} className="text-purple-600" />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                        <h3 className="font-heading font-bold text-base sm:text-lg text-[#264653]">
                                            Autre occasion
                                        </h3>
                                        {eventType === "autre" && (
                                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs shrink-0">
                                                <Check size={14} />
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[12px] sm:text-[13px] text-[#475569] mt-1 leading-snug">
                                        Créez une liste personnalisée pour célébrer les moments qui comptent.
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Child Name & Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                <Smile size={16} className="text-primary" />
                                <span>Prénom de l'enfant *</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={childName}
                                onChange={(e) => setChildName(e.target.value)}
                                placeholder="Ex: Léon, Camille, Arthur..."
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] font-medium placeholder:text-[#64748B] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                <Cake size={16} className="text-secondary" />
                                <span>
                                    {eventType === "anniversaire"
                                        ? "Âge fêté *"
                                        : eventType === "naissance"
                                        ? "Âge / Arrivée du bébé *"
                                        : "Âge de l'enfant *"}
                                </span>
                            </label>
                            <input
                                type="text"
                                required
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder={
                                    eventType === "naissance"
                                        ? "Ex: Naissance, 0-3 mois..."
                                        : eventType === "autre"
                                        ? "Ex: 4 ans, 7 ans, Bébé..."
                                        : "Ex: 4 ans, 1 an..."
                                }
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] font-medium placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all bg-white"
                            />

                            {/* Accessible quick selection chips for age */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {quickAges.map((quickAge) => (
                                    <button
                                        key={quickAge}
                                        type="button"
                                        onClick={() => setAge(quickAge)}
                                        className={`text-xs sm:text-[13px] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer border ${
                                            age === quickAge
                                                ? "bg-secondary text-white border-secondary shadow-xs scale-105"
                                                : "bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8]"
                                        }`}
                                    >
                                        {quickAge}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Date & Parent Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                <Calendar size={16} className="text-accent" />
                                <span>
                                    {eventType === "naissance"
                                        ? "Date prévue (facultatif)"
                                        : eventType === "autre"
                                        ? "Date de l'événement (facultatif)"
                                        : "Date de la fête (facultatif)"}
                                </span>
                            </label>
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                                <User size={16} className="text-primary" />
                                <span>Votre Prénom ou Nom *</span>
                            </label>
                            <input
                                type="text"
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                                placeholder="Ex: Maman de Léon, Sophie..."
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] font-medium placeholder:text-[#64748B] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white"
                            />
                        </div>
                    </div>

                    {/* Parent Email */}
                    <div>
                        <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                            <Mail size={16} className="text-secondary" />
                            <span>Votre Adresse E-mail *</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                            placeholder="Ex: sophie@example.com"
                            className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] font-medium placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all bg-white"
                        />
                        <div className="flex items-center gap-1.5 text-[14px] text-[#475569] mt-2">
                            <CheckCheck size={16} className="text-secondary shrink-0" />
                            <span>
                                Promis, 100% confidentiel : nous vous envoyons votre lien secret et les alertes quand un cadeau est réservé.
                            </span>
                        </div>
                    </div>

                    {/* Parent Phone (Facultatif - Admin boutique uniquement) */}
                    <div>
                        <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                            <Phone size={16} className="text-secondary" />
                            <span>Votre Téléphone (facultatif)</span>
                        </label>
                        <input
                            type="tel"
                            value={parentPhone}
                            onChange={(e) => setParentPhone(formatFrenchPhone(e.target.value))}
                            onBlur={() => setParentPhone((prev) => formatFrenchPhone(prev))}
                            placeholder="06 12 34 56 78"
                            maxLength={14}
                            className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] font-medium placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all bg-white"
                        />
                        <div className="flex items-center gap-1.5 text-[13px] text-[#475569] mt-2">
                            <Lock size={15} className="text-secondary shrink-0" />
                            <span>
                                Strictement privé (usage boutique uniquement) : pour vous contacter si un article doit être réapprovisionné ou pour le suivi de votre liste.
                            </span>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div>
                        <label className="flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide mb-1.5">
                            <Heart size={16} className="text-primary" />
                            <span>Petit mot pour vos proches (facultatif)</span>
                        </label>
                        <textarea
                            rows={3}
                            value={welcomeMessage}
                            onChange={(e) => setWelcomeMessage(e.target.value)}
                            placeholder={`Ex: Bienvenue sur la liste de ${childName || "notre enfant"} ! Retrouvez sa sélection de jouets coups de cœur chez La Maison des Petits Loups à Puteaux.`}
                            className="w-full px-4 py-3 rounded-2xl border-2 border-[#CBD5E1] text-[15px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white"
                        />
                    </div>

                    {/* High-visibility Action Button */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#CBD5E1]/70">
                        <div className="text-[14px] text-[#475569] flex items-center gap-2">
                            <span className="text-lg">🎈</span>
                            <span>Étape suivante : sélectionnez les jouets en 1 clic</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-heading font-extrabold text-base md:text-lg px-9 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <span>Choisir les cadeaux</span>
                            <ArrowRight size={20} className="animate-pulse" />
                        </button>
                    </div>
                </form>
            )}

            {/* STEP 2: CATALOG PICKER WITH SEARCH & FILTERS */}
            {step === 2 && (
                <div className="space-y-6">
                    {/* Header Banner */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#CBD5E1] shadow-xl space-y-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-2">
                                    <span>Étape 2 sur 2</span>
                                </div>
                                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#264653]">
                                    Quels cadeaux feront rêver {childName || "votre enfant"} ? 🧸
                                </h2>
                                <p className="text-[14px] sm:text-[15px] text-[#475569] mt-1 leading-relaxed">
                                    Cliquez sur les articles pour les ajouter à votre liste. Vos proches pourront les réserver en ligne !
                                </p>
                            </div>

                            {/* Counter pill */}
                            <div className="bg-secondary/10 border-2 border-secondary/20 p-3.5 rounded-2xl flex items-center gap-3 shrink-0">
                                <span className="text-2xl">🎁</span>
                                <div>
                                    <div className="font-heading font-extrabold text-lg text-secondary">
                                        {selectedProductIds.length} cadeau{selectedProductIds.length > 1 ? "x" : ""}
                                    </div>
                                    <div className="text-[12px] sm:text-[13px] text-[#475569] font-medium">
                                        dans votre sélection
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filters toolbar */}
                        <div className="pt-2 border-t border-[#CBD5E1]/70 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                            {/* Search box */}
                            <div className="relative flex-1 max-w-md">
                                <Search
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Rechercher une peluche, un jeu, un jouet..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[15px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 bg-white"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#264653]"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Age category chips with high contrast */}
                            <div className="flex flex-wrap gap-1.5 items-center">
                                <button
                                    type="button"
                                    onClick={() => setAgeFilter("all")}
                                    className={`text-[13px] font-bold px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                                        ageFilter === "all"
                                            ? "bg-[#264653] text-white border-[#264653] shadow-xs"
                                            : "bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC]"
                                    }`}
                                >
                                    Tous les jouets
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAgeFilter("baby")}
                                    className={`text-[13px] font-bold px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                                        ageFilter === "baby"
                                            ? "bg-secondary text-white border-secondary shadow-xs"
                                            : "bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC]"
                                    }`}
                                >
                                    🍼 0 - 18 mois
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAgeFilter("toddler")}
                                    className={`text-[13px] font-bold px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                                        ageFilter === "toddler"
                                            ? "bg-primary text-white border-primary shadow-xs"
                                            : "bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC]"
                                    }`}
                                >
                                    🎈 2 - 4 ans
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAgeFilter("kids")}
                                    className={`text-[13px] font-extrabold px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                                        ageFilter === "kids"
                                            ? "bg-accent text-[#264653] border-accent shadow-xs"
                                            : "bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC]"
                                    }`}
                                >
                                    🎨 5 - 7 ans
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAgeFilter("older")}
                                    className={`text-[13px] font-bold px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                                        ageFilter === "older"
                                            ? "bg-[#264653] text-white border-[#264653] shadow-xs"
                                            : "bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC]"
                                    }`}
                                >
                                    🚀 8 ans et +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-[#CBD5E1] shadow-sm">
                            <span className="text-4xl block mb-2">🔍</span>
                            <h3 className="font-heading font-bold text-xl text-[#264653]">
                                Aucun jouet ne correspond à votre recherche
                            </h3>
                            <p className="text-[14px] text-[#475569] mt-1">
                                Essayez un autre mot-clé ou réinitialisez les filtres d'âge.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setAgeFilter("all");
                                }}
                                className="mt-4 text-[13px] font-bold text-primary hover:underline cursor-pointer"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => {
                                const isSelected = selectedProductIds.includes(product.id);
                                const priceFormatted = product.price
                                    ? `${product.price.toFixed(2).replace(".", ",")} €`
                                    : null;

                                return (
                                    <div
                                        key={product.id}
                                        onClick={() => toggleProduct(product.id)}
                                        className={`group cursor-pointer rounded-3xl overflow-hidden border-2 p-4 bg-white transition-all flex flex-col relative ${
                                            isSelected
                                                ? "border-secondary ring-4 ring-secondary/20 shadow-lg bg-secondary/[0.03] scale-[1.01]"
                                                : "border-[#CBD5E1]/80 shadow-xs hover:border-primary/60 hover:shadow-md hover:-translate-y-1"
                                        }`}
                                    >
                                        {/* Selection Badge in top right */}
                                        <div
                                            className={`absolute top-6 right-6 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                                isSelected
                                                    ? "bg-secondary text-white shadow-md scale-110"
                                                    : "bg-white/95 border-2 border-[#CBD5E1] text-[#64748B] group-hover:border-primary group-hover:text-primary"
                                            }`}
                                        >
                                            {isSelected ? <Check size={18} strokeWidth={3} /> : <Plus size={18} />}
                                        </div>

                                        {/* Image */}
                                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 mb-3.5">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {product.age && (
                                                <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#264653] text-xs font-bold px-2.5 py-1 rounded-full shadow-xs border border-[#CBD5E1]">
                                                    Âge : {product.age}
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="font-heading font-extrabold text-base text-[#264653] group-hover:text-primary transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                            {product.sku && (
                                                <span className="inline-block text-[11px] font-mono font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1]/70 px-2 py-0.5 rounded-md mt-1">
                                                    Réf : {product.sku}
                                                </span>
                                            )}
                                            {product.description && (
                                                <p className="text-[13px] sm:text-[14px] text-[#475569] line-clamp-2 mt-1 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Price and Action Button */}
                                        <div className="mt-4 pt-3 border-t border-[#CBD5E1]/60 flex items-center justify-between gap-2">
                                            <span className="text-[#264653] font-heading font-extrabold text-base">
                                                {priceFormatted || "Prix boutique"}
                                            </span>

                                            <span
                                                className={`text-xs font-bold py-2 px-3.5 rounded-xl transition-all flex items-center gap-1.5 ${
                                                    isSelected
                                                        ? "bg-secondary text-white shadow-xs"
                                                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                                }`}
                                            >
                                                {isSelected ? (
                                                    <>
                                                        <Check size={14} strokeWidth={2.5} />
                                                        <span>Ajouté</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus size={14} />
                                                        <span>Ajouter</span>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Highly Visible Sticky Bottom Navigation Bar */}
                    <div className="sticky bottom-6 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-secondary/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <button
                            type="button"
                            onClick={() => {
                                setStep(1);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-[13px] font-bold text-[#475569] hover:text-[#264653] flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={16} />
                            <span>Modifier les infos</span>
                        </button>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-left">
                                <span className="font-heading font-extrabold text-sm sm:text-base text-[#264653] block">
                                    {selectedProductIds.length} cadeau{selectedProductIds.length > 1 ? "x" : ""} sélectionné{selectedProductIds.length > 1 ? "s" : ""}
                                </span>
                                <span className="text-[13px] text-[#475569] hidden sm:inline">
                                    {selectedProductIds.length === 0
                                        ? "Sélectionnez au moins 1 article"
                                        : "Prêt pour vos proches !"}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleCreateList}
                                disabled={selectedProductIds.length === 0 || isSubmitting}
                                className="bg-secondary hover:bg-secondary/90 text-white font-heading font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Sparkles size={18} className="animate-spin" />
                                        <span>Création de votre liste...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        <span>Générer ma liste de cadeaux</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 3: CREATED SUCCESS & SHARING (Anniversaire style celebration) */}
            {step === 3 && (
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#CBD5E1] shadow-xl text-center max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-400">
                    {/* Big celebratory icon with warm halo */}
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                            <PartyPopper size={48} className="text-green-600 animate-bounce" />
                        </div>
                        <span className="absolute -top-1 -right-1 text-2xl animate-pulse">✨</span>
                        <span className="absolute -bottom-1 -left-1 text-2xl animate-pulse">🎈</span>
                    </div>

                    <div>
                        <div className="inline-block bg-primary/10 text-primary text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                            🎉 Youpi ! C'est en ligne ! 🎈
                        </div>
                        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#264653]">
                            La liste de {childName} est prête !
                        </h2>
                        <p className="text-[15px] sm:text-base text-[#475569] max-w-md mx-auto mt-2 leading-relaxed">
                            Partagez le lien à vos proches pour qu'ils puissent réserver leurs cadeaux en toute sérénité.
                        </p>
                    </div>

                    {/* Share Box with prominent Copy button */}
                    <div className="bg-muted/40 p-5 rounded-2xl border-2 border-[#CBD5E1] text-left space-y-3">
                        <label className="block text-[13px] sm:text-sm font-bold text-[#264653] tracking-wide">
                            Lien magique de votre liste :
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2 rounded-xl border border-[#CBD5E1]">
                            <input
                                type="text"
                                readOnly
                                value={fullShareUrl}
                                className="flex-1 text-[15px] bg-transparent outline-none text-[#334155] font-mono px-3 py-2 truncate"
                            />
                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`text-xs font-extrabold px-5 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                                    copied
                                        ? "bg-green-600 text-white"
                                        : "bg-primary hover:bg-primary/90 text-white"
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} />
                                        <span>Lien copié !</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        <span>Copier le lien</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Prominent Action Buttons (WhatsApp & Live View) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                `Coucou ! Voici la liste de cadeaux pour ${childName} : ${fullShareUrl} 🎁`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-extrabold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-base flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <Send size={18} />
                            <span>Envoyer par WhatsApp</span>
                        </a>

                        <Link
                            href={`/liste/${createdSlug}`}
                            className="bg-secondary hover:bg-secondary/90 text-white font-heading font-extrabold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-base flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <span>Voir ma liste en direct</span>
                            <ExternalLink size={18} />
                        </Link>
                    </div>

                    {/* Explanatory 3-step recap for guests */}
                    <div className="bg-white border border-[#CBD5E1] rounded-2xl p-5 text-left text-xs space-y-3">
                        <h4 className="font-heading font-bold text-base text-[#264653] flex items-center gap-2">
                            <span>ℹ️</span> Comment ça se passe pour vos invités ?
                        </h4>
                        <ol className="space-y-2 text-[#475569] text-[14px] list-decimal list-inside leading-relaxed">
                            <li>Vos proches ouvrent ce lien et choisissent leur cadeau coup de cœur.</li>
                            <li>Ils le réservent en ligne (l'article est alors bloqué pour éviter tout doublon).</li>
                            <li>Ils viennent le récupérer et régler directement à la boutique de Puteaux !</li>
                        </ol>
                    </div>

                    {/* Reset button to create another list */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setChildName("");
                                setAge("");
                                setEventDate("");
                                setParentEmail("");
                                setWelcomeMessage("");
                                setSelectedProductIds([]);
                                setStep(1);
                            }}
                            className="text-sm font-bold text-[#475569] hover:text-[#264653] underline transition-colors cursor-pointer"
                        >
                            Créer une autre liste de cadeaux
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
