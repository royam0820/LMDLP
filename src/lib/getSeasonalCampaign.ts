import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
    ACTIVE_SEASONAL_CAMPAIGN_QUERY,
    ACTIVE_SEASONAL_CAMPAIGNS_QUERY,
    ALL_SEASONAL_CAMPAIGNS_QUERY,
    SEASONAL_CAMPAIGN_BY_SLUG_QUERY,
    ALL_CAMPAIGN_SLUGS_QUERY,
} from "@/sanity/queries";
import { Product } from "@/data/products";

/**
 * Normalize a slug or theme string: decode URI, strip accents (é->e, ë->e, â->a), lowercase
 */
function normalizeKey(input: string): string {
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

const DEMO_THEME_DEFAULTS: Record<string, { name: string; title: string; badgeText: string; description: string }> = {
    noel: {
        name: "Noël",
        title: "🎄 La magie de Noël s'invite chez les Petits Loups !",
        badgeText: "Sélection de Noël",
        description: "Découvrez nos idées cadeaux féeriques, jouets en bois, peluches toutes douces et coffrets créatifs à glisser sous le sapin.",
    },
    halloween: {
        name: "Halloween",
        title: "🎃 Frissons & Déguisements pour Halloween !",
        badgeText: "Spécial Halloween",
        description: "Capes magiques, accessoires de petits sorciers et jeux malicieux pour fêter Halloween en s'amusant.",
    },
    paques: {
        name: "Pâques",
        title: "🐣 Les petits trésors printaniers de Pâques !",
        badgeText: "Sélection de Pâques",
        description: "Une sélection joyeuse et colorée de doudous lapins, jeux de plein air et surprises créatives pour célébrer le printemps.",
    },
    rentree: {
        name: "Rentrée des classes",
        title: "🎒 En route pour une Rentrée pleine de découvertes !",
        badgeText: "Spécial Rentrée",
        description: "Accessoires futés, jeux éducatifs et fournitures ludiques pour accompagner les enfants avec le sourire.",
    },
    default: {
        name: "Sélection du moment",
        title: "✨ Les coups de cœur de La Maison des Petits Loups",
        badgeText: "Sélection Boutique",
        description: "Retrouvez les jouets, livres et peluches soigneusement choisis par Véronique dans notre boutique à Puteaux.",
    },
};

export interface SeasonalCampaignTeaser {
    id: string;
    name: string;
    slug: string;
    title: string;
    badgeText?: string;
    theme?: string;
    description?: string;
    bannerUrl?: string;
    startDate: string;
    endDate: string;
}

export interface SeasonalCampaignDetail {
    id: string;
    name: string;
    slug: string;
    title: string;
    badgeText?: string;
    theme?: string;
    description?: string;
    bannerUrl?: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isCurrentlyActive: boolean;
    isExpired: boolean;
    products: Product[];
}

/**
 * Fetch all currently active campaigns for the homepage teaser (up to 2).
 * Returns an empty array if no campaigns are currently active within their date range.
 * Supports an optional `previewTheme` query param (e.g. ?theme=halloween, noel, paques, rentree, duo)
 * for live demonstration even if a campaign's endDate has passed.
 */
export async function getActiveSeasonalCampaigns(previewTheme?: string): Promise<SeasonalCampaignTeaser[]> {
    try {
        const rawList = await client.withConfig({ useCdn: false }).fetch(
            ALL_SEASONAL_CAMPAIGNS_QUERY,
            {},
            { cache: "no-store", next: { revalidate: 0 } }
        );

        if (!Array.isArray(rawList)) return [];

        const now = new Date();
        const normalizedPreview = previewTheme ? normalizeKey(previewTheme) : undefined;

        const mapRawToTeaser = (raw: any, overrideTheme?: string): SeasonalCampaignTeaser => ({
            id: raw._id,
            name: raw.name,
            slug: raw.slug,
            title: raw.title,
            badgeText: raw.badgeText || "Sélection du moment",
            theme: overrideTheme || raw.theme || "default",
            description: raw.description,
            bannerUrl: raw.banner ? urlFor(raw.banner).url() : undefined,
            startDate: raw.startDate,
            endDate: raw.endDate,
        });

        // Demo mode: ?theme=duo shows up to 2 campaigns side-by-side regardless of endDate
        if (normalizedPreview === "duo") {
            return rawList
                .filter((raw: any) => raw && raw.slug)
                .slice(0, 2)
                .map((raw: any) => mapRawToTeaser(raw));
        }

        // Demo mode: ?theme=halloween | noel | paques | rentree | default
        if (normalizedPreview) {
            const matchingCampaign = rawList.find(
                (raw: any) =>
                    normalizeKey(raw?.slug || "").includes(normalizedPreview) ||
                    normalizeKey(raw?.theme || "") === normalizedPreview
            );
            if (matchingCampaign) {
                return [mapRawToTeaser(matchingCampaign, normalizedPreview)];
            }
            if (rawList.length > 0) {
                const demoMeta = DEMO_THEME_DEFAULTS[normalizedPreview];
                return [
                    {
                        ...mapRawToTeaser(rawList[0], normalizedPreview),
                        slug: normalizedPreview,
                        name: demoMeta?.name || rawList[0].name,
                        title: demoMeta?.title || rawList[0].title,
                        badgeText: demoMeta?.badgeText || rawList[0].badgeText,
                        description: demoMeta?.description || rawList[0].description,
                    },
                ];
            }
        }

        return rawList
            .filter((raw: any) => {
                if (!raw || !raw.slug || !raw.isActive) return false;
                if (!Array.isArray(raw.products) || raw.products.length === 0) return false;
                const start = new Date(raw.startDate);
                const end = new Date(raw.endDate);
                return now >= start && now <= end;
            })
            .slice(0, 2)
            .map((raw: any) => mapRawToTeaser(raw));
    } catch (error) {
        console.warn("Failed to fetch active seasonal campaigns:", error);
        return [];
    }
}

/**
 * Fetch the single top active campaign for backwards compatibility.
 */
export async function getActiveSeasonalCampaign(): Promise<SeasonalCampaignTeaser | null> {
    const list = await getActiveSeasonalCampaigns();
    return list[0] || null;
}

/**
 * Fetch a campaign by its slug with all resolved products.
 * Supports accent-insensitive slugs (e.g. "rentrée" -> "rentree-scolaire", "noël" -> "noel", "pâques" -> "paques")
 * and falls back to a demo campaign if the slug matches one of the 5 built-in theme keys.
 */
export async function getSeasonalCampaignBySlug(slug: string): Promise<SeasonalCampaignDetail | null> {
    try {
        const normalizedSlug = normalizeKey(slug);

        // 1. Try exact slug match first
        let raw = await client.withConfig({ useCdn: false }).fetch(
            SEASONAL_CAMPAIGN_BY_SLUG_QUERY,
            { slug },
            { cache: "no-store", next: { revalidate: 0 } }
        );

        // 2. If not found, fetch all campaigns and match by normalized slug, prefix, or theme
        let allCampaigns: any[] = [];
        if (!raw || !raw.slug) {
            allCampaigns = await client.withConfig({ useCdn: false }).fetch(
                ALL_SEASONAL_CAMPAIGNS_QUERY,
                {},
                { cache: "no-store", next: { revalidate: 0 } }
            );

            if (Array.isArray(allCampaigns)) {
                raw =
                    allCampaigns.find((c: any) => normalizeKey(c?.slug || "") === normalizedSlug) ||
                    allCampaigns.find(
                        (c: any) =>
                            normalizeKey(c?.slug || "").startsWith(normalizedSlug) ||
                            normalizedSlug.startsWith(normalizeKey(c?.slug || "")) ||
                            normalizeKey(c?.theme || "") === normalizedSlug ||
                            normalizeKey(c?.name || "").includes(normalizedSlug)
                    );
            }
        }

        // 3. If still not found, check if the URL is a known theme key (e.g. /selections/paques or /selections/pâques)
        if ((!raw || !raw.slug) && normalizedSlug in DEMO_THEME_DEFAULTS) {
            const demoMeta = DEMO_THEME_DEFAULTS[normalizedSlug];
            const fallbackSource =
                allCampaigns.find((c: any) => Array.isArray(c?.products) && c.products.length > 0) ||
                allCampaigns[0];

            const fallbackProducts: Product[] = Array.isArray(fallbackSource?.products)
                ? fallbackSource.products
                      .filter(Boolean)
                      .map((p: any) => ({
                          id: p._id,
                          name: p.name,
                          sku: p.sku,
                          slug: p.slug,
                          image: p.image ? urlFor(p.image).url() : "/images/placeholder.png",
                          age: p.age,
                          description: p.description,
                          price: p.price,
                          isNew: p.isNew,
                      }))
                : [];

            return {
                id: `demo-${normalizedSlug}`,
                name: demoMeta.name,
                slug: normalizedSlug,
                title: demoMeta.title,
                badgeText: demoMeta.badgeText,
                theme: normalizedSlug,
                description: demoMeta.description,
                bannerUrl: fallbackSource?.banner ? urlFor(fallbackSource.banner).url() : undefined,
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
                isActive: true,
                isCurrentlyActive: true,
                isExpired: false,
                products: fallbackProducts,
            };
        }

        if (!raw || !raw.slug) return null;

        const now = new Date();
        const start = new Date(raw.startDate);
        const end = new Date(raw.endDate);

        const isCurrentlyActive = Boolean(raw.isActive && now >= start && now <= end);
        const isExpired = Boolean(now > end);

        // Map resolved products
        const productsList: Product[] = Array.isArray(raw.products)
            ? raw.products
                  .filter(Boolean)
                  .map((p: any) => ({
                      id: p._id,
                      name: p.name,
                      sku: p.sku,
                      slug: p.slug,
                      image: p.image ? urlFor(p.image).url() : "/images/placeholder.png",
                      age: p.age,
                      description: p.description,
                      price: p.price,
                      isNew: p.isNew,
                  }))
            : [];

        return {
            id: raw._id,
            name: raw.name,
            slug: raw.slug,
            title: raw.title,
            badgeText: raw.badgeText || "Sélection thématique",
            theme: raw.theme || (normalizedSlug.includes("halloween") ? "halloween" : "default"),
            description: raw.description,
            bannerUrl: raw.banner ? urlFor(raw.banner).url() : undefined,
            startDate: raw.startDate,
            endDate: raw.endDate,
            isActive: Boolean(raw.isActive),
            isCurrentlyActive,
            isExpired,
            products: productsList,
        };
    } catch (error) {
        console.error(`Failed to fetch campaign by slug [${slug}]:`, error);
        return null;
    }
}

/**
 * Fetch all campaign slugs for Next.js static generation.
 */
export async function getAllCampaignSlugs(): Promise<string[]> {
    try {
        const raw = await client.fetch(ALL_CAMPAIGN_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
        if (Array.isArray(raw)) {
            return raw.map((item: any) => item.slug).filter(Boolean);
        }
        return [];
    } catch (error) {
        console.warn("Failed to fetch all campaign slugs:", error);
        return [];
    }
}
