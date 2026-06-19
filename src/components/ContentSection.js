'use client'

import React, { lazy, Suspense, forwardRef } from 'react'
import CategorySection from '@/components/CategorySection'
import AboutSection from '@/components/AboutSection'
import TeamSection from '@/components/TeamSection'

// === DATA ===
// opacity and pointerEvents are GSAP-animated — keep inline
const GSAP_STYLE = { opacity: 0, pointerEvents: 'none' }

// === BUSINESS LOGIC ===
const WaveSectionDesktop = lazy(() => import('./WaveSectionDesktop'))
const WaveSectionMobile = lazy(() => import('./WaveSectionMobile'))
const Footer = lazy(() => import('./Footer'))

// === UI ===
const ContentSection = forwardRef(function ContentSection(
  { waveSectionRef, lineCTAPathRef, featureItemsRef, mobileWaveSectionRef, mobileWavePathRef, mobileFeatureItemsRef, openAboutIdx, onToggle },
  ref
) {
  return (
    <div
      ref={ref}
      className="content-section fixed inset-0 z-10 bg-bg overflow-y-auto [scrollbar-gutter:stable]"
      style={GSAP_STYLE}
    >
      <CategorySection />

      <Suspense fallback={null}>
        <WaveSectionDesktop
          waveSectionRef={waveSectionRef}
          lineCTAPathRef={lineCTAPathRef}
          featureItemsRef={featureItemsRef}
        />
        <WaveSectionMobile
          mobileWaveSectionRef={mobileWaveSectionRef}
          mobileWavePathRef={mobileWavePathRef}
          mobileFeatureItemsRef={mobileFeatureItemsRef}
        />
      </Suspense>

      <AboutSection openAboutIdx={openAboutIdx} onToggle={onToggle} />
      <TeamSection />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
})

export default ContentSection
