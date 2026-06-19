'use client'

import React from 'react'
import { END_PATHS } from '@/data/svgPaths'
import { S4_PART1, S4_ITALIC, S4_PART2 } from '@/data/heroConstants'

// === BUSINESS LOGIC ===
// (none — animation driven by useHeroAnimation via refs)

// === UI ===
function Scene4End({ sceneRef, endSvgRef, s4CharsRef }) {
  return (
    <div ref={sceneRef} className="absolute inset-0 bg-bg z-0" style={{ opacity: 0 }}>
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-[28vh] mobile:pt-[24vh]">
        <h2 className="text-primary font-normal leading-none text-center select-none whitespace-nowrap text-[100px] mobile:text-[46px] mobile:whitespace-normal mobile:px-5">
          {S4_PART1.split('').map((char, i) => (
            <span key={`s4p1-${i}`} ref={(el) => { s4CharsRef.current[i] = el }} className="font-sf">{char}</span>
          ))}
          <em className="font-ppe">
            {S4_ITALIC.split('').map((char, i) => (
              <span key={`s4it-${i}`} ref={(el) => { s4CharsRef.current[S4_PART1.length + i] = el }}>{char}</span>
            ))}
          </em>
          <br className="hidden mobile:block" />
          {S4_PART2.split('').map((char, i) => (
            <span key={`s4p2-${i}`} ref={(el) => { s4CharsRef.current[S4_PART1.length + S4_ITALIC.length + i] = el }} className="font-sf">{char}</span>
          ))}
        </h2>
      </div>

      <div
        ref={endSvgRef}
        className="absolute bottom-0 left-0 right-0 mobile:top-[calc(31vh_+_20px)] mobile:bottom-auto mobile:w-[100vw]"
      >
        <svg viewBox="0 0 1920 835" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          {END_PATHS.map((d, i) => (
            <path key={i} d={d} fill="#B8926A" stroke="#B8926A" strokeWidth="0.5" strokeMiterlimit="10" />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default React.memo(Scene4End)
