import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const seasonalCampaignType = defineType({
    name: 'seasonalCampaign',
    title: 'Campagnes & Sélections Saisonnières',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Nom interne de la campagne',
            type: 'string',
            description: 'Ex: Halloween 2026, Sélection de Noël 2026, Pâques...',
            validation: (rule) => rule.required().error('Le nom de la campagne est requis'),
        }),
        defineField({
            name: 'slug',
            title: 'Lien URL de la sélection',
            type: 'slug',
            description: 'Identifiant de la page dédiée (ex: halloween-2026 donnera /selections/halloween-2026)',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required().error('Le slug est requis pour créer la page dédiée'),
        }),
        defineField({
            name: 'title',
            title: 'Titre public affiché',
            type: 'string',
            description: 'Ex: 🎃 Frissons & Déguisements pour Halloween !',
            validation: (rule) => rule.required().error('Le titre public est requis'),
        }),
        defineField({
            name: 'badgeText',
            title: 'Badge d\'ambiance (facultatif)',
            type: 'string',
            description: 'Ex: Spécial Halloween, Magie de Noël, Sélection du moment...',
            initialValue: 'Sélection du moment',
        }),
        defineField({
            name: 'theme',
            title: 'Ambiance visuelle (Thème)',
            type: 'string',
            description: 'Définit l\'univers graphique immersif de la page dédiée (couleurs, illustrations SVG festives et décorations).',
            initialValue: 'halloween',
            options: {
                list: [
                    { title: '🎃 Halloween (Citrouille, prune & petites chauves-souris)', value: 'halloween' },
                    { title: '🎄 Noël féerique (Rouge chaleureux, vert sapin & flocons)', value: 'noel' },
                    { title: '🐣 Pâques printanier (Pastels doux, vert tendre & petits œufs)', value: 'paques' },
                    { title: '🎒 Rentrée des classes (Jaune moutarde, bleu ardoise & étoiles)', value: 'rentree' },
                    { title: '✨ Neutre & Chaleureux (Univers classique La Maison des Petits Loups)', value: 'default' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'description',
            title: 'Description d\'ambiance',
            type: 'text',
            rows: 3,
            description: 'Court texte introductif présentant cette sélection thématique',
        }),
        defineField({
            name: 'banner',
            title: 'Bannière / Visuel d\'ambiance',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Image illustrative de la thématique (utilisée sur la page dédiée et en vignette d\'accueil)',
        }),
        defineField({
            name: 'startDate',
            title: 'Date et heure de début',
            type: 'datetime',
            description: 'Début automatique de la campagne sur le site',
            validation: (rule) => rule.required().error('La date de début est requise'),
        }),
        defineField({
            name: 'endDate',
            title: 'Date et heure de fin',
            type: 'datetime',
            description: 'Fin automatique de la campagne sur le site',
            validation: (rule) =>
                rule
                    .required()
                    .error('La date de fin est requise')
                    .min(rule.valueOfField('startDate'))
                    .error('La date de fin doit être postérieure à la date de début'),
        }),
        defineField({
            name: 'isActive',
            title: 'Campagne active ?',
            type: 'boolean',
            initialValue: true,
            description: 'Interrupteur général : si désactivé, la campagne ne s\'affichera pas même si la période est en cours',
        }),
        defineField({
            name: 'priority',
            title: 'Priorité d\'affichage',
            type: 'number',
            initialValue: 1,
            description: 'Pour départager si plusieurs campagnes sont actives simultanément (1 = priorité maximale, 2, 3...)',
        }),
        defineField({
            name: 'products',
            title: 'Articles sélectionnés pour cette campagne',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'product' }],
                },
            ],
            description: 'Choisissez les jouets dans le catalogue. Vous pouvez les glisser-déposer pour choisir leur ordre d\'affichage exact.',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            publicTitle: 'title',
            startDate: 'startDate',
            endDate: 'endDate',
            isActive: 'isActive',
            media: 'banner',
            products: 'products',
        },
        prepare({ title, publicTitle, startDate, endDate, isActive, media, products }) {
            const now = new Date();
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            const count = Array.isArray(products) ? products.length : 0;

            let status = '⚪ Période non définie';
            if (!isActive) {
                status = '🔴 Désactivée manuellement';
            } else if (start && end) {
                if (now < start) {
                    status = `🟡 À venir (dès le ${start.toLocaleDateString('fr-FR')})`;
                } else if (now > end) {
                    status = `⚪ Terminée (depuis le ${end.toLocaleDateString('fr-FR')})`;
                } else {
                    status = `🟢 En cours (jusqu'au ${end.toLocaleDateString('fr-FR')})`;
                }
            }

            return {
                title: `${title || 'Campagne sans nom'}`,
                subtitle: `${status} • ${count} article${count > 1 ? 's' : ''}`,
                media,
            };
        },
    },
})
