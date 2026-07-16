'use client'

import { useEffect, useRef, useState } from 'react'

export default function ShareButton({ title }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') setUrl(window.location.href)
  }, [])

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const shareText = `${title ?? 'Material'} — Chizlab`

  const handleClick = async () => {
    // Native share sheet on mobile / supported browsers.
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareText, url })
        return
      } catch {
        // user cancelled or unsupported — fall back to the menu
      }
    }
    setOpen((v) => !v)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked — leave the link visible for manual copy
    }
  }

  const enc = encodeURIComponent
  const links = [
    { label: 'Telegram', href: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${shareText} ${url}`)}` },
    { label: 'Email', href: `mailto:?subject=${enc(shareText)}&body=${enc(`${shareText}\n${url}`)}` },
    { label: 'X (Twitter)', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(shareText)}` },
  ]

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={handleClick}
        data-cursor-hover=""
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-2 font-sf text-[16px] border border-primary/40 text-primary px-6 py-3.5 hover:bg-primary/10 transition-colors bp-sm:text-[15px] bp-sm:px-5 bp-sm:py-3 bp-xs:text-[14px] bp-xs:px-4 bp-xs:py-2.5"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        Ulashish
      </button>

      {open && (
        <div className="absolute left-0 bottom-full mb-2 z-40 w-[260px] bg-bg border border-primary/25 rounded-md py-2 shadow-lg">
          <button
            type="button"
            onClick={copyLink}
            className="flex items-center justify-between w-full text-left px-4 py-2.5 font-sf text-[15px] text-primary hover:bg-primary/10 transition-colors"
          >
            <span>Havolani nusxalash</span>
            {copied && <span className="text-[13px] text-primary/60">Nusxalandi ✓</span>}
          </button>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 font-sf text-[15px] text-primary hover:bg-primary/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
