import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CatalogShell from '@/components/CatalogShell'
import ShareButton from '@/components/ShareButton'
import DownloadButton from '@/components/DownloadButton'
import { getCategories, getMaterial, getMaterials } from '@/lib/api'
import { findCategoryBySlug } from '@/lib/slug'
import { TYPE_LABELS, LANG_LABELS } from '@/lib/labels'

export const revalidate = 60

const FALLBACK_COVER = '/chizmachilik.jpg'

// Lokal demo muqovalari MinIO'da (localhost:9100) turadi. Next 16 rasm
// optimizatori xususiy IP'ga hal bo'ladigan host'larni bloklaydi, shu bois
// bunday URL'larni optimizatorsiz to'g'ridan-to'g'ri yuklaymiz.
const LOCAL_HOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/i

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
    { label: 'Tur', value: TYPE_LABELS[material.materialType] ?? material.materialType },
    { label: 'Til', value: LANG_LABELS[material.language] ?? material.language },
    { label: 'Nashr yili', value: material.publishYear },
    { label: "Bo'lim", value: category?.name },
    { label: 'Davlat', value: material.country },
    { label: 'Sahifa', value: material.pageCount },
  ].filter((box) => box.value)

  return (
    <CatalogShell>
      {/* Back link + title */}
      <div className="px-10 pt-6 bp-lg:px-8 bp-md:px-6 bp-sm:px-5 bp-xs:px-4">
        <Link
          href={`/materiallar/${slug}`}
          data-cursor-hover=""
          className="inline-flex items-center gap-1.5 font-sf text-[16px] text-primary hover:opacity-70 transition-opacity bp-sm:text-[15px] bp-xs:text-[14px]"
        >
          <span aria-hidden="true">&larr;</span> Ortga
        </Link>
        <h1 className="font-ppe text-[44px] font-normal leading-[1.1] text-primary mt-3 bp-lg:text-[38px] bp-md:text-[32px] bp-sm:text-[27px] bp-xs:text-[23px]">
          {material.title}
        </h1>
      </div>

      {/* Cover strip — active material in full color, the rest dimmed (per design) */}
      <section className="px-10 pt-6 pb-10 bp-lg:px-8 bp-md:px-6 bp-sm:px-5 bp-xs:px-4">
        <div className="grid grid-cols-4 gap-4 bp-md:grid-cols-3 bp-md:gap-3.5 bp-sm:grid-cols-2 bp-sm:gap-3.5 bp-xs:grid-cols-2 bp-xs:gap-3.5">
          {strip.slice(0, 4).map((item) => {
            const isActive = item.id === material.id
            const cover = item.coverUrl || FALLBACK_COVER
            return (
              <Link
                key={item.id}
                href={`/materiallar/${slug}/${item.id}`}
                data-cursor-hover=""
                className={`relative overflow-hidden aspect-[2480/3508] transition-opacity duration-300 ${
                  isActive ? '' : 'opacity-35 hover:opacity-70'
                }`}
              >
                <Image
                  src={cover}
                  alt={item.title ?? 'Material'}
                  fill
                  unoptimized={LOCAL_HOST_RE.test(cover)}
                  className="object-cover"
                  sizes="(max-width: 430px) 44vw, (max-width: 1200px) 30vw, 22vw"
                />
                {isActive && (
                  <div className="absolute left-3 bottom-3 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-[#111] font-sf text-[12px] px-2.5 py-1">
                        {TYPE_LABELS[material.materialType] ?? 'Maqola'}
                      </span>
                      <span className="font-sf text-[12px] text-white/90">
                        {material.authors?.[0]}
                        {material.authors?.[0] && material.publishYear ? '   ' : ''}
                        {material.publishYear}
                      </span>
                    </div>
                    <span className="bg-[#00e05a] text-[#003014] font-sf text-[12px] px-2.5 py-1 w-fit">Yangi</span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="px-10 pb-24 bp-lg:px-8 bp-lg:pb-20 bp-md:px-6 bp-md:pb-16 bp-sm:px-5 bp-sm:pb-12 bp-xs:px-4 bp-xs:pb-10">
        <div className="grid grid-cols-2 gap-16 bp-lg:gap-10 bp-md:gap-8 bp-sm:grid-cols-1 bp-sm:gap-6 bp-xs:grid-cols-1 bp-xs:gap-5">
          <div>
            {material.authors?.length > 0 && (
              <p className="font-ppe text-[30px] leading-[1.2] text-primary mb-7 bp-lg:text-[26px] bp-md:text-[24px] bp-sm:text-[24px] bp-sm:mb-6 bp-xs:text-[21px] bp-xs:mb-5">
                <span className="text-primary/50">Mualliflar: </span>
                {material.authors.join(', ')}
              </p>
            )}

            {infoBoxes.length > 0 && (
              <div className="grid grid-cols-3 gap-3 bp-xs:gap-2.5">
                {infoBoxes.map((box) => (
                  <div
                    key={box.label}
                    className="px-4 py-2.5 border border-primary/25 rounded-md bp-sm:px-3 bp-sm:py-2.5 bp-xs:px-2.5 bp-xs:py-2"
                  >
                    <dt className="font-sf text-[13px] text-primary/45 bp-xs:text-[11px]">{box.label}:</dt>
                    <dd className="font-sf text-[16px] text-primary mt-0.5 bp-sm:text-[15px] bp-xs:text-[13px]">{box.value}</dd>
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

            <div className="flex flex-wrap items-center gap-3">
              <DownloadButton href={material.mediaUrl} />
              <ShareButton title={material.title} />
            </div>
          </div>
        </div>
      </section>
    </CatalogShell>
  )
}
