'use client'

import React, { useRef } from 'react'
import Scene1 from './Scene1'
import Scene2Hand from './Scene2Hand'
import Scene3Laptop from './Scene3Laptop'
import Scene4End from './Scene4End'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'

// === BUSINESS LOGIC ===
// useHeroAnimation lives here so it runs after HeroContainer mounts and all refs are ready.
// External refs (loader, content, sound) are passed as props from page.js.
export default function HeroContainer({
  contentSectionRef,
  scrollIndicatorRef,
  indicatorClickRef,
  soundHintRef,
  loaderRef,
  loaderImgRef,
  loaderCountRef,
  setLoaderDone,
  fadeIn,
  onHintHide,
}) {
  const arcRef = useRef(null)
  const charsRef = useRef([])
  const scene1Ref = useRef(null)
  const scene2Ref = useRef(null)
  const handStrokeRef = useRef(null)
  const handFillRef = useRef(null)
  const handOverlayRef = useRef(null)
  const scene3Ref = useRef(null)
  const laptopStrokeRef = useRef(null)
  const laptopFillRef = useRef(null)
  const s3CharsRef = useRef([])
  const scene4Ref = useRef(null)
  const endSvgRef = useRef(null)
  const s4CharsRef = useRef([])
  const heroContainerRef = useRef(null)

  useHeroAnimation(
    {
      arcRef, charsRef,
      scene1Ref, scene2Ref, scene3Ref, scene4Ref,
      handStrokeRef, handFillRef, handOverlayRef,
      laptopStrokeRef, laptopFillRef, s3CharsRef,
      endSvgRef, s4CharsRef,
      heroContainerRef, contentSectionRef,
      scrollIndicatorRef, indicatorClickRef,
      soundHintRef, loaderRef, loaderImgRef, loaderCountRef,
    },
    { setLoaderDone, fadeIn, onHintHide }
  )

  // === UI ===
  return (
    <div ref={heroContainerRef} className="fixed inset-0 bg-bg">
      <Scene1 sceneRef={scene1Ref} arcRef={arcRef} charsRef={charsRef} />
      <Scene2Hand
        sceneRef={scene2Ref}
        handOverlayRef={handOverlayRef}
        handStrokeRef={handStrokeRef}
        handFillRef={handFillRef}
      />
      <Scene3Laptop
        sceneRef={scene3Ref}
        laptopStrokeRef={laptopStrokeRef}
        laptopFillRef={laptopFillRef}
        s3CharsRef={s3CharsRef}
      />
      <Scene4End sceneRef={scene4Ref} endSvgRef={endSvgRef} s4CharsRef={s4CharsRef} />
    </div>
  )
}
