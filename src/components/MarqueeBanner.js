'use client'

import React from 'react'

// === DATA ===
const ITEMS = Array(16).fill(null)

// === BUSINESS LOGIC ===
// (none — pure static display with CSS animation defined in globals.css)

// === UI ===
function MarqueeBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-primary overflow-hidden h-[42px] flex items-center">
      <div className="marquee-track">
        {ITEMS.map((_, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-bg text-[14px] tracking-[0.04em] font-sf px-[22px]">
              Platformamiz tez orada ishga tushadi
            </span>
            <span className="text-bg text-[18px] inline-flex items-center leading-none">*</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default React.memo(MarqueeBanner)
