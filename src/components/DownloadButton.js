'use client'

// Muqovadagi teal-yashil rang (cover-empty.jpg fonidan olingan)
const COVER_GREEN = '#1f6362'

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/**
 * "Yuklab olish" tugmasi — descriptionning ostida turadi. Fon rangi muqovadagi
 * yashil (teal) rangga mos. Fayl mavjud bo'lsa to'g'ridan-to'g'ri yuklaydi;
 * demo materiallarda hali fayl yo'q, shu bois "Tez kunda" xabari chiqadi.
 */
export default function DownloadButton({ href }) {
  const cls =
    'inline-flex items-center gap-2.5 font-sf text-[16px] text-bg px-8 py-3.5 rounded-full transition-opacity hover:opacity-85 bp-sm:text-[15px] bp-sm:px-7 bp-sm:py-3 bp-xs:text-[14px] bp-xs:px-6 bp-xs:py-2.5'

  if (href) {
    return (
      <a
        href={href}
        download
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover=""
        className={cls}
        style={{ backgroundColor: COVER_GREEN }}
      >
        <DownloadIcon />
        Yuklab olish
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={() => alert('Fayl tez kunda qo‘shiladi')}
      data-cursor-hover=""
      className={cls}
      style={{ backgroundColor: COVER_GREEN }}
    >
      <DownloadIcon />
      Yuklab olish
    </button>
  )
}
