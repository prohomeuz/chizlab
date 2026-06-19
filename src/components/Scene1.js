'use client'

import React from 'react'
import { MAIN_WORD, SUFFIX } from '@/data/heroConstants'

// === DATA ===
// ARC dimensions in vw — must remain inline (no Tailwind equivalent)
const ARC_STYLE = { width: '80vw', height: '80vw' }

// === BUSINESS LOGIC ===
// (none — animation driven by useHeroAnimation via refs)

// === UI ===
function Scene1({ sceneRef, arcRef, charsRef }) {
  return (
    <div ref={sceneRef} className="absolute inset-0 flex flex-col bg-bg">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden pt-20">
        <svg
          className="s1-arc absolute bottom-[-55vw] left-1/2 -translate-x-1/2 mobile:w-[110vw] mobile:h-[110vw] mobile:bottom-[calc(29vh_+_33px_-_55vw)]"
          style={ARC_STYLE}
          viewBox="0 0 1000 1000"
          fill="none"
        >
          <path
            ref={arcRef}
            d="M 2 500 A 498 498 0 0 1 998 500"
            stroke="#B8926A"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
        <h1 className="relative z-10 text-center leading-none select-none text-primary text-[170px] mobile:text-[46px] mobile:mb-[38vh]">
          <em className="font-ppe italic">
            {MAIN_WORD.split('').map((char, i) => (
              <span key={i} ref={(el) => { charsRef.current[i] = el }}>{char}</span>
            ))}
          </em>
          <span className="font-sf not-italic font-normal">
            {SUFFIX.split('').map((char, i) => (
              <span key={i} ref={(el) => { charsRef.current[MAIN_WORD.length + i] = el }}>{char}</span>
            ))}
          </span>
        </h1>
      </div>
    </div>
  )
}

export default React.memo(Scene1)
