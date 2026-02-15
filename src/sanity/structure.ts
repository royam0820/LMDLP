import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Page d\'accueil')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Page Anniversaires')
        .child(
          S.document()
            .schemaType('anniversaryPage')
            .documentId('anniversaryPage')
        ),
      S.divider(),
      S.documentTypeListItem('post').title('Articles de Blog'),
      S.documentTypeListItem('category').title('Catégories Blog'),
      S.documentTypeListItem('author').title('Auteurs'),
      S.divider(),
      S.documentTypeListItem('product').title('Produits (Boutique)'),
      S.documentTypeListItem('atelier').title('Ateliers & Stages'),
      S.documentTypeListItem('testimonial').title('Témoignages'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'product', 'atelier', 'testimonial', 'homePage', 'anniversaryPage'].includes(item.getId()!),
      ),
    ])
