'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// There is no such page — instead of showing a 404, send the user back to where they were.
// If they came from within the site, go back; otherwise fall back to the home page.
export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    let cameFromSite = false
    try {
      cameFromSite =
        !!document.referrer && new URL(document.referrer).origin === window.location.origin
    } catch {
      cameFromSite = false
    }

    if (cameFromSite && window.history.length > 1) router.back()
    else router.replace('/')
  }, [router])

  // Brand-coloured blank screen shown for the instant before the redirect kicks in.
  return <div className="fixed inset-0 bg-bg" aria-hidden="true" />
}
