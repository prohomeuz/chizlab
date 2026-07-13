import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategories, getMaterial, getMaterials } from '@/lib/api'
import { findCategoryBySlug } from '@/lib/slug'
import { LANG_LABELS } from '@/lib/labels'
import DownloadButton from '@/components/DownloadButton'

export const revalidate = 60

const FALLBACK_COVER = '/chizmachilik.jpg'

// Lokal demo muqovalari MinIO'da (localhost:9100) turadi. Next 16 rasm
// optimizatori xususiy IP'ga hal bo'ladigan host'larni bloklaydi, shu bois
// bunday URL'larni optimizatorsiz to'g'ridan-to'g'ri yuklaymiz.
const LOCAL_HOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/i

const MATERIAL_TYPE_LABELS = {
  textbook: 'Darslik',
  textbook_electronic: 'Elektron darslik',
  thesis: 'Dissertatsiya',
  article: 'Maqola',
  monograph: 'Monografiya',
  presentation: 'Taqdimot',
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const material = await getMaterial(id)
  return { title: material ? `${material.title} — Chizlab` : 'Chizlab' }
}

export default async function MaterialPage({ params }) {
  const { slug, id } = await params
  const [material, categories] = await Promise.all([getMaterial(id), getCategories()])

  if (!material) notFound()

  const category = findCategoryBySlug(categories, slug)
  const related = await getMaterials({ categoryId: material.categoryId, limit: 8 })
  const strip = related?.items ?? []

  const infoBoxes = [
    { label: 'Tur', value: MATERIAL_TYPE_LABELS[material.materialType] ?? material.materialType },
    { label: 'Til', value: LANG_LABELS[material.language] ?? material.language },
    { label: 'Nashr yili', value: material.publishYear },
    { label: "Bo'lim", value: category?.name },
    { label: 'Davlat', value: material.country },
    { label: 'Sahifa', value: material.pageCount },
  ].filter((box) => box.value)

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
          href={`/materiallar/${slug}`}
          className="font-sf text-[16px] text-primary hover:opacity-70 transition-opacity bp-sm:text-[14px] bp-xs:text-[13px]"
        >
          &larr; Ortga
        </Link>
      </header>

      {strip.length > 1 && (
        <section
          className="px-10 pb-14 bp-lg:px-8 bp-lg:pb-11 bp-md:px-6 bp-md:pb-9 bp-sm:px-5 bp-sm:pb-7 bp-xs:px-4 bp-xs:pb-6"
        >
          <div className="flex items-end gap-4 overflow-x-auto pb-1 bp-sm:gap-3 bp-xs:gap-2.5">
            {strip.map((item) => {
              const isActive = item.id === material.id
              return (
                <Link
                  key={item.id}
                  href={`/materiallar/${slug}/${item.id}`}
                  data-cursor-hover=""
                  className={`relative shrink-0 overflow-hidden transition-all duration-300 aspect-[3/4] ${
                    isActive
                      ? 'w-[240px] bp-lg:w-[200px] bp-md:w-[180px] bp-sm:w-[150px] bp-xs:w-[124px]'
                      : 'w-[140px] opacity-50 hover:opacity-90 bp-lg:w-[120px] bp-md:w-[104px] bp-sm:w-[88px] bp-xs:w-[74px]'
                  }`}
                >
                  <Image
                    src={item.coverUrl || FALLBACK_COVER}
                    alt={item.title ?? 'Material'}
                    fill
                    unoptimized={LOCAL_HOST_RE.test(item.coverUrl || FALLBACK_COVER)}
                    className="object-cover"
                    sizes={isActive ? '240px' : '140px'}
                  />
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 bg-primary/80 px-3 py-2 font-sf text-[12px] text-bg bp-sm:px-2 bp-sm:py-1.5 bp-sm:text-[11px] bp-xs:px-1.5 bp-xs:py-1 bp-xs:text-[10px]">
                      {item.title}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section
        className="px-10 pb-24 bp-lg:px-8 bp-lg:pb-20 bp-md:px-6 bp-md:pb-16 bp-sm:px-5 bp-sm:pb-12 bp-xs:px-4 bp-xs:pb-10"
      >
        <h1
          className="font-ppe text-[48px] font-normal text-primary leading-[1.1] mb-8
            bp-lg:text-[40px] bp-lg:mb-7 bp-md:text-[34px] bp-md:mb-6 bp-sm:text-[27px] bp-sm:mb-5 bp-xs:text-[23px] bp-xs:mb-4"
        >
          {material.title}
        </h1>

        <div
          className="grid grid-cols-2 gap-16
            bp-lg:gap-10 bp-md:gap-8 bp-sm:grid-cols-1 bp-sm:gap-6 bp-xs:grid-cols-1 bp-xs:gap-5"
        >
          <div>
            {material.authors?.length > 0 && (
              <p className="font-sf text-[16px] leading-relaxed text-primary mb-6 bp-sm:text-[15px] bp-sm:mb-5 bp-xs:text-[14px] bp-xs:mb-4">
                <span className="text-primary/50">Mualliflar: </span>
                {material.authors.join(', ')}
              </p>
            )}

            {infoBoxes.length > 0 && (
              <div className="grid grid-cols-3 border border-primary/15">
                {infoBoxes.map((box, i) => (
                  <div
                    key={box.label}
                    className={`px-4 py-3 border-primary/15 bp-sm:px-3 bp-sm:py-2.5 bp-xs:px-2 bp-xs:py-2 ${(i + 1) % 3 !== 0 ? 'border-r' : ''} ${
                      i < 3 && infoBoxes.length > 3 ? 'border-b' : ''
                    }`}
                  >
                    <dt className="font-sf text-[12px] text-primary/50 bp-xs:text-[10px]">{box.label}</dt>
                    <dd className="font-sf text-[15px] text-primary mt-0.5 bp-sm:text-[14px] bp-xs:text-[12px]">{box.value}</dd>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {material.tags?.length > 0 && (
              <p className="font-sf text-[14px] leading-relaxed text-primary/50 mb-6 bp-sm:mb-5 bp-xs:text-[13px] bp-xs:mb-4">
                <span>Kalit so&apos;zlar: </span>
                {material.tags.join(', ')}
              </p>
            )}

            {material.blurb && (
              <p className="font-sf text-[17px] leading-relaxed text-primary/80 mb-8 bp-md:text-[16px] bp-sm:text-[15px] bp-sm:mb-6 bp-xs:text-[14px] bp-xs:mb-5">
                {material.blurb}
              </p>
            )}

            <DownloadButton href={material.mediaUrl} />
          </div>
        </div>
      </section>
    </main>
  )
}
