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

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="hidden bp-md:flex bp-sm:flex bp-xs:flex fixed inset-0 z-[110] bg-bg flex-col"
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
              className="text-primary text-[28px] leading-none bp-xs:text-[24px]"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col items-start gap-6 px-10 py-8 overflow-y-auto bp-md:px-6 bp-sm:px-5 bp-sm:gap-5 bp-xs:px-4 bp-xs:gap-4">
            {navItems.map((item) => (
              <NavItem
                key={item}
                item={item}
                isPlaying={isPlaying}
                onToggleAudio={onToggleAudio}
                onNavigate={() => setMenuOpen(false)}
                className="text-[32px] bp-md:text-[28px] bp-sm:text-[26px] bp-xs:text-[22px]"
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default React.memo(Navbar)
