'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const wrapRef = useRef(null)
  const defaultRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const def = defaultRef.current
    const act = activeRef.current
    if (!wrap || !def || !act) return

    if (window.matchMedia('(pointer: coarse)').matches) {
      wrap.style.display = 'none'
      return
    }

    let x = 0, y = 0, rafId = null

    const render = () => {
      wrap.style.transform = `translate(${x}px, ${y}px)`
      rafId = null
    }

    const handleMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!rafId) rafId = requestAnimationFrame(render)
    }

    const handleEnter = () => { wrap.style.opacity = '1' }
    const handleLeave = () => { wrap.style.opacity = '0' }

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
  )
}
