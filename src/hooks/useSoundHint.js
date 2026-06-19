'use client'

import { useEffect } from 'react'

// === DATA ===
const LERP = 0.07

// === BUSINESS LOGIC ===
export function useSoundHint(loaderDone, hintDismissed, soundHintRef, onDismissAndPlay) {
  useEffect(() => {
    if (!loaderDone || hintDismissed) return
    if (window.innerWidth <= 430) return
    const hint = soundHintRef.current
    if (!hint) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx, cy = ty
    let rafId = null

    const animate = () => {
      cx += (tx - cx) * LERP
      cy += (ty - cy) * LERP
      hint.style.transform = `translate(calc(${cx}px - 100% - 14px), calc(${cy}px - 50%))`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const handleMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }

    const handleClick = () => {
      onDismissAndPlay?.()
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('click', handleClick, { once: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(rafId)
    }
  }, [loaderDone, hintDismissed, soundHintRef, onDismissAndPlay])
}
