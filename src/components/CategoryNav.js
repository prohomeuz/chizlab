'use client'

import Image from 'next/image'
import Link from 'next/link'
import { slugify } from '@/lib/slug'

const CATEGORIES = ['Chizmachilik', 'Dizayn']

function Naqsh() {
  return (
    <Image
      src="/naqsh.svg"
      alt=""
      width={15}
      height={15}
      className="shrink-0 opacity-50 bp-xs:h-3 bp-xs:w-3"
    />
  )
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 opacity-60">
      <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.7 13.7L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Kategoriya sahifasining yuqori paneli — mockup bo'yicha:
 * chapda naqsh bilan ajratilgan kategoriya linklari, markazda chegarali
 * qidiruv qutisi, o'ngda Saqlanganlar/Kirish.
 *
 * Saqlanganlar/Kirish hozircha "Tez kunda" — auth keyin ulanadi
 * (bosh sahifa Navbar ham xuddi shu naqshda).
 */
export default function CategoryNav({ search, onSearchChange, activeSlug }) {
  const soon = () => alert('Tez kunda!')

  return (
    <nav
      className="flex items-center gap-5 px-10 py-7
        bp-lg:px-8 bp-lg:py-6 bp-md:flex-wrap bp-md:px-6 bp-md:py-5
        bp-sm:flex-wrap bp-sm:px-5 bp-sm:py-4 bp-xs:flex-wrap bp-xs:px-4 bp-xs:py-3.5"
    >
      {/* Chap: logo (bosh sahifaga qaytish) + kategoriya linklari */}
      <div className="flex flex-1 items-center gap-2.5 font-sf text-[16px] bp-lg:text-[15px] bp-sm:text-[14px] bp-xs:text-[13px]">
        <Link href="/" aria-label="Bosh sahifa" className="mr-2 shrink-0 transition-opacity hover:opacity-70">
          <Image
            src="/logo.svg"
            alt="Chizlab"
            width={118}
            height={27}
            priority
            className="h-auto bp-sm:w-[104px] bp-xs:w-[94px]"
          />
        </Link>
        <Naqsh />
        {CATEGORIES.map((cat) => {
          const slug = slugify(cat)
          const active = slug === activeSlug
          return (
            <div key={cat} className="flex items-center gap-2.5">
              <Link
                href={`/materiallar/${slug}`}
                className={`transition-colors ${active ? 'text-primary' : 'text-primary/65 hover:text-primary'}`}
              >
                {cat}
              </Link>
              <Naqsh />
            </div>
          )
        })}
      </div>

      {/* Markaz: qidiruv */}
      <label
        className="flex w-[250px] items-center gap-2.5 rounded-[5px] border border-primary/25 px-3.5 py-2 text-primary
          transition-colors focus-within:border-primary/55
          bp-md:order-last bp-md:mt-2 bp-md:w-full bp-sm:order-last bp-sm:mt-2 bp-sm:w-full bp-xs:order-last bp-xs:mt-2 bp-xs:w-full"
      >
        <SearchIcon />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Qidiramiz"
          aria-label="Qidiruv"
          className="w-full bg-transparent font-sf text-[15px] text-primary placeholder:text-primary/45 focus:outline-none
            [&::-webkit-search-cancel-button]:appearance-none bp-xs:text-[14px]"
        />
      </label>

      {/* O'ng: Saqlanganlar + Kirish */}
      <div className="flex flex-1 items-center justify-end gap-2.5 font-sf text-[16px] bp-lg:text-[15px] bp-sm:text-[14px] bp-xs:text-[13px]">
        <Naqsh />
        <button type="button" onClick={soon} className="text-primary/65 transition-colors hover:text-primary">
          Saqlanganlar
        </button>
        <Naqsh />
        <button type="button" onClick={soon} className="text-primary transition-colors hover:opacity-70">
          Kirish
        </button>
        <Naqsh />
      </div>
    </nav>
  )
}
