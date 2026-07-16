import Image from 'next/image'
import Link from 'next/link'
import { TYPE_LABELS } from '@/lib/labels'

const FALLBACK_COVER = '/chizmachilik.jpg'

// Shu muddat ichida qo'shilgan material "Yangi" belgisini oladi
const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000

// Lokal demo muqovalari MinIO'da (localhost:9100) turadi. Next 16 rasm
// optimizatori xususiy IP'ga hal bo'ladigan host'larni bloklaydi, shu bois
// bunday URL'larni optimizatorsiz to'g'ridan-to'g'ri yuklaymiz. Prod'dagi
// chizlab.uz muqovalari avvalgidek optimizatsiyadan o'tadi.
const LOCAL_HOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/i

/**
 * Muqova kartasi — mockup bo'yicha: karta faqat muqovadan iborat (ostida
 * matn yo'q), sichqoncha olib borilganda pastdan qoraytiruvchi parda va
 * ma'lumotlar chiqadi:
 *   [tur badge]   muallif  yil
 *   [Yangi]       sarlavha
 */
export default function MaterialCard({ material, categorySlug }) {
  const { id, title, coverUrl, authors, publishYear, materialType, createdAt } = material
  const typeLabel = TYPE_LABELS[materialType] ?? null
  const author = authors?.[0] ?? null
  const isNew = createdAt ? Date.now() - new Date(createdAt).getTime() < NEW_WINDOW_MS : false
  const cover = coverUrl || FALLBACK_COVER

  return (
    <Link
      href={`/materiallar/${categorySlug}/${id}`}
      data-cursor-hover=""
      className="group relative block aspect-[2480/3508] w-full overflow-hidden bg-primary/5"
    >
      <Image
        src={cover}
        alt={title ?? 'Material'}
        fill
        unoptimized={LOCAL_HOST_RE.test(cover)}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        sizes="(max-width: 749px) 46vw, (max-width: 999px) 31vw, 23vw"
      />

      {/* Hoverda pastdan qoraytiruvchi parda — yozuvlar o'qilishi uchun */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#001a19]/85 via-[#001a19]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      {/* Hover ma'lumotlari */}
      <div className="absolute inset-x-3.5 bottom-3.5 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {typeLabel ? (
          <span className="whitespace-nowrap bg-bg px-2 py-[3px] font-sf text-[11px] leading-none text-primary">
            {typeLabel}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <p className="truncate font-sf text-[13px] text-white/85">
          {author && <span>{author}</span>}
          {publishYear != null && <span className={author ? 'ml-2.5' : ''}>{publishYear}</span>}
        </p>

        {isNew ? (
          <span className="whitespace-nowrap bg-[#0ae448] px-2 py-[3px] font-sf text-[11px] leading-none text-[#00240b]">
            Yangi
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <h4 className="truncate font-sf text-[18px] leading-tight text-white bp-sm:text-[16px] bp-xs:text-[15px]">
          {title ?? 'Nomsiz material'}
        </h4>
      </div>
    </Link>
  )
}
