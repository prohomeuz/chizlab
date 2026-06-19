'use client'

import React from 'react'

// === DATA ===
const WAVE_PATH = 'M-1 0.99707C60 5.49707 183.8 40.2971 191 143.497C200 272.497 137.5 198.997 154 183.497C170.5 167.997 300 215.497 393 183.497C486 151.497 586 130.997 643 255.997C700 380.997 974.5 192.497 1010.5 208.997C1042.53 223.678 1128.4 318.321 1189.56 329.497C1197.13 330.882 1204.33 330.985 1211 329.497C1271.5 315.997 1134.12 281.497 1189.56 329.497C1208.54 355.997 1263.4 397.497 1331 351.497C1415.5 293.997 1430.5 237.497 1517.5 335.997C1587.1 414.797 1749.5 379.164 1822 351.497C1893.33 332.164 2037.6 296.497 2044 308.497'
const FEATURES = [
  { img: '/clock.png', text: '1 daqiqada kerakli manbalarni topish imkoniyati', left: 'calc(6.09% + 1px)', top: '16%', width: '259px' },
  { img: '/hand.png', text: "Oson va mustaqil\no'rganish", left: 'calc(25% + 20px)', top: '49%', whiteSpace: 'pre' },
  { img: '/with-ai.png', text: "AI bilan g'oyani\nchizmaga aylantirish", left: 'calc(50% + 15px)', top: '55.9%', whiteSpace: 'pre' },
  { img: '/ijodkor.png', text: "Ijodkorlar bilan\no'sish va ulashish", left: 'calc(77% - 47px)', top: '79%', whiteSpace: 'pre' },
]

// === BUSINESS LOGIC ===
// (none — animation driven by useWaveAnimation via refs passed from parent)

// === UI ===
function WaveSectionDesktop({ waveSectionRef, lineCTAPathRef, featureItemsRef }) {
  return (
    <section ref={waveSectionRef} className="py-[60px] pb-20 relative overflow-hidden mobile:hidden">
      <div className="relative h-0 [width:calc(100%+1px)] [-margin-left:1px] [padding-bottom:20.104%]">
        <svg
          viewBox="0 0 1920 386"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full"
        >
          <path ref={lineCTAPathRef} d={WAVE_PATH} stroke="#B8926A" strokeWidth="2" />
        </svg>

        {FEATURES.map((f, i) => (
          <div
            key={i}
            ref={(el) => (featureItemsRef.current[i] = el)}
            className="absolute flex items-center gap-5 -translate-y-1/2"
            style={{ left: f.left, top: f.top }}
          >
            <div className="w-[85px] h-[85px] shrink-0 overflow-hidden [clip-path:polygon(22%_0%,78%_3%,100%_20%,97%_78%,80%_100%,18%_97%,0%_80%,3%_22%)]">
              <img src={f.img} alt="" className="w-full h-full object-cover block" loading="lazy" />
            </div>
            <p
              className="font-sf text-[20px] font-normal text-primary leading-normal tracking-[-0.4px] m-0"
              style={{ width: f.width, whiteSpace: f.whiteSpace }}
            >
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default React.memo(WaveSectionDesktop)
