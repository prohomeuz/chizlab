'use client'

import React from 'react'
import Image from 'next/image'

// === DATA ===
// Conic-gradient mask is GSAP-animated (angle changes) — keep inline
const MASK_STYLE = {
  WebkitMaskImage: 'conic-gradient(from -90deg, #000 0deg, transparent 0deg)',
  maskImage: 'conic-gradient(from -90deg, #000 0deg, transparent 0deg)',
}

// === BUSINESS LOGIC ===
// (none — pure display, animation driven by useHeroAnimation via refs)

// === UI ===
function Loader({ loaderRef, loaderImgRef, loaderCountRef, visible }) {
  if (!visible) return null
  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-primary">
      <div className="absolute bottom-12 left-12 bp-sm:bottom-auto bp-sm:left-1/2 bp-sm:top-1/2 bp-sm:-translate-x-1/2 bp-sm:-translate-y-1/2 bp-xs:bottom-auto bp-xs:left-1/2 bp-xs:top-1/2 bp-xs:-translate-x-1/2 bp-xs:-translate-y-1/2 mobile:bottom-auto mobile:left-1/2 mobile:top-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2">
        <div className="relative w-[600px] h-[600px] bp-md:w-[480px] bp-md:h-[480px] bp-sm:w-[380px] bp-sm:h-[380px] bp-xs:w-[220px] bp-xs:h-[220px] mobile:w-[220px] mobile:h-[220px]">
          <Image
            ref={loaderImgRef}
            src="/loader.png"
            alt=""
            fill
            priority
            className="block object-cover"
            style={MASK_STYLE}
            sizes="(max-width: 499px) 220px, (max-width: 749px) 380px, (max-width: 999px) 480px, 600px"
          />
          <span
            ref={loaderCountRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-bg text-[52px] font-sf font-bold tracking-[-0.02em] leading-none pointer-events-none select-none bp-md:text-[44px] bp-sm:text-[36px] bp-xs:text-[22px] mobile:text-[22px]"
          >
            1%
          </span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Loader)
