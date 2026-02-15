import { defineField, defineType } from 'sanity'

export const anniversaryPage = defineType({
    name: 'anniversaryPage',
    title: 'Page Anniversaires',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre de la page (interne)',
            type: 'string',
            initialValue: 'Configuration Page Anniversaires',
            readOnly: true,
        }),
        defineField({
            name: 'formulaIncludes',
            title: 'Éléments inclus dans la formule',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: [
                'Décoration de la salle selon le thème choisi',
                'Boissons, friandises & sacs surprises inclus',
                'Animateur dédié pendant 2 heures',
                'Espace réservé (jusqu’à 11 enfants avec 1 animateur)',
                'Gâteau et bougies à apporter par les parents'
            ],
            description: 'Liste des points listés sous "Formule Anniversaire"'
        }),
        defineField({
            name: 'pricePerChild',
            title: 'Prix par enfant',
            type: 'number',
            initialValue: 20,
        }),
        defineField({
            name: 'animatorFee',
            title: 'Forfait Animateur',
            type: 'number',
            initialValue: 180,
        }),
        defineField({
            name: 'minChildren',
            title: 'Nombre minimum d\'enfants',
            type: 'number',
            initialValue: 8,
        }),
        defineField({
            name: 'assistantFee',
            title: 'Forfait Animateur Assistant',
            type: 'number',
            description: 'Supplément pour le 2ème animateur (au-delà de 12 enfants)',
            initialValue: 90,
        }),
        defineField({
            name: 'deposit',
            title: 'Acompte',
            type: 'number',
            initialValue: 180,
        }),
        defineField({
            name: 'sundayFee',
            title: 'Supplément Dimanche',
            type: 'number',
            initialValue: 60,
        }),
    ],
})
