import { getSeasonalCampaignBySlug, getAllCampaignSlugs } from "@/lib/getSeasonalCampaign";
import { getCampaignTheme, WavyDivider, CutePumpkinSvg } from "@/lib/campaignThemes";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Store, ChevronRight, Sparkles } from "lucide-react";
import { Metadata } from "next";
import ProductCard from "@/components/Shop/ProductCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ theme?: string }>;
}

function normalizeThemeParam(input?: string): string | undefined {
    if (!input) return undefined;
    try {
        return decodeURIComponent(input)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    } catch {
        return input
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const campaign = await getSeasonalCampaignBySlug(slug);

    if (!campaign) {
        return {
            title: "Sélection non trouvée | La Maison des Petits Loups",
        };
    }

    return {
        title: `${campaign.title} | La Maison des Petits Loups`,
        description: campaign.description || `Découvrez notre sélection thématique : ${campaign.title}`,
        openGraph: {
            images: campaign.bannerUrl ? [campaign.bannerUrl] : [],
        },
    };
}

function renderFormattedDescription(text: string, strongClass: string = "font-extrabold text-white") {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={index} className={strongClass}>
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

export default async function CampaignPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const campaign = await getSeasonalCampaignBySlug(slug);

    if (!campaign) {
        notFound();
    }

    // Resolve visual theme (supports preview query param ?theme=... or Sanity value or slug heuristic)
    const activeThemeKey = normalizeThemeParam(resolvedSearchParams?.theme) || campaign.theme;
    const theme = getCampaignTheme(activeThemeKey, slug);
    const Decorations = theme.Decorations;

    return (
        <div className="min-h-screen overflow-x-hidden flex flex-col">
            {/* =========================================================================
                THEMED HERO SECTION
                ========================================================================= */}
            <header className={`relative ${theme.heroBgClass} pt-8 sm:pt-10 overflow-hidden`}>
                {/* Visual Decorative Layer (SVGs, gentle stars, playful bats) */}
                <Decorations />

                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    {/* Breadcrumbs Navigation */}
                    <nav
                        aria-label="Fil d'Ariane"
                        className="relative z-20 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold mb-6"
                    >
                        <Link href="/" className={`transition-colors ${theme.breadcrumbTextClass}`}>
                            Accueil
                        </Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <Link href="/boutique" className={`transition-colors ${theme.breadcrumbTextClass}`}>
                            Boutique
                        </Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <span className={theme.breadcrumbActiveTextClass}>{campaign.name}</span>
                    </nav>

                    {/* Notice if campaign period has ended */}
                    {campaign.isExpired && (
                        <div className="mb-6 bg-amber-500/15 backdrop-blur-md border border-amber-400/40 text-amber-200 px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 shadow-sm">
                            <Clock size={18} className="text-amber-400 shrink-0" />
                            <span>
                                Cette sélection saisonnière est passée, mais tous ces articles restent disponibles à la vente en boutique !
                            </span>
                        </div>
                    )}

                    {/* Integrated Event Composition */}
                    <div className="flex flex-col gap-6 sm:gap-8 pb-10 sm:pb-14">
                        {/* Event Badge & Title */}
                        <div className="max-w-3xl">
                            {campaign.badgeText && (
                                <div
                                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-4 backdrop-blur-md ${theme.badgeBgClass} ${theme.badgeTextClass} ${theme.badgeBorderClass}`}
                                >
                                    <span className="text-base sm:text-lg leading-none" aria-hidden="true">
                                        {theme.badgeIcon}
                                    </span>
                                    <span>{campaign.badgeText}</span>
                                </div>
                            )}

                            <h1 className={`text-2xl sm:text-4xl md:text-5xl leading-tight tracking-tight ${theme.titleClass}`}>
                                {campaign.title}
                            </h1>

                            {campaign.description && (
                                <p className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl ${theme.descriptionClass}`}>
                                    {renderFormattedDescription(campaign.description, theme.strongTextClass)}
                                </p>
                            )}
                        </div>

                        {/* Banner Image with Enhanced Frame & Ambient Backlight */}
                        {campaign.bannerUrl && (
                            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
                                {/* Subtle ambient backlight */}
                                <div
                                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${theme.bannerGlowClass} blur-xl opacity-75 -z-10`}
                                    aria-hidden="true"
                                />

                                <div className={`relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/20 ${theme.bannerBorderClass}`}>
                                    <Image
                                        src={campaign.bannerUrl}
                                        alt={campaign.title}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1024px"
                                    />
                                    {/* Soft gradient overlay at bottom of banner for seamless depth */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scalloped / Wavy Transition to Products */}
                <WavyDivider fillColor={theme.waveFillColor} />
            </header>

            {/* =========================================================================
                PRODUCTS GRID SECTION (Warm Vanilla / Cream Ambiance)
                ========================================================================= */}
            <main className={`flex-grow ${theme.contentBgClass} py-8 sm:py-12 transition-colors`}>
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-black/5">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className={`text-xl sm:text-2xl md:text-3xl ${theme.sectionTitleClass}`}>
                                    Les trésors de la sélection
                                </h2>
                                <span className="text-xl sm:text-2xl" aria-hidden="true">
                                    {theme.badgeIcon}
                                </span>
                            </div>
                            <p className={`text-xs sm:text-sm mt-1 ${theme.sectionSubtitleClass}`}>
                                {campaign.products.length}{" "}
                                {campaign.products.length > 1
                                    ? "articles soigneusement choisis par Véronique"
                                    : "article soigneusement choisi par Véronique"}
                            </p>
                        </div>

                        <Link
                            href="/boutique"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#264653] hover:text-primary transition-colors self-start sm:self-auto bg-white/80 border border-black/10 px-4 py-2 rounded-full shadow-2xs hover:shadow-xs"
                        >
                            <Store size={14} className="text-secondary" />
                            <span>Voir toute la boutique</span>
                        </Link>
                    </div>

                    {/* Products Listing */}
                    {campaign.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {campaign.products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`relative rounded-2xl transition-all duration-300 ${theme.productCardAccentClass}`}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white/90 backdrop-blur-xs rounded-3xl border border-black/10 p-8 max-w-md mx-auto shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-[#264653] mb-2">
                                Sélection en cours de préparation
                            </h3>
                            <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                                Véronique prépare les jouets pour cette sélection festive. En attendant, découvrez notre catalogue habituel !
                            </p>
                            <Link
                                href="/boutique"
                                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                <Store size={16} /> Découvrir la boutique
                            </Link>
                        </div>
                    )}

                    {/* Bottom Themed Discovery Banner */}
                    <div
                        className={`mt-14 sm:mt-18 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 ${theme.bottomBannerBgClass} ${theme.bottomBannerBorderClass}`}
                    >
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                <h3 className={`font-heading font-extrabold text-lg sm:text-xl ${theme.bottomBannerTitleClass}`}>
                                    Envie de découvrir encore plus de trésors ?
                                </h3>
                                <span className="text-lg" aria-hidden="true">
                                    {theme.badgeIcon}
                                </span>
                            </div>
                            <p className={`text-xs sm:text-sm max-w-xl ${theme.bottomBannerTextClass}`}>
                                Retrouvez tous nos jouets, jeux d'éveil, peluches et livres pour tous les âges à La Maison des Petits Loups.
                            </p>
                        </div>

                        <Link
                            href="/boutique"
                            className={`inline-flex items-center gap-2 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shrink-0 hover:scale-[1.02] ${theme.bottomBannerBtnClass}`}
                        >
                            <Store size={16} />
                            <span>Explorer toute la boutique</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
