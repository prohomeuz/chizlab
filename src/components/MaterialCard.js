import Image from 'next/image'
import Link from 'next/link'

const FALLBACK_COVER = '/chizmachilik.jpg'

export default function MaterialCard({ material, categorySlug }) {
  const { id, title, coverUrl, authors, publishYear } = material

  return (
    <Link
      href={`/materiallar/${categorySlug}/${id}`}
      data-cursor-hover=""
      className="group block"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-primary/5">
        <Image
          src={coverUrl || FALLBACK_COVER}
          alt={title ?? 'Material'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 430px) 44vw, (max-width: 1200px) 30vw, 22vw"
        />
      </div>
      <h4 className="font-ppe text-[22px] leading-[1.25] text-primary mt-4 mobile:text-[17px] mobile:mt-2.5">
        {title ?? 'Nomsiz material'}
      </h4>
      {(authors?.length > 0 || publishYear) && (
        <p className="font-sf text-[15px] text-primary/60 mt-1 mobile:text-[13px]">
          {authors?.length > 0 ? authors.join(', ') : null}
          {authors?.length > 0 && publishYear ? ' · ' : null}
          {publishYear ?? null}
        </p>
      )}
    </Link>
  )
}
