'use client'

import React from 'react'
import Image from 'next/image'

// === BUSINESS LOGIC ===
// (none — pure static display)

// === UI ===
function Footer() {
  return (
    <footer className="bg-primary py-12 px-16 flex flex-col gap-12 mobile:py-8 mobile:px-5 mobile:gap-7">
      <div className="flex items-start gap-0 mobile:flex-wrap mobile:gap-7">
        <div className="flex-none min-w-[200px] mr-12 mobile:min-w-0 mobile:mr-0 mobile:flex-auto">
          <div className="font-ppe text-[36px] text-bg mb-5 leading-[1.2] mobile:mb-3">Bogʻlanish</div>
          <div className="font-sf text-[24px] text-bg mb-2">Telefon</div>
          <div className="font-sf text-[24px] text-bg">Email</div>
        </div>

        <div className="flex-none min-w-[220px] mr-16 mobile:min-w-0 mobile:mr-0 mobile:flex-auto">
          <div className="font-ppe text-[36px] text-bg mb-5 leading-[1.2] mobile:mb-3">Boʻlimlar</div>
          <div className="font-sf text-[24px] text-bg mb-2">Chizmachilik</div>
          <div className="font-sf text-[24px] text-bg">Dizayn</div>
        </div>

        <div className="flex-none max-w-[420px] mobile:max-w-full mobile:mt-8">
          <div className="mb-4">
            <Image src="/logo-white.svg" alt="Chizlab" width={192} height={45} />
          </div>
          <div className="font-sf text-[24px] text-bg leading-[1.4]">
            Chizmachilik va dizayn sohasidagi<br />Oʻzbekistondagi ilk sayt
          </div>
        </div>
      </div>

      <div className="flex justify-end mobile:justify-center">
        <div className="flex items-baseline gap-4">
          <Image className="w-[65px] h-[65px] mobile:w-9 mobile:h-9" src="/copyright.svg" alt="©" width={65} height={65} />
          <span className="font-ppe text-[106px] text-bg whitespace-nowrap mobile:text-[48px]">
            2025 Chizlab
          </span>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
