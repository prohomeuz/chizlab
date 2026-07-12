'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const wrapRef = useRef(null)
  const defaultRef = useRef(null)
  const activeRef = useRef(null)
  const hoverRef = useRef(null)

  // The custom cursor only runs on a real desktop: a mouse (fine pointer) AND a wide
  // viewport. On narrow / mobile-layout widths or touch devices we hide it and let the
  // normal default OS cursor show (see the matching @media rule in globals.css).
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1000px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const def = defaultRef.current
    const act = activeRef.current
    const hov = hoverRef.current
    if (!wrap || !def || !act || !hov) return

    if (!isDesktop) {
      // Not a desktop viewport — hide the custom cursor; the default cursor is used.
      wrap.style.display = 'none'
      hov.style.display = 'none'
      return
    }

    // Desktop: ensure the cursor elements are visible again (e.g. after resizing wider).
    wrap.style.display = ''
    hov.style.display = ''

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
  }, [isDesktop])

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
