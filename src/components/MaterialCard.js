import Image from 'next/image'
import Link from 'next/link'

const FALLBACK_COVER = '/chizmachilik.jpg'

const MATERIAL_TYPE_LABELS = {
  textbook: 'Darslik',
  textbook_electronic: 'Elektron',
  thesis: 'Dissertatsiya',
  article: 'Maqola',
  monograph: 'Monografiya',
  presentation: 'Taqdimot',
}

export default function MaterialCard({ material, categorySlug }) {
  const { id, title, coverUrl, authors, publishYear, materialType, isNew } = material
  const typeLabel = MATERIAL_TYPE_LABELS[materialType]
  const author = authors?.length > 0 ? authors[0] : null
  // Show the "Maqola / Yangi" featured overlay for articles or explicitly-flagged new items.
  const featured = isNew || materialType === 'article'

  return (
    <Link
      href={`/materiallar/${categorySlug}/${id}`}
      data-cursor-hover=""
      className="group block relative aspect-[3/4] w-full overflow-hidden bg-primary/5"
    >
      <Image
        src={coverUrl || FALLBACK_COVER}
        alt={title ?? 'Material'}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        sizes="(max-width: 430px) 44vw, (max-width: 1200px) 30vw, 22vw"
      />

      {/* Featured overlay — matches the design's "Maqola / Yangi" card */}
      {featured && (
        <div className="absolute left-[7%] bottom-[10%] flex items-start gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="bg-white text-[#111] font-sf text-[13px] leading-none px-3 py-1.5 bp-sm:text-[11px] bp-sm:px-2 bp-sm:py-1 bp-xs:text-[10px] bp-xs:px-1.5 bp-xs:py-1">
              {typeLabel ?? 'Maqola'}
            </span>
            <span className="bg-[#00e05a] text-[#003014] font-sf text-[13px] leading-none px-3 py-1.5 w-fit bp-sm:text-[11px] bp-sm:px-2 bp-sm:py-1 bp-xs:text-[10px] bp-xs:px-1.5 bp-xs:py-1">
              Yangi
            </span>
          </div>
          {(author || publishYear) && (
            <span className="font-sf text-[14px] text-white/90 mt-0.5 bp-sm:text-[11px] bp-xs:text-[10px]">
              {author}{author && publishYear ? '   ' : ''}{publishYear}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
