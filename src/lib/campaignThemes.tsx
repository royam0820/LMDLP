import React from "react";

export type CampaignThemeKey = "halloween" | "noel" | "paques" | "rentree" | "default";

export interface ThemeConfig {
    id: CampaignThemeKey;
    displayName: string;
    // Hero styling
    heroBgClass: string;
    breadcrumbTextClass: string;
    breadcrumbActiveTextClass: string;
    badgeBgClass: string;
    badgeTextClass: string;
    badgeBorderClass: string;
    badgeIcon: string;
    titleClass: string;
    descriptionClass: string;
    strongTextClass?: string;
    bannerBorderClass: string;
    bannerGlowClass: string;
    // Divider
    waveFillColor: string; // Hex color for the SVG wave
    // Product section styling
    contentBgClass: string;
    sectionTitleClass: string;
    sectionSubtitleClass: string;
    productCardAccentClass: string;
    productBadgeText?: string;
    // Discovery banner at bottom
    bottomBannerBgClass: string;
    bottomBannerBorderClass: string;
    bottomBannerBtnClass: string;
    bottomBannerTitleClass: string;
    bottomBannerTextClass: string;
    // Decorative components
    Decorations: React.FC;
}

/* =========================================================================
   VIBRANT & FESTIVE DECORATIVE SVGS (Luminous, crisp and playful)
   ========================================================================= */

/**
 * 4-Point Golden Sparkle Star with central glow
 */
export const GoldenSparkleSvg = ({ className = "w-6 h-6 text-yellow-300" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
        <path d="M16 0 C16 9 23 16 32 16 C23 16 16 23 16 32 C16 23 9 16 0 16 C9 16 16 9 16 0 Z" />
        <circle cx="16" cy="16" r="3" fill="#FFFBEB" />
    </svg>
);

/**
 * Ornate Crystalline Snowflake for Noël (Crisp, detailed, glowing)
 */
export const OrnateSnowflakeSvg = ({ className = "w-10 h-10 text-white" }: { className?: string }) => (
    <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        {/* Main 6 axes */}
        <line x1="24" y1="3" x2="24" y2="45" />
        <line x1="5.8" y1="13.5" x2="42.2" y2="34.5" />
        <line x1="5.8" y1="34.5" x2="42.2" y2="13.5" />
        {/* Central diamond facet */}
        <polygon points="24,19 28,24 24,29 20,24" fill="currentColor" fillOpacity="0.4" strokeWidth="1.5" />
        {/* Branch chevrons */}
        <path d="M20 9l4 4 4-4" />
        <path d="M20 39l4-4 4 4" />
        <path d="M10 18l5 2 2-5" />
        <path d="M38 30l-5-2-2 5" />
        <path d="M10 30l5-2 2 5" />
        <path d="M38 18l-5 2-2-5" />
    </svg>
);

/**
 * Cute, Vibrant Halloween Bat (Warm pumpkin & amber glow)
 */
export const CuteBatSvg = ({ className = "w-12 h-7 text-amber-300" }: { className?: string }) => (
    <svg viewBox="0 0 64 36" fill="currentColor" className={className} aria-hidden="true">
        {/* Soft, friendly rounded bat with expressive wings */}
        <path d="M32 13c-3 0-5 2.2-5 5 0 1.3.6 2.4 1.5 3.3-1 2.2-3 4.2-5.7 4.2-2.2 0-4-1.3-5-3 .2-1.6-.2-3.3-1.1-4.6-2.8-4-8.3-7-15.5-7-3 0-5.3.8-6.6 2 2 4.4 5.6 8.2 10 10.8 2 1.1 4.2 1.8 6.5 1.8 2.5 0 4.7-.9 6.5-2.2 1.3 2.4 3.9 4.2 7 4.2 2.2 0 4.2-.9 5.8-2.4 1.1 1.1 2.5 1.9 4 2.2 1.5-.3 2.9-1.1 4-2.2 1.6 1.5 3.6 2.4 5.8 2.4 3.1 0 5.7-1.8 7-4.2 1.8 1.3 4 2.2 6.5 2.2 2.3 0 4.5-.7 6.5-1.8 4.4-2.6 8-6.4 10-10.8-1.3-1.2-3.6-2-6.6-2-7.2 0-12.7 3-15.5 7-.9 1.3-1.3 3-1.1 4.6-1 1.7-2.8 3-5 3-2.7 0-4.7-2-5.7-4.2.9-.9 1.5-2 1.5-3.3 0-2.8-2-5-5-5z" />
        {/* Cute perky ears */}
        <path d="M28.5 14.5l-3-5.5 4.5 2.2zm7 0l3-5.5-4.5 2.2z" />
    </svg>
);

/**
 * Cute, Smiling Pumpkin Jack-o'-lantern
 */
export const CutePumpkinSvg = ({ className = "w-9 h-9" }: { className?: string }) => (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        {/* Stem & Leaf */}
        <path d="M24 5c0 0-1 4.5-3 7" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M24 10c2.5-1.5 6-1.5 7 1s-0.5 4.5-3.5 4.5" fill="#22c55e" />
        {/* Pumpkin Body */}
        <ellipse cx="24" cy="29" rx="19" ry="14.5" fill="#ea580c" />
        <ellipse cx="24" cy="29" rx="14" ry="14.5" fill="#f97316" />
        <ellipse cx="24" cy="29" rx="7.5" ry="14.5" fill="#fb923c" />
        {/* Friendly eyes & smile */}
        <ellipse cx="19.5" cy="26" rx="2" ry="2.5" fill="#431407" />
        <ellipse cx="28.5" cy="26" rx="2" ry="2.5" fill="#431407" />
        <path d="M19 32.5c2 2.5 8 2.5 10 0" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

/**
 * Decorated Easter Egg for Pâques (Joyful, pastel, patterned)
 */
export const EasterEggSvg = ({ className = "w-9 h-11" }: { className?: string }) => (
    <svg viewBox="0 0 36 44" fill="none" className={className} aria-hidden="true">
        {/* Egg Shell in joyful pastel pink/coral */}
        <path d="M18 2 C8 2 2 18 2 29 C2 37.3 9.2 42 18 42 C26.8 42 34 37.3 34 29 C34 18 28 2 18 2 Z" fill="#F472B6" />
        {/* Wave Bands */}
        <path d="M4 22 C10 18 26 26 32 22" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
        <path d="M5 29 C11 25 25 33 31 29" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />
        {/* Polka dots */}
        <circle cx="18" cy="12" r="2.5" fill="#FEF08A" />
        <circle cx="11" cy="15" r="2" fill="#FFFFFF" />
        <circle cx="25" cy="15" r="2" fill="#FFFFFF" />
        <circle cx="18" cy="36" r="2" fill="#FFFFFF" />
    </svg>
);

/**
 * Spring Daisy Flower for Pâques
 */
export const DaisyFlowerSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
        {/* White petals */}
        <circle cx="16" cy="8" r="4.5" fill="#FFFFFF" />
        <circle cx="16" cy="24" r="4.5" fill="#FFFFFF" />
        <circle cx="8" cy="16" r="4.5" fill="#FFFFFF" />
        <circle cx="24" cy="16" r="4.5" fill="#FFFFFF" />
        <circle cx="10.3" cy="10.3" r="4.5" fill="#FFFFFF" />
        <circle cx="21.7" cy="21.7" r="4.5" fill="#FFFFFF" />
        <circle cx="10.3" cy="21.7" r="4.5" fill="#FFFFFF" />
        <circle cx="21.7" cy="10.3" r="4.5" fill="#FFFFFF" />
        {/* Golden sunny center */}
        <circle cx="16" cy="16" r="5" fill="#FBBF24" />
        <circle cx="16" cy="16" r="3.5" fill="#F59E0B" />
    </svg>
);

/**
 * Cute Stationery Pencil for Rentrée
 */
export const CutePencilSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
        <path d="M26 6 L20 0 L4 16 L2 24 L10 22 L26 6 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <path d="M2 24 L6 20 L8 22 Z" fill="#4B5563" />
        <path d="M20 0 L26 6 L23 9 L17 3 Z" fill="#F43F5E" />
    </svg>
);

/**
 * Cute Schoolbag / Cartable d'écolier for Rentrée
 */
export const CuteSchoolbagSvg = ({ className = "w-10 h-9" }: { className?: string }) => (
    <svg viewBox="0 0 44 38" fill="none" className={className} aria-hidden="true">
        {/* Top Handle */}
        <path d="M16 8 C16 3.5 28 3.5 28 8" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" />
        {/* Main Satchel Body */}
        <rect x="4" y="8" width="36" height="26" rx="4" fill="#D97706" />
        {/* Bottom front pocket */}
        <rect x="7" y="19" width="30" height="12" rx="2.5" fill="#B45309" />
        {/* Flap with gentle curve */}
        <path
            d="M4 10 C4 8.9 4.9 8 6 8 L38 8 C39.1 8 40 8.9 40 10 L40 21 C40 22.1 39.1 23 38 23 L26 23 C24 25.5 20 25.5 18 23 L6 23 C4.9 23 4 22.1 4 21 Z"
            fill="#F59E0B"
        />
        {/* Flap Stitching Detail */}
        <path d="M6 11 L38 11" stroke="#FEF08A" strokeWidth="1" strokeDasharray="2 1.5" />
        {/* Left Leather Strap & Buckle */}
        <rect x="11" y="16" width="4" height="13" rx="1" fill="#78350F" />
        <rect x="10.5" y="21" width="5" height="4.5" rx="1" fill="#FEF08A" stroke="#92400E" strokeWidth="0.8" />
        {/* Right Leather Strap & Buckle */}
        <rect x="29" y="16" width="4" height="13" rx="1" fill="#78350F" />
        <rect x="28.5" y="21" width="5" height="4.5" rx="1" fill="#FEF08A" stroke="#92400E" strokeWidth="0.8" />
        {/* Center Name-tag Window */}
        <rect x="18" y="13.5" width="8" height="5.5" rx="1" fill="#FFFBEB" stroke="#B45309" strokeWidth="0.8" />
        <line x1="20" y1="16.2" x2="24" y2="16.2" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
);

/* =========================================================================
   THEMED DECORATIONS LAYOUTS (Framing the content beautifully)
   ========================================================================= */

export const HalloweenDecorations: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            {/* Ambient Warm Moonlight Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[700px] h-96 bg-radial from-amber-500/25 via-purple-600/15 to-transparent blur-3xl" />

            {/* Constellation framing the central content */}
            <div className="container mx-auto px-4 max-w-5xl h-full relative">
                {/* Top Left: Cute floating bat near breadcrumb */}
                <div className="hidden sm:block absolute top-6 sm:top-8 -left-12 lg:-left-16 motion-safe:animate-[bounce_6s_ease-in-out_infinite]">
                    <CuteBatSvg className="w-12 h-7 sm:w-16 sm:h-9 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.85)] -rotate-12" />
                </div>

                {/* Top Right: Golden Sparkle cluster near badge */}
                <div className="absolute top-6 sm:top-8 right-4 sm:-right-8 motion-safe:animate-[bounce_7s_ease-in-out_infinite]">
                    <GoldenSparkleSvg className="w-8 h-8 sm:w-11 sm:h-11 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.9)]" />
                </div>

                {/* Mid Left: Floating Pumpkin near title */}
                <div className="hidden md:block absolute top-32 -left-16 motion-safe:animate-[bounce_8s_ease-in-out_infinite]">
                    <CutePumpkinSvg className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_14px_rgba(249,115,22,0.9)] rotate-6" />
                </div>

                {/* Mid Right: Second Bat flanking the title/banner */}
                <div className="absolute top-28 right-4 sm:-right-12 motion-safe:animate-[bounce_6s_ease-in-out_infinite]">
                    <CuteBatSvg className="w-10 h-6 sm:w-14 sm:h-8 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.85)] rotate-12" />
                </div>

                {/* Center Mid: Twinkling golden star above banner */}
                <div className="absolute top-18 right-1/3 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.95)]" />
                </div>

                {/* Bottom Left Star near banner */}
                <div className="hidden sm:block absolute bottom-28 -left-10 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                </div>

                {/* Bottom Right Star */}
                <div className="hidden lg:block absolute bottom-24 -right-10 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-7 h-7 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
                </div>
            </div>

            {/* Ambient bats on ultra-wide screens */}
            <div className="hidden xl:block absolute top-16 left-10 opacity-70">
                <CuteBatSvg className="w-11 h-6 text-purple-300/80 -rotate-6" />
            </div>
            <div className="hidden xl:block absolute top-24 right-10 opacity-70">
                <CuteBatSvg className="w-11 h-6 text-amber-400/80 rotate-12" />
            </div>
        </div>
    );
};

export const NoelDecorations: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            {/* Soft Golden & Emerald Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[700px] h-96 bg-radial from-amber-400/25 via-emerald-500/15 to-transparent blur-3xl" />

            {/* Constellation framing the central content */}
            <div className="container mx-auto px-4 max-w-5xl h-full relative">
                {/* Top Left: Large sparkling crystal snowflake next to breadcrumb */}
                <div className="hidden sm:block absolute top-6 sm:top-8 -left-12 lg:-left-16 motion-safe:animate-[bounce_7s_ease-in-out_infinite]">
                    <OrnateSnowflakeSvg className="w-11 h-11 sm:w-15 sm:h-15 text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.9)]" />
                </div>

                {/* Top Right: Glowing Golden Star near badge */}
                <div className="absolute top-6 sm:top-8 right-4 sm:-right-8 motion-safe:animate-[bounce_6s_ease-in-out_infinite]">
                    <GoldenSparkleSvg className="w-9 h-9 sm:w-12 sm:h-12 text-amber-300 drop-shadow-[0_0_14px_rgba(252,211,77,0.95)]" />
                </div>

                {/* Mid Left: Golden Snowflake floating near title/description */}
                <div className="hidden md:block absolute top-32 -left-16 motion-safe:animate-pulse">
                    <OrnateSnowflakeSvg className="w-9 h-9 sm:w-12 sm:h-12 text-amber-200 drop-shadow-[0_0_12px_rgba(253,230,138,0.85)] rotate-12" />
                </div>

                {/* Mid Right: Second crystal snowflake flanking the title */}
                <div className="absolute top-28 right-4 sm:-right-12 motion-safe:animate-[bounce_8s_ease-in-out_infinite]">
                    <OrnateSnowflakeSvg className="w-9 h-9 sm:w-13 sm:h-13 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] -rotate-12" />
                </div>

                {/* Center Mid: Twinkling golden star above banner */}
                <div className="absolute top-18 right-1/3 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.95)]" />
                </div>

                {/* Bottom Left Snowflake near banner */}
                <div className="hidden sm:block absolute bottom-28 -left-10 motion-safe:animate-pulse">
                    <OrnateSnowflakeSvg className="w-8 h-8 sm:w-10 sm:h-10 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>

                {/* Bottom Right Star */}
                <div className="hidden lg:block absolute bottom-24 -right-10 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-8 h-8 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.85)]" />
                </div>
            </div>

            {/* Ambient flakes on ultra-wide screens */}
            <div className="hidden xl:block absolute top-16 left-10 opacity-75">
                <OrnateSnowflakeSvg className="w-9 h-9 text-emerald-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
            </div>
            <div className="hidden xl:block absolute top-24 right-10 opacity-75">
                <OrnateSnowflakeSvg className="w-10 h-10 text-amber-200 drop-shadow-[0_0_8px_rgba(253,230,138,0.7)]" />
            </div>
        </div>
    );
};

export const PaquesDecorations: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[700px] h-96 bg-radial from-yellow-300/35 via-lime-400/20 to-transparent blur-3xl" />
            <div className="container mx-auto px-4 max-w-5xl h-full relative">
                {/* Top Left: Decorated Easter Egg */}
                <div className="hidden sm:block absolute top-6 sm:top-8 -left-12 lg:-left-16 motion-safe:animate-[bounce_6s_ease-in-out_infinite]">
                    <EasterEggSvg className="w-10 h-12 sm:w-13 sm:h-16 drop-shadow-[0_0_12px_rgba(244,114,182,0.7)] rotate-12" />
                </div>
                {/* Top Right: Spring Daisy */}
                <div className="absolute top-6 sm:top-8 right-4 sm:-right-8 motion-safe:animate-[bounce_7s_ease-in-out_infinite]">
                    <DaisyFlowerSvg className="w-9 h-9 sm:w-12 sm:h-12 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                </div>
                {/* Mid Left: Spring Daisy near title */}
                <div className="hidden md:block absolute top-32 -left-16 motion-safe:animate-pulse">
                    <DaisyFlowerSvg className="w-8 h-8 sm:w-11 sm:h-11 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] -rotate-12" />
                </div>
                {/* Mid Right: Second Decorated Egg */}
                <div className="absolute top-28 right-4 sm:-right-12 motion-safe:animate-[bounce_8s_ease-in-out_infinite]">
                    <EasterEggSvg className="w-9 h-11 sm:w-12 sm:h-15 drop-shadow-[0_0_12px_rgba(244,114,182,0.7)] -rotate-12" />
                </div>
                {/* Center Mid: Sparkle */}
                <div className="absolute top-18 right-1/3 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-700 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                </div>
            </div>
        </div>
    );
};

export const RentreeDecorations: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            {/* Ambient Warm Golden/Slate Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[700px] h-96 bg-radial from-amber-400/20 via-blue-600/10 to-transparent blur-3xl" />

            <div className="container mx-auto px-4 max-w-5xl h-full relative">
                {/* Top Left: Cute Vintage Schoolbag / Cartable */}
                <div className="hidden sm:block absolute top-6 sm:top-8 -left-12 lg:-left-16 motion-safe:animate-[bounce_6s_ease-in-out_infinite]">
                    <CuteSchoolbagSvg className="w-12 h-10 sm:w-16 sm:h-14 drop-shadow-[0_0_14px_rgba(245,158,11,0.7)] rotate-6" />
                </div>

                {/* Top Right: Cute Pencil */}
                <div className="absolute top-6 sm:top-8 right-4 sm:-right-8 motion-safe:animate-[bounce_7s_ease-in-out_infinite]">
                    <CutePencilSvg className="w-9 h-9 sm:w-12 sm:h-12 drop-shadow-[0_0_12px_rgba(251,191,36,0.85)] rotate-12" />
                </div>

                {/* Mid Left: Stationery Pencil pointing towards title */}
                <div className="hidden md:block absolute top-32 -left-16 motion-safe:animate-pulse">
                    <CutePencilSvg className="w-8 h-8 sm:w-11 sm:h-11 drop-shadow-[0_0_10px_rgba(251,191,36,0.75)] -rotate-45" />
                </div>

                {/* Mid Right: Second Schoolbag flanking title and banner */}
                <div className="absolute top-28 right-4 sm:-right-12 motion-safe:animate-[bounce_8s_ease-in-out_infinite]">
                    <CuteSchoolbagSvg className="w-10 h-8 sm:w-14 sm:h-12 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] -rotate-12" />
                </div>

                {/* Bottom Left: Cute Pencil near banner */}
                <div className="hidden sm:block absolute bottom-28 -left-10 motion-safe:animate-[bounce_6s_ease-in-out_infinite]">
                    <CutePencilSvg className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)] rotate-45" />
                </div>

                {/* Bottom Right: Schoolbag accent */}
                <div className="hidden lg:block absolute bottom-24 -right-10 motion-safe:animate-pulse">
                    <CuteSchoolbagSvg className="w-11 h-9 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] rotate-6" />
                </div>
            </div>

            {/* Ambient school accessories on ultra-wide screens */}
            <div className="hidden xl:block absolute top-16 left-10 opacity-75">
                <CuteSchoolbagSvg className="w-12 h-10 -rotate-6" />
            </div>
            <div className="hidden xl:block absolute top-24 right-10 opacity-75">
                <CutePencilSvg className="w-10 h-10 rotate-45" />
            </div>
        </div>
    );
};

export const DefaultDecorations: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-80 bg-radial from-primary/15 to-transparent blur-3xl" />
            <div className="container mx-auto px-4 max-w-5xl h-full relative">
                <div className="hidden sm:block absolute top-6 sm:top-8 -left-10 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(42,157,143,0.6)]" />
                </div>
                <div className="absolute top-6 sm:top-8 right-4 sm:-right-6 motion-safe:animate-pulse">
                    <GoldenSparkleSvg className="w-7 h-7 text-secondary drop-shadow-[0_0_10px_rgba(231,111,81,0.6)]" />
                </div>
            </div>
        </div>
    );
};

/* =========================================================================
   SCALLOPED / WAVY TRANSITION DIVIDER
   ========================================================================= */

export const WavyDivider: React.FC<{ fillColor: string }> = ({ fillColor }) => {
    return (
        <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-px" aria-hidden="true">
            <svg
                viewBox="0 0 1440 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-10 sm:h-14 md:h-18 block preserve-3d"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,32 C240,78 480,12 720,48 C960,84 1200,24 1440,54 L1440,84 L0,84 Z"
                    fill={fillColor}
                />
            </svg>
        </div>
    );
};

/* =========================================================================
   THEME CONFIGURATIONS REGISTRY
   ========================================================================= */

export const CAMPAIGN_THEMES: Record<CampaignThemeKey, ThemeConfig> = {
    halloween: {
        id: "halloween",
        displayName: "Halloween",
        heroBgClass: "bg-gradient-to-b from-[#1A0930] via-[#2A0E5C] to-[#380760] text-white",
        breadcrumbTextClass: "text-purple-200/80 hover:text-white",
        breadcrumbActiveTextClass: "text-orange-300 font-extrabold",
        badgeBgClass: "bg-gradient-to-r from-orange-500/25 to-amber-500/25",
        badgeTextClass: "text-amber-300",
        badgeBorderClass: "border border-amber-400/50 shadow-sm shadow-orange-950/40",
        badgeIcon: "🎃",
        titleClass: "text-white drop-shadow-sm font-heading font-extrabold",
        descriptionClass: "text-orange-100/90 font-medium",
        strongTextClass: "text-white font-extrabold",
        bannerBorderClass: "border-2 border-orange-400/40 ring-4 ring-purple-900/60 shadow-2xl shadow-purple-950/70",
        bannerGlowClass: "from-orange-500/30 via-purple-700/30 to-transparent",
        waveFillColor: "#FAF6EE",
        contentBgClass: "bg-[#FAF6EE]",
        sectionTitleClass: "text-[#2E1065] font-heading font-extrabold",
        sectionSubtitleClass: "text-[#6B4F7F]",
        productCardAccentClass: "border-orange-200/80 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-900/5",
        productBadgeText: "🎃 Spécial Halloween",
        bottomBannerBgClass: "bg-gradient-to-r from-[#2E1065] via-[#3B0764] to-[#1E0B36] text-white",
        bottomBannerBorderClass: "border border-purple-800/60 shadow-xl shadow-purple-950/20",
        bottomBannerBtnClass: "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-950/30",
        bottomBannerTitleClass: "text-white",
        bottomBannerTextClass: "text-purple-200/90",
        Decorations: HalloweenDecorations,
    },

    noel: {
        id: "noel",
        displayName: "Noël féerique",
        heroBgClass: "bg-gradient-to-b from-[#0A2216] via-[#103423] to-[#194530] text-white",
        breadcrumbTextClass: "text-emerald-200/80 hover:text-white",
        breadcrumbActiveTextClass: "text-amber-300 font-extrabold",
        badgeBgClass: "bg-red-600/35",
        badgeTextClass: "text-red-100",
        badgeBorderClass: "border border-red-400/50 shadow-sm",
        badgeIcon: "🎄",
        titleClass: "text-white drop-shadow-sm font-heading font-extrabold",
        descriptionClass: "text-emerald-100/90 font-medium",
        strongTextClass: "text-white font-extrabold",
        bannerBorderClass: "border-2 border-amber-300/50 ring-4 ring-emerald-950/60 shadow-2xl",
        bannerGlowClass: "from-amber-400/30 via-red-600/15 to-transparent",
        waveFillColor: "#F8FAFC",
        contentBgClass: "bg-[#F8FAFC]",
        sectionTitleClass: "text-[#0B2317] font-heading font-extrabold",
        sectionSubtitleClass: "text-[#2B543F]",
        productCardAccentClass: "border-emerald-200 hover:border-emerald-400 hover:shadow-lg",
        productBadgeText: "🎄 Sélection de Noël",
        bottomBannerBgClass: "bg-gradient-to-r from-[#0B2317] via-[#123323] to-[#0B2317] text-white",
        bottomBannerBorderClass: "border border-emerald-800/60 shadow-xl",
        bottomBannerBtnClass: "bg-red-600 hover:bg-red-700 text-white shadow-md",
        bottomBannerTitleClass: "text-white",
        bottomBannerTextClass: "text-emerald-200/90",
        Decorations: NoelDecorations,
    },

    paques: {
        id: "paques",
        displayName: "Pâques printanier",
        heroBgClass: "bg-gradient-to-b from-[#FEF9C3] via-[#ECFCCB] to-[#D9F99D] text-[#365314]",
        breadcrumbTextClass: "text-lime-800/80 hover:text-lime-950",
        breadcrumbActiveTextClass: "text-lime-950 font-extrabold",
        badgeBgClass: "bg-white/90 shadow-sm",
        badgeTextClass: "text-lime-900",
        badgeBorderClass: "border border-lime-300",
        badgeIcon: "🐣",
        titleClass: "text-[#284208] font-heading font-extrabold drop-shadow-2xs",
        descriptionClass: "text-[#365314] font-medium",
        strongTextClass: "text-[#1F3A05] font-extrabold",
        bannerBorderClass: "border-2 border-white/95 ring-4 ring-lime-300/60 shadow-xl",
        bannerGlowClass: "from-yellow-200/50 via-lime-300/30 to-transparent",
        waveFillColor: "#FFFDF7",
        contentBgClass: "bg-[#FFFDF7]",
        sectionTitleClass: "text-[#284208] font-heading font-extrabold",
        sectionSubtitleClass: "text-[#4D7C0F]",
        productCardAccentClass: "border-lime-200 hover:border-lime-400 hover:shadow-lg",
        productBadgeText: "🐣 Sélection Pâques",
        bottomBannerBgClass: "bg-gradient-to-r from-lime-100 via-amber-100 to-lime-100 text-lime-950",
        bottomBannerBorderClass: "border border-lime-200 shadow-sm",
        bottomBannerBtnClass: "bg-lime-700 hover:bg-lime-800 text-white shadow-md",
        bottomBannerTitleClass: "text-lime-950",
        bottomBannerTextClass: "text-lime-800",
        Decorations: PaquesDecorations,
    },

    rentree: {
        id: "rentree",
        displayName: "Rentrée des classes",
        heroBgClass: "bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#334155] text-white",
        breadcrumbTextClass: "text-slate-300/80 hover:text-white",
        breadcrumbActiveTextClass: "text-amber-400 font-extrabold",
        badgeBgClass: "bg-amber-400/25",
        badgeTextClass: "text-amber-300",
        badgeBorderClass: "border border-amber-400/40 shadow-xs",
        badgeIcon: "🎒",
        titleClass: "text-white font-heading font-extrabold drop-shadow-sm",
        descriptionClass: "text-slate-200 font-medium",
        strongTextClass: "text-white font-extrabold",
        bannerBorderClass: "border-2 border-amber-400/30 ring-4 ring-slate-800 shadow-xl",
        bannerGlowClass: "from-amber-400/15 to-transparent",
        waveFillColor: "#F8FAFC",
        contentBgClass: "bg-[#F8FAFC]",
        sectionTitleClass: "text-[#0F172A] font-heading font-extrabold",
        sectionSubtitleClass: "text-[#475569]",
        productCardAccentClass: "border-slate-200 hover:border-amber-400 hover:shadow-lg",
        productBadgeText: "🎒 Spécial Rentrée",
        bottomBannerBgClass: "bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white",
        bottomBannerBorderClass: "border border-slate-700 shadow-xl",
        bottomBannerBtnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md",
        bottomBannerTitleClass: "text-white",
        bottomBannerTextClass: "text-slate-300",
        Decorations: RentreeDecorations,
    },

    default: {
        id: "default",
        displayName: "Classique Maison des Petits Loups",
        heroBgClass: "bg-gradient-to-b from-primary/15 via-background to-background text-[#264653]",
        breadcrumbTextClass: "text-[#64748B] hover:text-[#264653]",
        breadcrumbActiveTextClass: "text-[#264653] font-extrabold",
        badgeBgClass: "bg-primary/15",
        badgeTextClass: "text-primary",
        badgeBorderClass: "border border-primary/20 shadow-2xs",
        badgeIcon: "✨",
        titleClass: "text-[#264653] font-heading font-extrabold",
        descriptionClass: "text-[#475569] font-medium",
        strongTextClass: "text-[#264653] font-extrabold",
        bannerBorderClass: "border border-[#CBD5E1] shadow-xs",
        bannerGlowClass: "from-primary/10 to-transparent",
        waveFillColor: "#FFFFFF",
        contentBgClass: "bg-[#FFFFFF]",
        sectionTitleClass: "text-[#264653] font-heading font-extrabold",
        sectionSubtitleClass: "text-[#64748B]",
        productCardAccentClass: "border-[#CBD5E1] hover:border-primary/50 hover:shadow-md",
        productBadgeText: "✨ Sélection du moment",
        bottomBannerBgClass: "bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 text-[#264653]",
        bottomBannerBorderClass: "border border-teal-200/80 shadow-xs",
        bottomBannerBtnClass: "bg-secondary hover:bg-secondary/90 text-white shadow-md",
        bottomBannerTitleClass: "text-[#264653]",
        bottomBannerTextClass: "text-[#475569]",
        Decorations: DefaultDecorations,
    },
};

export function getCampaignTheme(themeKey?: string, slug?: string): ThemeConfig {
    if (themeKey && themeKey in CAMPAIGN_THEMES) {
        return CAMPAIGN_THEMES[themeKey as CampaignThemeKey];
    }
    // Heuristic fallback if not explicitly chosen yet:
    if (slug) {
        const lower = slug.toLowerCase();
        if (lower.includes("halloween")) return CAMPAIGN_THEMES.halloween;
        if (lower.includes("noel")) return CAMPAIGN_THEMES.noel;
        if (lower.includes("paque")) return CAMPAIGN_THEMES.paques;
        if (lower.includes("rentree")) return CAMPAIGN_THEMES.rentree;
    }
    return CAMPAIGN_THEMES.default;
}
