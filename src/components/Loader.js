'use client'

import React from 'react'

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
      <div className="absolute bottom-12 left-12 mobile:bottom-auto mobile:left-1/2 mobile:top-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2">
        <div className="relative w-[600px] h-[600px] mobile:w-[220px] mobile:h-[220px]">
          <img
            ref={loaderImgRef}
            src="/loader.png"
            alt=""
            width={600}
            height={600}
            className="block w-full h-full"
            style={MASK_STYLE}
          />
          <span
            ref={loaderCountRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-bg text-[52px] font-sf font-bold tracking-[-0.02em] leading-none pointer-events-none select-none mobile:text-[22px]"
          >
            1%
          </span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Loader)
