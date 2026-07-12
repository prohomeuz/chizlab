'use client'

import React from 'react'
import { LAPTOP_PATH } from '@/data/svgPaths'
import { S3_LINE1, S3_LINE2 } from '@/data/heroConstants'

// === BUSINESS LOGIC ===
// (none — animation driven by useHeroAnimation via refs)

// === UI ===
function Scene3Laptop({ sceneRef, laptopStrokeRef, laptopFillRef, s3CharsRef }) {
  return (
    <div ref={sceneRef} className="absolute inset-0 bg-bg" style={{ opacity: 0 }}>
      <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col justify-center pl-16 mb-[12vh] bp-xs:w-full bp-xs:px-6 bp-xs:pl-6 bp-xs:justify-start bp-xs:pt-[24vh] bp-xs:mb-0 mobile:w-full mobile:px-6 mobile:justify-start mobile:pt-[24vh] mobile:mb-0">
        <h2 className="text-primary font-normal leading-none font-sf text-[clamp(46px,8.5vw,130px)] bp-xs:text-[46px] bp-xs:leading-[1.15] bp-xs:text-center mobile:text-[46px] mobile:leading-[1.15] mobile:text-center">
          {S3_LINE1.split('').map((char, i) => (
            <span key={`l1-${i}`} ref={(el) => { s3CharsRef.current[i] = el }}>{char}</span>
          ))}
          <br />
          {S3_LINE2.split('').map((char, i) => (
            <span key={`l2-${i}`} ref={(el) => { s3CharsRef.current[S3_LINE1.length + i] = el }}>{char}</span>
          ))}
        </h2>
      </div>

      <svg
        viewBox="0 0 1323 606"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 w-[62vw] h-auto bp-xs:w-[100vw] bp-xs:top-[calc(24vh_+_120px)] bp-xs:bottom-auto bp-xs:right-0 bp-xs:left-0 bp-xs:opacity-[0.55] mobile:w-[100vw] mobile:top-[calc(24vh_+_120px)] mobile:bottom-auto mobile:right-0 mobile:left-0 mobile:opacity-[0.55]"
      >
        <path ref={laptopStrokeRef} d={LAPTOP_PATH} stroke="#B8926A" strokeWidth="1.5" fill="none" />
        <path ref={laptopFillRef} d={LAPTOP_PATH} fill="#B8926A" opacity="0" />
      </svg>
    </div>
  )
}

export default React.memo(Scene3Laptop)
