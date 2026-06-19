'use client'

import React from 'react'
import Image from 'next/image'

// === BUSINESS LOGIC ===
// (none — click forwarded to indicatorClickRef by parent)

// === UI ===
function ScrollIndicator({ scrollIndicatorRef, indicatorClickRef }) {
  return (
    <div
      ref={scrollIndicatorRef}
      onClick={() => indicatorClickRef.current?.()}
      className="fixed bottom-12 right-12 z-[100] w-8 h-[76px] animate-scroll-bounce transition-[opacity,transform] duration-200 hover:opacity-60 hover:scale-[1.12] mobile:hidden"
    >
      <Image src="/scroll.svg" alt="" width={32} height={76} />
    </div>
  )
}

export default React.memo(ScrollIndicator)
