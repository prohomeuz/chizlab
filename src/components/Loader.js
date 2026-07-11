'use client'

import React from 'react'
import { LOADER_IMAGE } from '@/data/loaderImage'

// === BUSINESS LOGIC ===
// The reveal (conic mask) and the % counter are driven by pure CSS (see .loader-naqsh /
// .loader-count in globals.css) so they animate immediately, without waiting for the JS
// bundle. useHeroAnimation only slides the loader away once the reveal has finished.

// === UI ===
function Loader({ loaderRef, loaderImgRef, loaderCountRef, visible }) {
  if (!visible) return null
  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-primary">
      <div className="absolute bottom-12 left-12 mobile:bottom-auto mobile:left-1/2 mobile:top-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2">
        <div className="relative w-[600px] h-[600px] mobile:w-[220px] mobile:h-[220px]">
          {/* Inlined data URI (see @/data/loaderImage): no network request, so the naqsh is
              present in the first paint. The conic mask reveal is a CSS animation (.loader-naqsh). */}
          <img
            ref={loaderImgRef}
            src={LOADER_IMAGE}
            alt=""
            decoding="sync"
            className="loader-naqsh absolute inset-0 block w-full h-full object-cover"
          />
          {/* % is rendered by CSS (.loader-count::after counts 0→100) so it moves without JS. */}
          <span
            ref={loaderCountRef}
            className="loader-count absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-bg text-[52px] font-sf font-bold tracking-[-0.02em] leading-none pointer-events-none select-none mobile:text-[22px]"
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Loader)
