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
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
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
            title: 'Age Recommandé',
            type: 'string',
            description: 'Ex: 0+, 3 ans+, etc.',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'isNew',
            title: 'Nouveauté ?',
            type: 'boolean',
            initialValue: false,
            description: 'Si coché, le produit apparaîtra dans le carousel et avec un badge "Nouveau"',
        }),
    ],
})
