import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
    name: "testimonial",
    title: "Témoignages",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Nom de l'auteur",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "text",
            title: "Témoignage",
            type: "text",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Note (étoiles)",
            type: "number",
            initialValue: 5,
            validation: (rule) => rule.required().min(1).max(5),
            options: {
                list: [1, 2, 3, 4, 5],
                layout: "radio"
            }
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "rating",
        },
        prepare({ title, subtitle }) {
            return {
                title: title,
                subtitle: `${subtitle} étoiles`,
            };
        },
    },
});
