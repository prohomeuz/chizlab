'use client'

import React from 'react'
import Image from 'next/image'
import { navItems } from '@/data/navItems'

// === BUSINESS LOGIC ===
// (none — pure display; toggleAudio passed from parent)

// === UI ===
function Navbar({ isPlaying, onToggleAudio }) {
  return (
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
        <button className="font-sf text-[16px] text-primary bg-transparent border-0 py-1 px-2 rounded">
          Menyu
        </button>
        <Image src="/naqsh.svg" alt="" width={18} height={18} className="opacity-60" />
      </div>
    </nav>
  )
}

export default React.memo(Navbar)
