'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/data/navItems'
import { slugify } from '@/lib/slug'

const NAV_LINKS = {
  Chizmachilik: `/materiallar/${slugify('Chizmachilik')}`,
  Dizayn: `/materiallar/${slugify('Dizayn')}`,
}

// Mobile menu order (top → bottom) per the design.
const MOBILE_MENU_ORDER = ['Kirish', 'Chizmachilik', 'Ijodkorlar', 'Dizayn', 'AI', 'Ovoz']

// === BUSINESS LOGIC ===
function NavItem({ item, isPlaying, onToggleAudio, className, onNavigate }) {
  if (item === 'Ovoz') {
    return (
      <button
        onClick={() => {
          onToggleAudio()
          onNavigate?.()
        }}
        className={`transition-colors rounded-full ${isPlaying ? 'bg-primary text-bg' : 'text-primary'} ${className}`}
      >
        {item}
      </button>
    )
  }

  if (NAV_LINKS[item]) {
    return (
      <Link href={NAV_LINKS[item]} onClick={onNavigate} className={`text-primary hover:opacity-70 transition-opacity ${className}`}>
        {item}
      </Link>
    )
  }

  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onNavigate?.(); alert('Tez kunda!') }}
      className={`text-primary hover:opacity-70 transition-opacity ${className}`}
    >
      {item}
    </a>
  )
}

// === UI ===
function Navbar({ isPlaying, onToggleAudio }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className="fixed left-0 right-0 flex items-center justify-between p-10 top-0 z-[100] bg-bg
        bp-lg:p-6 bp-md:py-4 bp-md:px-6 bp-sm:py-3.5 bp-sm:px-5 bp-xs:py-3 bp-xs:px-4"
    >
      <Image
        src="/logo.svg"
        alt="Chizlab"
        width={210}
        height={48}
        priority
        className="bp-lg:w-[180px] bp-lg:h-[41px] bp-md:w-[163px] bp-md:h-[37.52px] bp-sm:w-[150px] bp-sm:h-[34.6px] bp-xs:w-[136px] bp-xs:h-[31.4px]"
      />

      <div className="flex items-center bp-md:hidden bp-sm:hidden bp-xs:hidden">
        {navItems.map((item) => (
          <div key={item} className="flex items-center">
            <Image src="/naqsh.svg" alt="" width={22} height={22} className="opacity-60 mx-3.75 bp-lg:mx-2.5 bp-lg:w-[18px] bp-lg:h-[18px]" />
            <NavItem
              item={item}
              isPlaying={isPlaying}
              onToggleAudio={onToggleAudio}
              className="text-[20px] px-3.5 py-1 bp-lg:text-[16px] bp-lg:px-2.5"
            />
          </div>
        ))}
        <Image src="/naqsh.svg" alt="" width={22} height={22} className="opacity-60 mx-3.75 bp-lg:mx-2.5 bp-lg:w-[18px] bp-lg:h-[18px]" />
      </div>

      <div className="hidden bp-md:flex bp-sm:flex bp-xs:flex items-center gap-2">
        <Image src="/naqsh.svg" alt="" width={18} height={18} className="opacity-60 bp-xs:w-[14px] bp-xs:h-[14px]" />
        <button
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          data-cursor-hover=""
          className="font-sf text-[16px] text-primary bg-transparent border-0 py-1 px-2 rounded bp-xs:text-[14px]"
        >
          Menyu
        </button>
        <Image src="/naqsh.svg" alt="" width={18} height={18} className="opacity-60 bp-xs:w-[14px] bp-xs:h-[14px]" />
      </div>

      {/* Mobile menu — fades in/out (kept mounted so opacity can animate). */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`hidden bp-md:flex bp-sm:flex bp-xs:flex fixed inset-0 z-[110] bg-bg flex-col [transition:opacity_0.45s_ease] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between p-10 bp-md:py-4 bp-md:px-6 bp-sm:py-3.5 bp-sm:px-5 bp-xs:py-3 bp-xs:px-4">
          <Image
            src="/logo.svg"
            alt="Chizlab"
            width={210}
            height={48}
            className="bp-md:w-[163px] bp-md:h-[37.52px] bp-sm:w-[150px] bp-sm:h-[34.6px] bp-xs:w-[136px] bp-xs:h-[31.4px]"
          />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Yopish"
            data-cursor-hover=""
            className="w-11 h-11 rounded-full border border-primary flex items-center justify-center text-primary bp-xs:w-10 bp-xs:h-10"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>

        <div className="px-10 bp-md:px-6 bp-sm:px-5 bp-xs:px-5 py-6">
          {MOBILE_MENU_ORDER.map((item) => (
            <div
              key={item}
              className="py-8 flex justify-center border-t border-accent/50 last:border-b bp-sm:py-7 bp-xs:py-6"
            >
              <NavItem
                item={item}
                isPlaying={isPlaying}
                onToggleAudio={onToggleAudio}
                onNavigate={() => setMenuOpen(false)}
                className="text-[30px] font-[620] text-center px-6 py-1 bp-md:text-[28px] bp-sm:text-[26px] bp-xs:text-[22px]"
              />
            </div>
          ))}
        </div>

        {/* Decorative quatrefoil lattice band at the bottom */}
        <div className="mt-auto px-10 pb-10 pt-6 pointer-events-none select-none bp-md:px-6 bp-sm:px-5 bp-xs:px-4" aria-hidden="true">
          <svg viewBox="0 0 480 132" className="w-full h-auto text-accent" fill="none">
            <defs>
              <pattern id="navbar-quatrefoil" width="48" height="48" patternUnits="userSpaceOnUse">
                <path
                  d="M12 12 a12 12 0 0 1 24 0 a12 12 0 0 1 0 24 a12 12 0 0 1 -24 0 a12 12 0 0 1 0 -24 z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  opacity="0.55"
                />
              </pattern>
            </defs>
            <rect width="480" height="132" fill="url(#navbar-quatrefoil)" />
          </svg>
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Navbar)
