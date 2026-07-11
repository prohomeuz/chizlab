'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Loader from '@/components/Loader'
import HeroContainer from '@/components/HeroContainer'
import SoundHint from '@/components/SoundHint'
import Navbar from '@/components/Navbar'
import MobileVolumeButton from '@/components/MobileVolumeButton'
import ScrollIndicator from '@/components/ScrollIndicator'
import ContentSection from '@/components/ContentSection'
import { useSound } from '@/hooks/useSound'
import { useSoundHint } from '@/hooks/useSoundHint'
import { useWaveAnimation } from '@/hooks/useWaveAnimation'
import { useMobileWaveAnimation } from '@/hooks/useMobileWaveAnimation'

// === BUSINESS LOGIC ===
export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const [openAboutIdx, setOpenAboutIdx] = useState(0)
  // HeroContainer is client-only (GSAP needs window). Rendering it after mount instead of via
  // next/dynamic keeps it in the main bundle — no lazy chunk to fetch — so the loader animation
  // starts right after hydration instead of waiting seconds for a separate chunk.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const loaderRef = useRef(null)
  const loaderImgRef = useRef(null)
  const loaderCountRef = useRef(null)
  const soundHintRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const indicatorClickRef = useRef(null)
  const contentSectionRef = useRef(null)
  const waveSectionRef = useRef(null)
  const lineCTAPathRef = useRef(null)
  const featureItemsRef = useRef([])
  const mobileWaveSectionRef = useRef(null)
  const mobileWavePathRef = useRef(null)
  const mobileFeatureItemsRef = useRef([])

  const { isPlaying, toggleAudio, fadeIn, initAudio } = useSound()

  useEffect(() => {
    if (!loaderDone) return
    initAudio()
  }, [loaderDone, initAudio])

  const handleAboutToggle = useCallback((i) => {
    setOpenAboutIdx((prev) => (prev === i ? null : i))
  }, [])

  const handleDismissAndPlay = useCallback(() => {
    setHintDismissed(true)
    initAudio()
    fadeIn()
  }, [initAudio, fadeIn])

  useSoundHint(loaderDone, hintDismissed, soundHintRef, handleDismissAndPlay)
  useWaveAnimation(loaderDone, waveSectionRef, lineCTAPathRef, featureItemsRef)
  useMobileWaveAnimation(loaderDone, mobileWaveSectionRef, mobileWavePathRef, mobileFeatureItemsRef)

  // === UI ===
  return (
    <main className="bg-[#fffff6]">
      <Loader
        loaderRef={loaderRef}
        loaderImgRef={loaderImgRef}
        loaderCountRef={loaderCountRef}
        visible={!loaderDone}
      />

      <SoundHint soundHintRef={soundHintRef} visible={loaderDone && !hintDismissed} />

      <Navbar isPlaying={isPlaying} onToggleAudio={toggleAudio} />
      <MobileVolumeButton isPlaying={isPlaying} onToggle={toggleAudio} />

      {mounted && (
        <HeroContainer
          contentSectionRef={contentSectionRef}
          scrollIndicatorRef={scrollIndicatorRef}
          indicatorClickRef={indicatorClickRef}
          soundHintRef={soundHintRef}
          loaderRef={loaderRef}
          loaderImgRef={loaderImgRef}
          loaderCountRef={loaderCountRef}
          setLoaderDone={setLoaderDone}
          fadeIn={fadeIn}
          onHintHide={() => setHintDismissed(true)}
        />
      )}

      <ContentSection
        ref={contentSectionRef}
        waveSectionRef={waveSectionRef}
        lineCTAPathRef={lineCTAPathRef}
        featureItemsRef={featureItemsRef}
        mobileWaveSectionRef={mobileWaveSectionRef}
        mobileWavePathRef={mobileWavePathRef}
        mobileFeatureItemsRef={mobileFeatureItemsRef}
        openAboutIdx={openAboutIdx}
        onToggle={handleAboutToggle}
      />

      <ScrollIndicator
        scrollIndicatorRef={scrollIndicatorRef}
        indicatorClickRef={indicatorClickRef}
      />
    </main>
  )
}
