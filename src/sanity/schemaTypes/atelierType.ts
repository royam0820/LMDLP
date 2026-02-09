import { Calendar } from "lucide-react";
import { defineField, defineType } from "sanity";

export const atelierType = defineType({
    name: "atelier",
    title: "Ateliers & Stages",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titre de l'atelier",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description courte",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "ageRange",
            title: "Âge (ex: 4 - 8 ans)",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "schedule",
            title: "Horaire (ex: Mercredi 14h - 15h30)",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "period",
            title: "Période",
            type: "string",
            options: {
                list: [
                    { title: "À l'année (Scolaire)", value: "year" },
                    { title: "Vacances Scolaires", value: "holidays" },
                ],
                layout: "radio",
            },
            initialValue: "year",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "organizer",
            title: "Organisateur",
            type: "string",
            options: {
                list: [
                    { title: "Codeacademy123", value: "codeacademy123" },
                    { title: "La Maison des Petits Loups", value: "lmdpl" },
                ],
                layout: "radio",
            },
            initialValue: "lmdpl",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "price",
            title: "Prix Total (€)",
            type: "number",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "sessionsCount",
            title: "Nombre de séances",
            type: "number",
        }),
        defineField({
            name: "startDate",
            title: "Date de début",
            type: "date",
            hidden: ({ document }) => document?.period !== "year" && document?.period !== "holidays",
        }),
        defineField({
            name: "endDate",
            title: "Date de fin",
            type: "date",
            hidden: ({ document }) => document?.period !== "year" && document?.period !== "holidays",
        }),
        defineField({
            name: "bookingUrl",
            title: "Lien de réservation (Codeacademy123)",
            type: "url",
            hidden: ({ document }) => document?.organizer !== "codeacademy123",
        }),
    ],
});
