import { notFound } from 'next/navigation'
import CategoryView from '@/components/CategoryView'
import { getCategories, getMaterials } from '@/lib/api'
import { findCategoryBySlug } from '@/lib/slug'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { slug } = await params
  const categories = await getCategories()
  const category = findCategoryBySlug(categories, slug)
  return {
    title: category ? `${category.name} — Chizlab` : 'Chizlab',
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const categories = await getCategories()
  const category = findCategoryBySlug(categories, slug)

  if (!category) notFound()

  const data = await getMaterials({ categoryId: category.id, limit: 60 })
  const materials = data?.items ?? []

  return <CategoryView categoryName={category.name} categorySlug={slug} materials={materials} />
}
