import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MaterialCard from '@/components/MaterialCard'
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

  const data = await getMaterials({ categoryId: category.id, limit: 40 })
  const materials = data?.items ?? []

  return (
    <main className="bg-bg min-h-screen">
      <header className="flex items-center justify-between px-10 py-8 mobile:px-5 mobile:py-5">
        <Link href="/" aria-label="Chizlab">
          <Image src="/logo.svg" alt="Chizlab" width={160} height={37} priority />
        </Link>
        <Link
          href="/"
          className="font-sf text-[16px] text-primary hover:opacity-70 transition-opacity"
        >
          Bosh sahifa
        </Link>
      </header>

      <section className="px-10 pb-24 mobile:px-5 mobile:pb-12">
        <h1 className="font-ppe text-[64px] font-normal text-primary leading-none mb-14 mobile:text-[32px] mobile:mb-8">
          {category.name}
        </h1>

        {materials.length === 0 ? (
          <p className="font-sf text-[18px] text-primary/60">
            Hozircha bu bo&apos;limda materiallar yo&apos;q.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-x-8 gap-y-14 mobile:grid-cols-2 mobile:gap-x-4 mobile:gap-y-8">
            {materials.map((material) => (
              <MaterialCard key={material.id} material={material} categorySlug={slug} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
