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

    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 430) {
      wrap.style.display = 'none'
      hov.style.display = 'none'
      return
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'grid',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={defaultRef}
          src="/cursor.svg"
          width={65}
          height={64}
          alt=""
          style={{ gridArea: '1/1', transition: 'opacity 0.15s ease', opacity: 1 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={activeRef}
          src="/click.svg"
          width={65}
          height={64}
          alt=""
          style={{ gridArea: '1/1', transition: 'opacity 0.15s ease', opacity: 0 }}
        />
      </div>

      {/* Ko'rish circle — rasm cardlari ustida */}
      <div
        ref={hoverRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '86px',
          height: '86px',
          borderRadius: '50%',
          background: '#fffff6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          fontFamily: 'var(--font-inter)',
          fontSize: '18px',
          color: '#003837',
          transition: 'opacity 0.2s ease',
        }}
      >
        Ko&#39;rish
      </div>
    </>
  )
}
