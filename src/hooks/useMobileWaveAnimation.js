'use client'

import { useEffect } from 'react'

// === DATA ===
const DRAW_DURATION = 3

// === BUSINESS LOGIC ===
export function useMobileWaveAnimation(loaderDone, mobileWaveSectionRef, mobileWavePathRef, mobileFeatureItemsRef) {
  useEffect(() => {
    if (!loaderDone) return
    if (typeof window === 'undefined' || window.innerWidth > 430) return
    const section = mobileWaveSectionRef.current
    const path = mobileWavePathRef.current
    const items = mobileFeatureItemsRef.current.filter(Boolean)
    if (!section || !path) return
    const totalLen = path.getTotalLength()

    let observer = null

    import('gsap').then(({ default: gsap }) => {
      const snapReset = () => {
        gsap.killTweensOf(path)
        items.forEach((item) => {
          gsap.killTweensOf(item.children[0])
          gsap.killTweensOf(item.children[1])
          gsap.set(item.children[0], { opacity: 0, filter: 'blur(10px)' })
          gsap.set(item.children[1], { opacity: 0, filter: 'blur(8px)' })
        })
        gsap.set(path, { strokeDasharray: totalLen, strokeDashoffset: totalLen, opacity: 1 })
      }

      snapReset()

      let playing = false

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !playing) {
            playing = true
            gsap.killTweensOf(path)
            items.forEach((item) => {
              gsap.killTweensOf(item.children[0])
              gsap.killTweensOf(item.children[1])
            })
            gsap.set(path, { strokeDasharray: totalLen, strokeDashoffset: totalLen, opacity: 1 })
            items.forEach((item) => {
              gsap.set(item.children[0], { opacity: 0, filter: 'blur(10px)' })
              gsap.set(item.children[1], { opacity: 0, filter: 'blur(8px)' })
            })
            gsap.to(path, { strokeDashoffset: 0, duration: DRAW_DURATION, ease: 'none' })
            items.forEach((item, i) => {
              const delay = 0.4 + i * 0.55
              gsap.to(item.children[0], { opacity: 1, filter: 'blur(0px)', duration: 0.6, delay, ease: 'power2.out' })
              gsap.to(item.children[1], { opacity: 1, filter: 'blur(0px)', duration: 0.65, delay: delay + 0.15, ease: 'power2.out' })
            })
          } else if (!entry.isIntersecting && playing) {
            playing = false
            gsap.killTweensOf(path)
            items.forEach((item) => {
              gsap.killTweensOf(item.children[0])
              gsap.killTweensOf(item.children[1])
              gsap.to(item.children[0], { opacity: 0, filter: 'blur(10px)', duration: 0.45, ease: 'power2.in' })
              gsap.to(item.children[1], { opacity: 0, filter: 'blur(8px)', duration: 0.4, ease: 'power2.in' })
            })
            gsap.to(path, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => gsap.set(path, { strokeDasharray: totalLen, strokeDashoffset: totalLen, opacity: 1 }),
            })
          }
        },
        { threshold: 0, rootMargin: '0px 0px -20% 0px' },
      )
      observer.observe(section)
    })

    return () => observer?.disconnect()
  }, [loaderDone, mobileWaveSectionRef, mobileWavePathRef, mobileFeatureItemsRef])
}
