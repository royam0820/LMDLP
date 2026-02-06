export type WorkshopType = "atelier" | "stage";

export type Workshop = {
    id: string;
    title: string;
    type: WorkshopType;
    description: string;
    dateStr: string; // Display date string e.g. "Mercredi 14h-16h" or "Stage Toussaint"
    age: string;
    price?: string;
};

export const workshops: Workshop[] = [
    {
        id: "1",
        title: "Éveil Musical",
        type: "atelier",
        description: "Découverte des sons et des rythmes pour les tout-petits.",
        dateStr: "Mercredi 10h - 11h",
        age: "6 mois - 3 ans",
        price: "15€ / séance",
    },
    {
        id: "2",
        title: "Arts Créatifs",
        type: "atelier",
        description: "Peinture, collage et modelage pour exprimer sa créativité.",
        dateStr: "Mercredi 14h - 15h30",
        age: "4 - 8 ans",
        price: "20€ / séance",
    },
    {
        id: "3",
        title: "Stage Petits Loups",
        type: "stage",
        description: "Semaine complète d'activités artistiques et ludiques.",
        dateStr: "Vacances de Février (du 15 au 19)",
        age: "3 - 6 ans",
        price: "150€ / semaine",
    },
    {
        id: "4",
        title: "Robo-Code (Codeacademy123)",
        type: "atelier",
        description: "Initiation à la logique de programmation sans écran.",
        dateStr: "Samedi 10h - 11h30",
        age: "5 - 8 ans",
        price: "25€ / séance",
    },
];
