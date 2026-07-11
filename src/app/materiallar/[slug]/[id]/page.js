import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MaterialCard from '@/components/MaterialCard'
import { getMaterial, getMaterials } from '@/lib/api'

export const revalidate = 60

const FALLBACK_COVER = '/chizmachilik.jpg'

export async function generateMetadata({ params }) {
  const { id } = await params
  const material = await getMaterial(id)
  return { title: material ? `${material.title} — Chizlab` : 'Chizlab' }
}

export default async function MaterialPage({ params }) {
  const { slug, id } = await params
  const material = await getMaterial(id)

  if (!material) notFound()

  const related = await getMaterials({ categoryId: material.categoryId, limit: 5 })
  const otherMaterials = (related?.items ?? []).filter((item) => item.id !== material.id).slice(0, 4)

  const infoRows = [
    { label: 'Muallif', value: material.authors?.length > 0 ? material.authors.join(', ') : null },
    { label: 'Til', value: material.language },
    { label: 'Nashr yili', value: material.publishYear },
    { label: 'Davlat', value: material.country },
    { label: 'Sahifalar soni', value: material.pageCount },
  ].filter((row) => row.value)

  return (
    <main className="bg-bg min-h-screen">
      <header className="flex items-center justify-between px-10 py-8 mobile:px-5 mobile:py-5">
        <Link href="/" aria-label="Chizlab">
          <Image src="/logo.svg" alt="Chizlab" width={160} height={37} priority />
        </Link>
        <Link
          href={`/materiallar/${slug}`}
          className="font-sf text-[16px] text-primary hover:opacity-70 transition-opacity"
        >
          &larr; Ortga
        </Link>
      </header>

      <section className="px-10 pb-20 grid grid-cols-[minmax(0,380px)_1fr] gap-16 mobile:px-5 mobile:pb-10 mobile:grid-cols-1 mobile:gap-8">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-primary/5">
          <Image
            src={material.coverUrl || FALLBACK_COVER}
            alt={material.title ?? 'Material'}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 380px"
          />
        </div>

        <div>
          <h1 className="font-ppe text-[48px] font-normal text-primary leading-[1.1] mb-8 mobile:text-[28px] mobile:mb-5">
            {material.title}
          </h1>

          {infoRows.length > 0 && (
            <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-3 mb-8 mobile:mb-6">
              {infoRows.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="font-sf text-[15px] text-primary/50">{row.label}</dt>
                  <dd className="font-sf text-[15px] text-primary">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {material.blurb && (
            <p className="font-sf text-[17px] leading-relaxed text-primary/80 mb-10 mobile:text-[15px] mobile:mb-6">
              {material.blurb}
            </p>
          )}

          {material.mediaUrl && (
            <a
              href={material.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover=""
              className="inline-block font-sf text-[16px] bg-primary text-bg px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity"
            >
              Yuklab olish
            </a>
          )}
        </div>
      </section>

      {otherMaterials.length > 0 && (
        <section className="px-10 pb-24 mobile:px-5 mobile:pb-12">
          <h2 className="font-ppe text-[32px] font-normal text-primary mb-10 mobile:text-[22px] mobile:mb-6">
            Shunga o&apos;xshash materiallar
          </h2>
          <div className="grid grid-cols-4 gap-x-8 gap-y-14 mobile:grid-cols-2 mobile:gap-x-4 mobile:gap-y-8">
            {otherMaterials.map((item) => (
              <MaterialCard key={item.id} material={item} categorySlug={slug} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
