import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { SeasonalCampaignTeaser as CampaignTeaserType } from "@/lib/getSeasonalCampaign";

interface SeasonalCampaignTeaserProps {
    campaign?: CampaignTeaserType | null;
    campaigns?: CampaignTeaserType[];
    previewTheme?: string;
}

function getCardThemeStyles(theme?: string) {
    switch (theme) {
        case "halloween":
            return {
                cardBg: "bg-gradient-to-br from-amber-50 via-orange-50/70 to-purple-50/50 hover:from-amber-100/70 hover:to-purple-100/60",
                borderColor: "border-orange-200/90 hover:border-orange-400",
                badgeBg: "bg-orange-500/15 text-orange-700 border border-orange-300/60",
                badgeIcon: "🎃",
                buttonClass: "bg-white group-hover:bg-[#2E1065] text-[#2E1065] group-hover:text-white border border-purple-200 group-hover:border-transparent",
                hoverShadow: "hover:shadow-lg hover:shadow-orange-950/10",
            };
        case "noel":
            return {
                cardBg: "bg-gradient-to-br from-emerald-50 via-teal-50/70 to-red-50/40 hover:from-emerald-100/70 hover:to-red-100/50",
                borderColor: "border-emerald-200/90 hover:border-emerald-400",
                badgeBg: "bg-emerald-600/15 text-emerald-800 border border-emerald-300/60",
                badgeIcon: "🎄",
                buttonClass: "bg-white group-hover:bg-[#0B2317] text-[#0B2317] group-hover:text-white border border-emerald-200 group-hover:border-transparent",
                hoverShadow: "hover:shadow-lg hover:shadow-emerald-950/10",
            };
        case "paques":
            return {
                cardBg: "bg-gradient-to-br from-yellow-50 via-lime-50/70 to-emerald-50/40 hover:from-yellow-100/70 hover:to-lime-100/60",
                borderColor: "border-lime-200/90 hover:border-lime-400",
                badgeBg: "bg-lime-600/15 text-lime-800 border border-lime-300/60",
                badgeIcon: "🐣",
                buttonClass: "bg-white group-hover:bg-lime-800 text-lime-800 group-hover:text-white border border-lime-200 group-hover:border-transparent",
                hoverShadow: "hover:shadow-lg hover:shadow-lime-950/10",
            };
        case "rentree":
            return {
                cardBg: "bg-gradient-to-br from-slate-50 via-amber-50/70 to-blue-50/40 hover:from-slate-100/70 hover:to-amber-100/60",
                borderColor: "border-slate-200/90 hover:border-amber-400",
                badgeBg: "bg-amber-500/15 text-amber-800 border border-amber-300/60",
                badgeIcon: "🎒",
                buttonClass: "bg-white group-hover:bg-[#0F172A] text-[#0F172A] group-hover:text-white border border-slate-200 group-hover:border-transparent",
                hoverShadow: "hover:shadow-lg hover:shadow-slate-950/10",
            };
        default:
            return {
                cardBg: "bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-yellow-50/60 hover:from-amber-100/80 hover:to-orange-100/70",
                borderColor: "border-primary/25 hover:border-primary/50",
                badgeBg: "bg-primary/10 text-primary border border-primary/20",
                badgeIcon: "✨",
                buttonClass: "bg-white group-hover:bg-primary text-[#264653] group-hover:text-white border border-primary/30",
                hoverShadow: "hover:shadow-md",
            };
    }
}

function cleanDescription(text?: string) {
    if (!text) return "";
    return text.replace(/\*\*/g, "");
}

export default function SeasonalCampaignTeaser({ campaign, campaigns, previewTheme }: SeasonalCampaignTeaserProps) {
    // Normalize list of active campaigns
    const list: CampaignTeaserType[] = campaigns ?? (campaign ? [campaign] : []);

    // If no campaign is active, return null: 0 pixel layout impact on homepage
    if (list.length === 0) return null;

    const getSelectionHref = (slug: string) => {
        if (previewTheme && previewTheme.toLowerCase() !== "duo") {
            return `/selections/${slug}?theme=${encodeURIComponent(previewTheme)}`;
        }
        return `/selections/${slug}`;
    };

    // SINGLE CAMPAIGN LAYOUT: elegant full-width card
    if (list.length === 1) {
        const item = list[0];
        const styles = getCardThemeStyles(item.theme);

        return (
            <section className="container mx-auto px-4 -mt-2 mb-8">
                <Link
                    href={getSelectionHref(item.slug)}
                    className={`group block ${styles.cardBg} border ${styles.borderColor} rounded-3xl p-4 sm:p-5 shadow-xs ${styles.hoverShadow} transition-all`}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                            {item.bannerUrl ? (
                                <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden bg-white shrink-0 border border-black/10 shadow-xs">
                                    <Image
                                        src={item.bannerUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ) : (
                                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0 shadow-xs">
                                    <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                                </div>
                            )}

                            <div className="min-w-0">
                                {item.badgeText && (
                                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${styles.badgeBg}`}>
                                        <span aria-hidden="true">{styles.badgeIcon}</span>
                                        <span>{item.badgeText}</span>
                                    </span>
                                )}
                                <h2 className="font-heading font-extrabold text-base sm:text-lg md:text-xl text-[#264653] leading-snug group-hover:text-primary transition-colors">
                                    {item.title}
                                </h2>
                                {item.description && (
                                    <p className="text-xs sm:text-[13px] text-[#475569] line-clamp-1 mt-0.5">
                                        {cleanDescription(item.description)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action link pill */}
                        <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xs group-hover:shadow-sm transition-all shrink-0 w-full sm:w-auto justify-center ${styles.buttonClass}`}>
                            <span>Découvrir la sélection</span>
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            </section>
        );
    }

    // DUO OF CAMPAIGNS LAYOUT: 2 side-by-side thematic cards (e.g. Halloween + Noël)
    return (
        <section className="container mx-auto px-4 -mt-2 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {list.slice(0, 2).map((item) => {
                    const styles = getCardThemeStyles(item.theme);

                    return (
                        <Link
                            key={item.id}
                            href={getSelectionHref(item.slug)}
                            className={`group block ${styles.cardBg} border ${styles.borderColor} rounded-3xl p-4 sm:p-5 shadow-xs ${styles.hoverShadow} transition-all duration-300`}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 h-full">
                                <div className="flex items-center gap-3.5 sm:gap-4 w-full">
                                    {item.bannerUrl ? (
                                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden bg-white shrink-0 border border-black/10 shadow-xs">
                                            <Image
                                                src={item.bannerUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0 shadow-xs">
                                            <span className="text-xl" aria-hidden="true">
                                                {styles.badgeIcon}
                                            </span>
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        {item.badgeText && (
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${styles.badgeBg}`}>
                                                <span aria-hidden="true">{styles.badgeIcon}</span>
                                                <span className="truncate">{item.badgeText}</span>
                                            </span>
                                        )}
                                        <h2 className="font-heading font-extrabold text-sm sm:text-base md:text-lg text-[#264653] leading-snug group-hover:text-primary transition-colors line-clamp-1">
                                            {item.title}
                                        </h2>
                                        {item.description && (
                                            <p className="text-xs text-[#475569] line-clamp-1 mt-0.5">
                                                {cleanDescription(item.description)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action link button */}
                                <div className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full shadow-2xs group-hover:shadow-sm transition-all shrink-0 w-full sm:w-auto justify-center mt-2 sm:mt-0 ${styles.buttonClass}`}>
                                    <span>Découvrir</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
