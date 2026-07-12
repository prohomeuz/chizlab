'use client'

import React from 'react'
import Image from 'next/image'
import AskAI from './AskAI'

// === BUSINESS LOGIC ===
// (none — pure static display)

// === UI ===
function Footer() {
  return (
    <footer
      className="bg-primary py-12 px-16 flex flex-col gap-12
        bp-lg:px-10 bp-md:px-8 bp-md:py-10 bp-md:gap-10 bp-sm:px-6 bp-sm:py-9 bp-sm:gap-8 bp-xs:px-5 bp-xs:py-8 bp-xs:gap-7
        mobile:py-8 mobile:px-5 mobile:gap-7"
    >
      <div className="flex items-start gap-0 bp-md:flex-wrap bp-md:gap-y-8 bp-sm:flex-wrap bp-sm:gap-y-7 bp-xs:flex-wrap bp-xs:gap-y-7 mobile:flex-wrap mobile:gap-7">
        <div className="flex-none min-w-[200px] mr-12 bp-md:mr-10 bp-sm:min-w-0 bp-sm:mr-8 bp-xs:min-w-0 bp-xs:mr-0 bp-xs:flex-auto mobile:min-w-0 mobile:mr-0 mobile:flex-auto">
          <div className="font-ppe text-[36px] text-bg mb-5 leading-[1.2] bp-lg:text-[32px] bp-md:text-[28px] bp-sm:text-[26px] bp-xs:text-[26px] bp-xs:mb-3 mobile:mb-3">Bogʻlanish</div>
          <a href="mailto:info@chizlab.uz" className="font-sf text-[24px] text-bg cursor-pointer hover:opacity-70 transition-opacity bp-lg:text-[21px] bp-md:text-[19px] bp-sm:text-[18px] bp-xs:text-[17px]">info@chizlab.uz</a>
        </div>

        <div className="flex-none min-w-[220px] mr-16 bp-md:mr-10 bp-sm:min-w-0 bp-sm:mr-8 bp-xs:min-w-0 bp-xs:mr-0 bp-xs:flex-auto mobile:min-w-0 mobile:mr-0 mobile:flex-auto">
          <div className="font-ppe text-[36px] text-bg mb-5 leading-[1.2] bp-lg:text-[32px] bp-md:text-[28px] bp-sm:text-[26px] bp-xs:text-[26px] bp-xs:mb-3 mobile:mb-3">Boʻlimlar</div>
          <div className="font-sf text-[24px] text-bg mb-2 cursor-pointer hover:opacity-70 transition-opacity bp-lg:text-[21px] bp-md:text-[19px] bp-sm:text-[18px] bp-xs:text-[17px]" onClick={() => alert('Tez kunda!')}>Chizmachilik</div>
          <div className="font-sf text-[24px] text-bg cursor-pointer hover:opacity-70 transition-opacity bp-lg:text-[21px] bp-md:text-[19px] bp-sm:text-[18px] bp-xs:text-[17px]" onClick={() => alert('Tez kunda!')}>Dizayn</div>
        </div>

        <div className="flex-none max-w-[420px] bp-md:max-w-[360px] bp-sm:max-w-full bp-sm:mt-2 bp-xs:max-w-full bp-xs:mt-4 mobile:max-w-full mobile:mt-8">
          <div className="mb-4">
            <Image src="/logo-white.svg" alt="Chizlab" width={192} height={45} className="bp-md:w-[168px] bp-md:h-auto bp-sm:w-[156px] bp-sm:h-auto bp-xs:w-[144px] bp-xs:h-auto" />
          </div>
          <div className="font-sf text-[24px] text-bg leading-[1.4] bp-lg:text-[21px] bp-md:text-[19px] bp-sm:text-[18px] bp-xs:text-[17px]">
            Chizmachilik va dizayn sohasidagi<br />Oʻzbekistondagi ilk sayt
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-8 bp-xs:flex-col bp-xs:items-center bp-xs:gap-8 mobile:flex-col mobile:items-center mobile:gap-8">
        <AskAI />
        <div className="flex items-baseline gap-4 bp-sm:gap-3 bp-xs:gap-2.5">
          <Image className="w-[65px] h-[65px] bp-lg:w-[54px] bp-lg:h-[54px] bp-md:w-[46px] bp-md:h-[46px] bp-sm:w-[38px] bp-sm:h-[38px] bp-xs:w-9 bp-xs:h-9 mobile:w-9 mobile:h-9" src="/copyright.svg" alt="©" width={65} height={65} />
          <span className="font-ppe text-[106px] text-bg whitespace-nowrap bp-lg:text-[88px] bp-md:text-[72px] bp-sm:text-[58px] bp-xs:text-[46px] mobile:text-[48px]">
            2025 Chizlab
          </span>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
