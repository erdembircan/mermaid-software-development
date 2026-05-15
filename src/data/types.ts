import type { Category } from '../lib/categories'

export type UseCase = {
  slug: string
  title: string
  body: string
}

export type ChartEntry = {
  id: string
  name: string
  tagline: string
  category: Category
  description: string
  example: string
  useCases: UseCase[]
  docsUrl: string
}
