'use client'

import React from 'react'

// === BUSINESS LOGIC ===
// (none — cursor tracking handled by useSoundHint via ref)

// === UI ===
function SoundHint({ soundHintRef, visible }) {
  if (!visible) return null
  return (
    <div
      ref={soundHintRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center bg-[#0a0a0a] text-white font-inter text-[13px] font-medium tracking-[0.06em] py-[11px] px-[22px] rounded-full whitespace-nowrap select-none will-change-transform mobile:hidden"
    >
      [ bosing va sadoni yoqing ]
    </div>
  )
}

export default React.memo(SoundHint)
