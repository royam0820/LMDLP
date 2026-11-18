import fs from "fs/promises";
import path from "path";
import { formatFrenchPhone } from "./formatPhone";

export interface GiftListItem {
    productId: string;
    name: string;
    sku?: string;
    slug?: string;
    image: string;
    price?: number;
    age?: string;
    description?: string;
    isReserved: boolean;
    reservationGroupId?: string;
    reservedBy?: string;
    reservedAt?: string;
    guestNote?: string;
    guestPhone?: string;
    guestEmail?: string;
    pickupDate?: string;
    pickupSlot?: string;
}

export interface GiftList {
    id: string;
    slug: string;
    childName: string;
    age: string;
    eventType: "anniversaire" | "naissance" | "autre";
    eventDate: string;
    parentName?: string;
    parentEmail: string;
    parentPhone?: string;
    welcomeMessage?: string;
    createdAt: string;
    isArchived?: boolean;
    archiveDate?: string;
    items: GiftListItem[];
}

const DATA_FILE = path.join(process.cwd(), "src", "data", "gift-lists.json");

async function readAllLists(): Promise<GiftList[]> {
    try {
        const fileContent = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(fileContent);
    } catch (err: any) {
        if (err.code === "ENOENT") {
            return [];
        }
        console.error("Error reading gift-lists.json:", err);
        return [];
    }
}

async function writeAllLists(lists: GiftList[]): Promise<void> {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(lists, null, 2), "utf-8");
    } catch (err) {
        console.error("Error writing gift-lists.json:", err);
        throw new Error("Impossible de sauvegarder la liste de cadeaux.");
    }
}

// Generate clean URL friendly slug: "Léo 5 ans" -> "leo-5-ans"
export function slugify(text: string): string {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with -
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

/**
 * Calcule la date d'archivage (15 jours après la date de l'événement ou de création)
 */
export function getArchiveDate(list: GiftList): Date {
    const baseDateStr = list.eventDate || list.createdAt;
    const baseDate = new Date(baseDateStr);
    const archiveDate = new Date(baseDate);
    archiveDate.setDate(archiveDate.getDate() + 15);
    return archiveDate;
}

/**
 * Vérifie si la liste est archivée (plus de 15 jours après la date de l'événement)
 */
export function isListArchived(list: GiftList): boolean {
    const archiveDate = getArchiveDate(list);
    return new Date() > archiveDate;
}

const DEFAULT_SKU_BY_PRODUCT_ID: Record<string, string> = {
    "2ff537fc-427a-4a0d-acdf-03c938381f95": "ACC-CLE20W",
    "365adcec-3cbf-4463-839c-1520a34916e8": "PEL-LAP01",
    "3e6592ee-66bf-4e1f-ad84-bb3ef7751c63": "PEL-CHV02",
    "4144f640-d2ba-454f-ab00-5b18db154ccd": "PEL-CAR03",
    "4b0ace9a-8001-433a-84df-b4908c12a826": "SOU-MAQ01",
    "4d22984c-ad41-470d-9eb4-932e05e24436": "DEG-CIT01",
    "521611f3-29b0-4ef1-b5df-e9c43c3ed8b0": "CRE-BRO01",
    "56057de3-4f34-47fc-9555-a7a67639f560": "REF-TEST01",
    "89f8d94f-b95c-4386-86fb-f579b3ba5484": "PEL-TOR04",
    "8f8b9c6f-a7bd-49ee-82f5-633e19e0b0af": "PEL-CHI05",
    "R5rwGKVFi8Jgm9CfvX2pvu": "SOU-CAP02",
    "a6806ed2-34cf-4662-87e4-83b7be9fb9db": "LUM-MIN01",
    "d6507706-004e-4f6e-97d0-5f9b7ce733de": "JEU-ARD01",
    "f212e67d-e68c-4084-b050-b0c7d9cf0198": "DEG-SOR02",
};

function attachArchiveInfo(list: GiftList): GiftList {
    const archiveDate = getArchiveDate(list);
    return {
        ...list,
        isArchived: new Date() > archiveDate,
        archiveDate: archiveDate.toISOString(),
        items: list.items.map((item) => ({
            ...item,
            sku: item.sku || DEFAULT_SKU_BY_PRODUCT_ID[item.productId],
        })),
    };
}

export async function getAllGiftLists(): Promise<GiftList[]> {
    const lists = await readAllLists();
    return lists.map(attachArchiveInfo);
}

export async function getGiftListBySlug(slug: string): Promise<GiftList | null> {
    const lists = await readAllLists();
    const cleanSlug = slug.toLowerCase().trim();
    const found = lists.find((l) => l.slug.toLowerCase() === cleanSlug);
    return found ? attachArchiveInfo(found) : null;
}

export async function createGiftList(
    data: Omit<GiftList, "id" | "createdAt" | "slug"> & { customSlug?: string }
): Promise<GiftList> {
    const lists = await readAllLists();

    // Base slug: e.g. "leo-5-ans"
    let baseSlug = slugify(data.customSlug || `${data.childName} ${data.age}`);
    if (!baseSlug) baseSlug = "liste-cadeaux";

    // Ensure unique slug
    let candidateSlug = baseSlug;
    let counter = 1;
    while (lists.some((l) => l.slug.toLowerCase() === candidateSlug.toLowerCase())) {
        candidateSlug = `${baseSlug}-${counter}`;
        counter++;
    }

    const newList: GiftList = {
        id: `list-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        slug: candidateSlug,
        childName: data.childName.trim(),
        age: data.age.trim(),
        eventType: data.eventType || "anniversaire",
        eventDate: data.eventDate || "",
        parentName: data.parentName?.trim() || "",
        parentEmail: data.parentEmail.trim().toLowerCase(),
        parentPhone: data.parentPhone ? formatFrenchPhone(data.parentPhone.trim()) : "",
        welcomeMessage: data.welcomeMessage?.trim() || "",
        createdAt: new Date().toISOString(),
        items: data.items.map((item) => ({
            ...item,
            isReserved: false,
        })),
    };

    lists.unshift(newList);
    await writeAllLists(lists);
    return newList;
}

export async function reserveGiftItems(
    listSlug: string,
    productIds: string[],
    guestInfo: {
        guestName: string;
        guestPhone: string;
        guestEmail?: string;
        guestNote?: string;
        pickupDate?: string;
        pickupSlot?: string;
    }
): Promise<{ success: boolean; list?: GiftList; items?: GiftListItem[]; error?: string }> {
    if (!productIds || productIds.length === 0) {
        return { success: false, error: "Aucun cadeau sélectionné pour la réservation." };
    }

    const lists = await readAllLists();
    const listIndex = lists.findIndex(
        (l) => l.slug.toLowerCase() === listSlug.toLowerCase().trim()
    );

    if (listIndex === -1) {
        return { success: false, error: "Liste introuvable." };
    }

    const list = lists[listIndex];

    if (isListArchived(list)) {
        return {
            success: false,
            error: "Cette liste de cadeaux est archivée (l'événement a eu lieu il y a plus de 2 mois). Les réservations sont désormais clôturées.",
        };
    }

    // Verify all requested items exist and are available (Zero Doublon check)
    const missingProductIds: string[] = [];
    const alreadyReservedItems: GiftListItem[] = [];
    const targetItemIndices: number[] = [];

    for (const pid of productIds) {
        const idx = list.items.findIndex((item) => item.productId === pid);
        if (idx === -1) {
            missingProductIds.push(pid);
        } else {
            targetItemIndices.push(idx);
            if (list.items[idx].isReserved) {
                alreadyReservedItems.push(list.items[idx]);
            }
        }
    }

    if (missingProductIds.length > 0) {
        return { success: false, error: "Un ou plusieurs articles ne font pas partie de cette liste." };
    }

    if (alreadyReservedItems.length > 0) {
        const names = alreadyReservedItems.map((it) => `« ${it.name} » (déjà réservé par ${it.reservedBy || "un invité"})`).join(", ");
        return {
            success: false,
            error: `Attention, certains articles ne sont plus disponibles : ${names}. Veuillez actualiser la page.`,
        };
    }

    // Atomic reservation of all items in the group
    const reservationGroupId = `res-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();
    const updatedItems: GiftListItem[] = [];

    for (const idx of targetItemIndices) {
        const currentItem = list.items[idx];
        const updatedItem: GiftListItem = {
            ...currentItem,
            isReserved: true,
            reservationGroupId,
            reservedBy: guestInfo.guestName.trim(),
            reservedAt: nowIso,
            guestNote: guestInfo.guestNote?.trim() || "",
            guestPhone: guestInfo.guestPhone.trim(),
            guestEmail: guestInfo.guestEmail?.trim() || "",
            pickupDate: guestInfo.pickupDate || "",
            pickupSlot: guestInfo.pickupSlot || "",
        };
        list.items[idx] = updatedItem;
        updatedItems.push(updatedItem);
    }

    lists[listIndex] = list;
    await writeAllLists(lists);

    return {
        success: true,
        list,
        items: updatedItems,
    };
}

export async function reserveGiftItem(
    listSlug: string,
    productId: string,
    guestInfo: {
        guestName: string;
        guestPhone: string;
        guestEmail?: string;
        guestNote?: string;
        pickupDate?: string;
        pickupSlot?: string;
    }
): Promise<{ success: boolean; list?: GiftList; item?: GiftListItem; error?: string }> {
    const res = await reserveGiftItems(listSlug, [productId], guestInfo);
    return {
        success: res.success,
        list: res.list,
        item: res.items?.[0],
        error: res.error,
    };
}
