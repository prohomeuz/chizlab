'use client'

import React from 'react'
import { HAND_PATH } from '@/data/svgPaths'

// === DATA ===
// opacity and pointerEvents are GSAP-animated — keep inline
const OVERLAY_GSAP = { opacity: 0, pointerEvents: 'none' }

// === BUSINESS LOGIC ===
// (none — animation driven by useHeroAnimation via refs)

// === UI ===
function Scene2Hand({ sceneRef, handOverlayRef, handStrokeRef, handFillRef }) {
  return (
    <>
      {/* Background div — scene 2 is just a white bg, hand is in overlay */}
      <div ref={sceneRef} className="absolute inset-0 bg-bg" style={{ opacity: 0 }} />

      {/* Hand SVG overlay — above nav (z:101), no background */}
      <div
        ref={handOverlayRef}
        className="fixed inset-0 z-[101] flex items-center justify-center"
        style={OVERLAY_GSAP}
      >
        <svg
          viewBox="0 0 1446 704"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[90vw] h-auto mt-[30vh] mobile:w-[96vw] mobile:mt-[-18vh]"
        >
          <path ref={handStrokeRef} d={HAND_PATH} stroke="#B8926A" strokeWidth="2" fill="none" />
          <path ref={handFillRef} d={HAND_PATH} fill="#B8926A" opacity="0" />
        </svg>
      </div>
    </>
  )
}

export default React.memo(Scene2Hand)
