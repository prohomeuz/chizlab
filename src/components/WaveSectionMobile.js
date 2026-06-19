'use client'

import React from 'react'
import Image from 'next/image'
import { VECTOR6_PATH } from '@/data/svgPaths'

// === DATA ===
// ml: left indent per item (was nth-child CSS in globals)
const FEATURES = [
  { img: '/clock.png', text: '1 daqiqada kerakli manbalarni topish imkoniyati', ml: '54px' },
  { img: '/hand.png', text: "Oson va mustaqil\no'rganish", ml: '110px' },
  { img: '/with-ai.png', text: "AI bilan g'oyani\nchizmaga aylantirish", ml: '35px' },
  { img: '/ijodkor.png', text: "Ijodkorlar bilan\no'sish va ulashish", ml: '85px' },
]

// === BUSINESS LOGIC ===
// (none — animation driven by useMobileWaveAnimation via refs)

// === UI ===
function WaveSectionMobile({ mobileWaveSectionRef, mobileWavePathRef, mobileFeatureItemsRef }) {
  return (
    <section ref={mobileWaveSectionRef} className="hidden mobile:block py-10 pb-[60px] relative">
      <svg
        viewBox="0 0 203.121 603.506"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute -left-2.5 top-0 w-[52%] h-full pointer-events-none"
      >
        <path ref={mobileWavePathRef} d={VECTOR6_PATH} stroke="#B8926A" strokeWidth="2" />
      </svg>

      {FEATURES.map((f, i) => (
        <div
          key={i}
          ref={(el) => (mobileFeatureItemsRef.current[i] = el)}
          className="flex flex-row items-center gap-4 pr-4 max-w-[92%] mb-14 self-start"
          style={f.ml ? { marginLeft: f.ml } : undefined}
        >
          <div className="w-[85px] h-[85px] shrink-0 overflow-hidden [clip-path:polygon(22%_0%,78%_3%,100%_20%,97%_78%,80%_100%,18%_97%,0%_80%,3%_22%)]">
            <Image src={f.img} alt="" width={85} height={85} className="w-full h-full object-cover block" sizes="85px" loading="lazy" />
          </div>
          <p className="font-sf text-[18px] leading-normal tracking-[-0.4px] text-primary m-0 whitespace-pre-line">
            {f.text}
          </p>
        </div>
      ))}
    </section>
  )
}

export default React.memo(WaveSectionMobile)
