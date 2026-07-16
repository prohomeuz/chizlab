'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAnalyticsFlushOnHide, trackClick, trackPageview } from '@/lib/analytics'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-analytics]'

// Computes a human-readable label for whatever was clicked: an explicit
// data-analytics override wins, then aria-label, then trimmed text content,
// then href — so every click is attributable without annotating every button.
function labelFor(el) {
  const explicit = el.getAttribute('data-analytics')
  if (explicit) return explicit

  const ariaLabel = el.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel.trim()

  const text = el.textContent?.trim().replace(/\s+/g, ' ')
  if (text) return text.slice(0, 120)

  const href = el.getAttribute('href')
  if (href) return href

  return el.tagName.toLowerCase()
}

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    initAnalyticsFlushOnHide()
  }, [])

  useEffect(() => {
    trackPageview(pathname)
  }, [pathname])

  useEffect(() => {
    const onClick = (e) => {
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE_SELECTOR) : null
      if (!target) return
      trackClick(labelFor(target), pathname)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  return null
}
