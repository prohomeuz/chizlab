'use client'

import { useState } from 'react'

// Downloads the file directly (blob) instead of navigating to the media URL / viewer page.
export default function DownloadButton({ url, title, className }) {
  const [busy, setBusy] = useState(false)

  const filename = (() => {
    const base = (title ?? 'material').replace(/[\\/:*?"<>|]+/g, ' ').trim() || 'material'
    const ext = (url.split('?')[0].match(/\.([a-z0-9]{2,5})$/i)?.[1] ?? 'pdf').toLowerCase()
    return `${base}.${ext}`
  })()

  const triggerBlob = async () => {
    setBusy(true)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('fetch failed')
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      // Cross-origin / CORS-blocked: fall back to a plain download link (same tab, no viewer).
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.rel = 'noopener'
      document.body.appendChild(a)
      a.click()
      a.remove()
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={triggerBlob}
      disabled={busy}
      data-cursor-hover=""
      className={className}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block -mt-0.5 mr-2">
        <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
      </svg>
      {busy ? 'Yuklanmoqda…' : 'Yuklab olish'}
    </button>
  )
}
