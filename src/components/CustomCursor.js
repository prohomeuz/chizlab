'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const wrapRef = useRef(null)
  const defaultRef = useRef(null)
  const activeRef = useRef(null)
  const hoverRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const def = defaultRef.current
    const act = activeRef.current
    const hov = hoverRef.current
    if (!wrap || !def || !act || !hov) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 430

    if (isMobile) {
      hov.style.display = 'none'
      wrap.style.opacity = '0'

      let targetX = 0, targetY = 0
      let currentX = 0, currentY = 0
      let isActive = false
      let hideTimeout = null
      let rafId = null
      const LERP = 0.12

      const animate = () => {
        currentX += (targetX - currentX) * LERP
        currentY += (targetY - currentY) * LERP
        wrap.style.transform = `translate(${currentX}px, ${currentY}px)`
        if (isActive || Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3) {
          rafId = requestAnimationFrame(animate)
        } else {
          rafId = null
        }
      }

      const handleTouchStart = (e) => {
        const touch = e.touches[0]
        if (!touch) return
        currentX = targetX = touch.clientX - 32
        currentY = targetY = touch.clientY - 32
        wrap.style.transform = `translate(${currentX}px, ${currentY}px)`
      }

      const handleTouchMove = (e) => {
        const touch = e.touches[0]
        if (!touch) return
        targetX = touch.clientX - 32
        targetY = touch.clientY - 32
        if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
        if (!isActive) {
          isActive = true
          wrap.style.opacity = '1'
        }
        if (!rafId) rafId = requestAnimationFrame(animate)
      }

      const handleTouchEnd = () => {
        isActive = false
        hideTimeout = setTimeout(() => { wrap.style.opacity = '0' }, 300)
      }

      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd)
      window.addEventListener('touchcancel', handleTouchEnd)

      return () => {
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
        window.removeEventListener('touchcancel', handleTouchEnd)
        if (rafId) cancelAnimationFrame(rafId)
        if (hideTimeout) clearTimeout(hideTimeout)
      }
    }

    let x = 0, y = 0, rafId = null

    const render = () => {
      wrap.style.transform = `translate(${x}px, ${y}px)`
      hov.style.transform = `translate(${x - 43}px, ${y - 43}px)`
      rafId = null
    }

    const handleMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!rafId) rafId = requestAnimationFrame(render)

      const onHoverTarget = !!e.target.closest('[data-cursor-hover]')

      if (onHoverTarget) {
        wrap.style.opacity = '0'
        hov.style.opacity = '1'
      } else {
        wrap.style.opacity = '1'
        hov.style.opacity = '0'
      }
    }

    const handleEnter = () => { wrap.style.opacity = '1' }
    const handleLeave = () => {
      wrap.style.opacity = '0'
      hov.style.opacity = '0'
    }

    const handleDown = () => {
      def.style.opacity = '0'
      act.style.opacity = '1'
    }
    const handleUp = () => {
      def.style.opacity = '1'
      act.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.documentElement.addEventListener('mouseenter', handleEnter)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Pen cursor — hero va boshqa sohalarda */}
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] grid [transition:opacity_0.2s_ease]"
        style={{ opacity: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={defaultRef}
          src="/cursor.svg"
          width={65}
          height={64}
          alt=""
          className="[grid-area:1/1] [transition:opacity_0.15s_ease]"
          style={{ opacity: 1 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={activeRef}
          src="/click.svg"
          width={65}
          height={64}
          alt=""
          className="[grid-area:1/1] [transition:opacity_0.15s_ease]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Ko'rish circle — rasm cardlari ustida */}
      <div
        ref={hoverRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[86px] h-[86px] rounded-full bg-bg flex items-center justify-center pointer-events-none z-[9998] font-inter text-[18px] text-primary [transition:opacity_0.2s_ease]"
        style={{ opacity: 0 }}
      >
        Ko&#39;rish
      </div>
    </>
  )
}
