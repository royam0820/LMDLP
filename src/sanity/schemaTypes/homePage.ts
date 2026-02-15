import { defineField, defineType } from 'sanity'

export const homePage = defineType({
    name: 'homePage',
    title: 'Page d\'accueil',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre de la page (interne)',
            type: 'string',
            initialValue: 'Configuration Page d\'accueil',
            readOnly: true,
        }),
        defineField({
            name: 'vitrineImage',
            title: 'Image Vitrine (Principal)',
            type: 'image',
            description: 'L\'image principale affichée sur la page d\'accueil. Format recommandé : 1920x1080px (Paysage). Si vide, l\'image par défaut sera utilisée.',
            options: {
                hotspot: true,
            },
        }),
    ],
})
