'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

// === DATA ===
const DRAW_DURATION = 5

// === BUSINESS LOGIC ===
export function useWaveAnimation(loaderDone, waveSectionRef, lineCTAPathRef, featureItemsRef) {
  useEffect(() => {
    if (!loaderDone) return
    const section = waveSectionRef.current
    const path = lineCTAPathRef.current
    const items = featureItemsRef.current.filter(Boolean)
    if (!section || !path) return

    const totalLen = path.getTotalLength()
    if (!totalLen) return

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

    const getArcLengthAtX = (targetSVGX) => {
      let lo = 0, hi = totalLen
      for (let i = 0; i < 64; i++) {
        const mid = (lo + hi) / 2
        if (path.getPointAtLength(mid).x < targetSVGX) lo = mid
        else hi = mid
      }
      return (lo + hi) / 2
    }

    const svgEl = path.ownerSVGElement
    const svgRect = svgEl.getBoundingClientRect()
    const delays = items.map((item) => {
      const cssX = item.getBoundingClientRect().left - svgRect.left
      const svgX = (cssX / svgRect.width) * 1920
      return (getArcLengthAtX(svgX) / totalLen) * DRAW_DURATION
    })

    let playing = false

    const observer = new IntersectionObserver(
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
            const base = delays[i] + 0.25
            gsap.to(item.children[0], { opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out', delay: base })
            gsap.to(item.children[1], { opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power2.out', delay: base + 0.18 })
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
      { threshold: 0, rootMargin: '0px 0px -25% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [loaderDone, waveSectionRef, lineCTAPathRef, featureItemsRef])
}
