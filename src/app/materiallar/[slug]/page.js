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
      <header
        className="flex items-center justify-between px-10 py-8
          bp-lg:px-8 bp-lg:py-6 bp-md:px-6 bp-md:py-5 bp-sm:px-5 bp-sm:py-4 bp-xs:px-4 bp-xs:py-3"
      >
        <Link href="/" aria-label="Chizlab">
          <Image
            src="/logo.svg"
            alt="Chizlab"
            width={160}
            height={37}
            priority
            className="bp-lg:w-[144px] bp-lg:h-auto bp-md:w-[132px] bp-sm:w-[120px] bp-xs:w-[108px]"
          />
        </Link>
        <Link
          href="/"
          className="font-sf text-[16px] text-primary hover:opacity-70 transition-opacity bp-sm:text-[14px] bp-xs:text-[13px]"
        >
          Bosh sahifa
        </Link>
      </header>

      <section
        className="px-10 pb-24 bp-lg:px-8 bp-lg:pb-20 bp-md:px-6 bp-md:pb-16 bp-sm:px-5 bp-sm:pb-12 bp-xs:px-4 bp-xs:pb-10"
      >
        <h1
          className="font-ppe text-[64px] font-normal text-primary leading-none mb-14
            bp-lg:text-[52px] bp-lg:mb-11 bp-md:text-[42px] bp-md:mb-9 bp-sm:text-[34px] bp-sm:mb-7 bp-xs:text-[27px] bp-xs:mb-6"
        >
          {category.name}
        </h1>

        {materials.length === 0 ? (
          <p className="font-sf text-[18px] text-primary/60 bp-sm:text-[16px] bp-xs:text-[15px]">
            Hozircha bu bo&apos;limda materiallar yo&apos;q.
          </p>
        ) : (
          <div
            className="grid grid-cols-4 gap-x-8 gap-y-14
              bp-lg:grid-cols-3 bp-lg:gap-x-6 bp-lg:gap-y-12
              bp-md:grid-cols-3 bp-md:gap-x-5 bp-md:gap-y-10
              bp-sm:grid-cols-2 bp-sm:gap-x-4 bp-sm:gap-y-9
              bp-xs:grid-cols-2 bp-xs:gap-x-3 bp-xs:gap-y-7"
          >
            {materials.map((material) => (
              <MaterialCard key={material.id} material={material} categorySlug={slug} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
