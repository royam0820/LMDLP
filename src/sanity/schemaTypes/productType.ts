import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Produit (Boutique)',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Nom du Produit',
            type: 'string',
            validation: (rule) => rule.required().error('Le nom du produit est requis'),
        }),
        defineField({
            name: 'sku',
            title: 'Référence Produit (SKU / REF)',
            type: 'string',
            description: 'Référence alphanumérique de l\'article (12 caractères max, ex: DJ08412 ou JEL-0123)',
            validation: (rule) =>
                rule
                    .max(12)
                    .error('La référence ne doit pas dépasser 12 caractères')
                    .regex(/^[a-zA-Z0-9-_]*$/, {
                        name: 'alphanumeric',
                        invert: false,
                    })
                    .error('Seuls les caractères alphanumériques (lettres, chiffres, tirets) sont autorisés'),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'age',
            title: "Tranche d'âge recommandée",
            type: 'string',
            description: "Choisissez la tranche d'âge pour le classement et le filtrage sur la boutique",
            options: {
                list: [
                    { title: '🍼 0 - 12 mois (Naissance & Doudous)', value: '0-12m' },
                    { title: '🧸 1 - 3 ans (Éveil & Premiers pas)', value: '1-3y' },
                    { title: '🎨 3 - 6 ans (Imagination & Maternelle)', value: '3-6y' },
                    { title: '🧩 6 ans et + (Créativité & Jeux de société)', value: '6y+' },
                ],
                layout: 'dropdown',
            },
            initialValue: '0-12m',
        }),
        defineField({
            name: 'price',
            title: 'Prix (€)',
            type: 'number',
            description: 'Prix en euros (ex: 24.90)',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'isNew',
            title: 'Coup de cœur / Nouveauté ?',
            type: 'boolean',
            initialValue: false,
            description: 'Si coché, le produit apparaît en tête de liste dans la boutique, dans le carrousel d\'accueil et porte le badge "Coup de cœur"',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            sku: 'sku',
            subtitle: 'age',
            media: 'image',
        },
        prepare({ title, sku, subtitle, media }) {
            const ageLabels: Record<string, string> = {
                '0-12m': '🍼 0 - 12 mois',
                '1-3y': '🧸 1 - 3 ans',
                '3-6y': '🎨 3 - 6 ans',
                '6y+': '🧩 6 ans et +',
            };
            const ageText = (subtitle && ageLabels[subtitle]) || subtitle || 'Âge non défini';
            return {
                title: title || 'Nouveau produit (sans nom)',
                subtitle: sku ? `Réf: ${sku} • ${ageText}` : ageText,
                media,
            };
        },
    },
})
