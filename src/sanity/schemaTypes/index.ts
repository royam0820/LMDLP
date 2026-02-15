import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'

import { productType } from './productType'
import { atelierType } from './atelierType'

import { testimonialType } from './testimonialType'

import { homePage } from './homePage'
import { anniversaryPage } from './anniversaryPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, productType, atelierType, testimonialType, homePage, anniversaryPage],
}
