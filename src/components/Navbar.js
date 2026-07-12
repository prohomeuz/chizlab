'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { navItems } from '@/data/navItems'

// === DATA ===
// Mobile menu order matches the design mockup (top → bottom).
const MOBILE_MENU_ITEMS = ['Kirish', 'Chizmachilik', 'Ijodkorlar', 'Dizayn', 'AI', 'Ovoz']

// === UI ===
function Navbar({ isPlaying, onToggleAudio }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock page scroll while the full-screen menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const handleMenuItem = (item) => {
    if (item === 'Ovoz') onToggleAudio()
    else alert('Tez kunda!')
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed left-0 right-0 flex items-center justify-between p-10 top-0 z-[100] bg-bg mobile:py-3.5 mobile:px-5">
        <Image
          className="mobile:w-[163px] mobile:h-[37.52px]"
          src="/logo.svg"
          alt="Chizlab"
          width={210}
          height={48}
          priority
        />

        <div className="flex items-center mobile:hidden">
          {navItems.map((item) => (
            <div key={item} className="flex items-center">
              <Image src="/naqsh.svg" alt="" width={22} height={22} className="opacity-60 mx-3.75" />
              {item === 'Ovoz' ? (
                <button
                  onClick={onToggleAudio}
                  className={`text-[20px] transition-colors px-3.5 py-1 rounded-full ${
                    isPlaying ? 'bg-primary text-bg' : 'text-primary'
                  }`}
                >
                  {item}
                </button>
              ) : (
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('Tez kunda!') }}
                  className="text-[20px] text-primary hover:opacity-70 transition-opacity"
                >
                  {item}
                </a>
              )}
            </div>
          ))}
          <Image src="/naqsh.svg" alt="" width={22} height={22} className="opacity-60 mx-3.75" />
        </div>

        <div className="hidden items-center gap-2 mobile:flex">
          <Image src="/naqsh.svg" alt="" width={18} height={18} className="opacity-60" />
          <button
            onClick={() => setMenuOpen(true)}
            className="font-sf text-[16px] text-primary bg-transparent border-0 py-1 px-2 rounded"
          >
            Menyu
          </button>
          <Image src="/naqsh.svg" alt="" width={18} height={18} className="opacity-60" />
        </div>
      </nav>

      {/* Full-screen mobile menu — fades in/out (mobile only). Kept mounted so opacity can animate. */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[200] bg-bg flex-col hidden mobile:flex [transition:opacity_0.45s_ease] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between py-3.5 px-5">
          <Image src="/logo.svg" alt="Chizlab" width={163} height={37.52} />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Yopish"
            className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-5">
          {MOBILE_MENU_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleMenuItem(item)}
              className="w-full text-center py-5 text-[28px] text-primary border-t border-primary/15 last:border-b"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Decorative naqsh (quatrefoil) band */}
        <div className="px-5 pb-10 pt-4 pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 440 132" className="w-full h-auto text-accent" fill="none">
            <defs>
              <pattern id="navbar-quatrefoil" width="44" height="44" patternUnits="userSpaceOnUse">
                <path
                  transform="scale(0.44)"
                  d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="440" height="132" fill="url(#navbar-quatrefoil)" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default React.memo(Navbar)
