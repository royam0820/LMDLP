export type AgeCategoryKey = "all" | "0-12m" | "1-3y" | "3-6y" | "6y+";

export interface AgeCategory {
    id: AgeCategoryKey;
    label: string;
    icon: string;
    shortLabel: string;
    subLabel: string;
}

export const AGE_CATEGORIES: AgeCategory[] = [
    { id: "all", label: "Tous les âges", icon: "✨", shortLabel: "Tous", subLabel: "Tout le catalogue" },
    { id: "0-12m", label: "0 – 12 mois", icon: "🍼", shortLabel: "0-12 mois", subLabel: "Naissance & Doudous" },
    { id: "1-3y", label: "1 – 3 ans", icon: "🧸", shortLabel: "1-3 ans", subLabel: "Éveil & Premiers pas" },
    { id: "3-6y", label: "3 – 6 ans", icon: "🎨", shortLabel: "3-6 ans", subLabel: "Imagination & Maternelle" },
    { id: "6y+", label: "6 ans et +", icon: "🧩", shortLabel: "6 ans et +", subLabel: "Créativité & Jeux" },
];

/**
 * Normalizes any free-form age string from Sanity or fallback data
 * into one of the 4 age categories.
 */
export function normalizeAgeCategory(rawAge?: string | null): "0-12m" | "1-3y" | "3-6y" | "6y+" | null {
    if (!rawAge) return null;
    const lower = rawAge.toLowerCase().trim();

    // Direct key matches
    if (lower === "0-12m" || lower === "baby") return "0-12m";
    if (lower === "1-3y" || lower === "toddler") return "1-3y";
    if (lower === "3-6y" || lower === "kids") return "3-6y";
    if (lower === "6y+" || lower === "older" || lower === "8y+") return "6y+";

    // 0 - 12 months / Naissance
    if (
        lower.includes("0+") ||
        lower.includes("naissance") ||
        lower.includes("bébé") ||
        lower.includes("bebe") ||
        lower.includes("dès la naissance") ||
        lower.includes("0 mois") ||
        lower.includes("3 mois") ||
        lower.includes("6 mois") ||
        lower.includes("6+ mois") ||
        lower.includes("9 mois") ||
        lower.includes("12 mois") ||
        (lower.includes("mois") && !lower.includes("18") && !lower.includes("24")) ||
        lower.includes("0-1") ||
        lower.includes("0 - 1")
    ) {
        return "0-12m";
    }

    // 1 - 3 years
    if (
        lower.includes("1+") ||
        lower.includes("1 an") ||
        lower.includes("2 an") ||
        lower.includes("18 mois") ||
        lower.includes("1-2") ||
        lower.includes("1 - 2") ||
        lower.includes("1-3") ||
        lower.includes("1 - 3") ||
        lower.includes("2-3")
    ) {
        return "1-3y";
    }

    // 3 - 6 years
    if (
        lower.includes("3+") ||
        lower.includes("3 an") ||
        lower.includes("4 an") ||
        lower.includes("5 an") ||
        lower.includes("3-5") ||
        lower.includes("3 - 5") ||
        lower.includes("3-6") ||
        lower.includes("3 - 6") ||
        lower.includes("4-6")
    ) {
        return "3-6y";
    }

    // 6+ years
    if (
        lower.includes("6+") ||
        lower.includes("6 an") ||
        lower.includes("7 an") ||
        lower.includes("8") ||
        lower.includes("9") ||
        lower.includes("10") ||
        lower.includes("6-") ||
        lower.includes("6 -")
    ) {
        return "6y+";
    }

    // Fallback: extract digits
    const match = lower.match(/\d+/);
    if (match) {
        const num = parseInt(match[0], 10);
        if (num <= 1) return "0-12m";
        if (num <= 3) return "1-3y";
        if (num <= 6) return "3-6y";
        return "6y+";
    }

    return "0-12m"; // Default for soft toys if unspecified
}

/**
 * Friendly badge text to display on product cards
 */
export function formatAgeBadge(rawAge?: string | null): string {
    if (!rawAge) return "";
    const cat = normalizeAgeCategory(rawAge);
    switch (cat) {
        case "0-12m":
            return "0 – 12 mois";
        case "1-3y":
            return "1 – 3 ans";
        case "3-6y":
            return "3 – 6 ans";
        case "6y+":
            return "6 ans et +";
        default:
            return rawAge;
    }
}
