'use client'

import dynamic from 'next/dynamic'
import { useRef, useState, useCallback, useEffect } from 'react'
import Loader from '@/components/Loader'
import SoundHint from '@/components/SoundHint'
import Navbar from '@/components/Navbar'
import ScrollIndicator from '@/components/ScrollIndicator'
import ContentSection from '@/components/ContentSection'
import { useSound } from '@/hooks/useSound'
import { useSoundHint } from '@/hooks/useSoundHint'
import { useWaveAnimation } from '@/hooks/useWaveAnimation'
import { useMobileWaveAnimation } from '@/hooks/useMobileWaveAnimation'

// === DATA ===
// Loaded client-only: GSAP needs window, prevents hydration mismatch
const HeroContainer = dynamic(() => import('@/components/HeroContainer'), {
  ssr: false,
  loading: () => null,
})

// === BUSINESS LOGIC ===
export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const [openAboutIdx, setOpenAboutIdx] = useState(0)

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
