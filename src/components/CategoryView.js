'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import MaterialCard from './MaterialCard'
import { LANG_LABELS, TYPE_LABELS } from '@/lib/labels'

const PAGE_SIZE = 8

const SORT_OPTIONS = [
  { value: 'new', label: 'Yangi' },
  { value: 'old', label: 'Eski' },
  { value: 'az', label: 'A–Z' },
]

function labelFor(map, value) {
  return map[value] ?? value
}

/** Ma'lumotda mavjud noyob qiymatlar (bo'shlarni tashlab) */
function uniqueValues(materials, key) {
  const seen = new Set()
  for (const m of materials) {
    const v = m[key]
    if (v !== null && v !== undefined && v !== '') seen.add(v)
  }
  return [...seen]
}

function norm(value) {
  return (value ?? '').toString().toLowerCase()
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
 * Mockupdagi {Yorliq} ko'rinishidagi filtr chipi. Bosilganda pastida
 * brendga mos ochiladigan ro'yxat chiqadi; qiymat tanlansa chip matni
 * o'sha qiymatga almashadi: {Material turi} → {Darslik}.
 * `prompt` — menyu tepasida turadigan yo'riqnoma ("Yilini tanlang").
 * Variantlar bo'sh bo'lsa (hali ma'lumot yo'q) "Tez kunda" ko'rsatiladi.
 */
function FilterChip({ label, prompt, value, defaultValue = '', options, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === value)
  const changed = value !== defaultValue
  const display = changed && current ? current.label : label

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`py-1 font-sf text-[16px] transition-colors bp-lg:text-[15px] bp-md:text-[15px] bp-sm:text-[14px] bp-xs:text-[13px]
          ${changed ? 'font-medium text-primary' : 'text-primary/70 hover:text-primary'}`}
      >
        {'{'}
        {display}
        {'}'}
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-1/2 top-full z-50 mt-1.5 min-w-[180px] -translate-x-1/2 rounded-lg border border-primary/10 bg-bg py-1.5 shadow-[0_14px_40px_rgba(0,56,55,0.16)]"
        >
          {prompt && (
            <p className="mb-1 border-b border-primary/10 px-4 pb-2 pt-0.5 font-sf text-[13px] text-primary/45">
              {prompt}
            </p>
          )}
          {options.length === 0 ? (
            <p className="px-4 py-2 font-sf text-[14px] text-primary/40">Tez kunda</p>
          ) : (
            options.map((opt) => {
              const selected = opt.value === value
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelect(opt.value)
                    setOpen(false)
                  }}
                  className={`block w-full px-4 py-2 text-left font-sf text-[15px] transition-colors hover:bg-primary/5
                    ${selected ? 'font-medium text-primary' : 'text-primary/75'}`}
                >
                  {opt.label}
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default function CategoryView({ categoryName, categorySlug, materials }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  // Daraja: materialda hozircha mos maydon yo'q — chip mockupga muvofiq
  // turadi, menyusi "Tez kunda" ko'rsatadi.
  const [daraja, setDaraja] = useState('')
  const [lang, setLang] = useState('')
  const [year, setYear] = useState('')
  const [sort, setSort] = useState('new')
  const [page, setPage] = useState(0)

  const typeOptions = useMemo(
    () => [
      { value: '', label: 'Barchasi' },
      ...uniqueValues(materials, 'materialType')
        .map((v) => ({ value: v, label: labelFor(TYPE_LABELS, v) }))
        .sort((a, b) => a.label.localeCompare(b.label, 'uz')),
    ],
    [materials],
  )

  const langOptions = useMemo(
    () => [
      { value: '', label: 'Barchasi' },
      ...uniqueValues(materials, 'language')
        .map((v) => ({ value: v, label: labelFor(LANG_LABELS, v) }))
        .sort((a, b) => a.label.localeCompare(b.label, 'uz')),
    ],
    [materials],
  )

  const yearOptions = useMemo(
    () => [
      { value: '', label: 'Barchasi' },
      ...uniqueValues(materials, 'publishYear')
        .sort((a, b) => b - a)
        .map((v) => ({ value: String(v), label: String(v) })),
    ],
    [materials],
  )

  const filtered = useMemo(() => {
    const q = norm(search).trim()
    let result = materials.filter((m) => {
      if (type && m.materialType !== type) return false
      if (lang && m.language !== lang) return false
      if (year && String(m.publishYear) !== year) return false
      if (q) {
        const haystack = `${norm(m.title)} ${norm((m.authors || []).join(' '))}`
        if (!haystack.includes(q)) return false
      }
      return true
    })

    result = [...result].sort((a, b) => {
      if (sort === 'az') return (a.title ?? '').localeCompare(b.title ?? '', 'uz')
      const ya = a.publishYear ?? 0
      const yb = b.publishYear ?? 0
      return sort === 'old' ? ya - yb : yb - ya
    })

    return result
  }, [materials, search, type, lang, year, sort])

  // Filtr o'zgarsa birinchi sahifaga qaytamiz
  useEffect(() => {
    setPage(0)
  }, [search, type, lang, year, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  const hasActiveFilter = Boolean(search) || type !== '' || lang !== '' || year !== '' || sort !== 'new'

  const clearAll = () => {
    setSearch('')
    setType('')
    setLang('')
    setYear('')
    setSort('new')
  }

  return (
    <main className="min-h-screen bg-bg">
      <header
        className="flex items-center justify-between px-10 py-8
          bp-lg:px-8 bp-lg:py-6 bp-md:px-6 bp-md:py-5 bp-sm:px-5 bp-sm:py-4 bp-xs:px-4 bp-xs:py-3"
      >
        <Link href="/" aria-label="Chizlab">
          <Image
            src="/logo.svg"
            alt="Chizlab"
            width={160}
            height={37}
            priority
            className="bp-lg:w-[144px] bp-lg:h-auto bp-md:w-[132px] bp-sm:w-[120px] bp-xs:w-[108px]"
          />
        </Link>
        <Link
          href="/"
          className="font-sf text-[16px] text-primary hover:opacity-70 transition-opacity bp-sm:text-[14px] bp-xs:text-[13px]"
        >
          Bosh sahifa
        </Link>
      </header>

      <section
        className="px-10 pb-24 bp-lg:px-8 bp-lg:pb-20 bp-md:px-6 bp-md:pb-16 bp-sm:px-5 bp-sm:pb-12 bp-xs:px-4 bp-xs:pb-10"
      >
        <h1
          className="font-ppe text-[64px] font-normal text-primary leading-none mb-8
            bp-lg:text-[52px] bp-lg:mb-7 bp-md:text-[42px] bp-md:mb-6 bp-sm:text-[34px] bp-sm:mb-5 bp-xs:text-[27px] bp-xs:mb-4"
        >
          {categoryName}
        </h1>

        {/* Qidiruv — filtrlar ustida */}
        <label
          className="mb-6 flex w-[320px] max-w-full items-center gap-2.5 rounded-[5px] border border-primary/25 px-3.5 py-2.5 text-primary
            transition-colors focus-within:border-primary/55 bp-sm:w-full bp-xs:mb-5"
        >
          <SearchIcon />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Qidiramiz"
            aria-label="Qidiruv"
            className="w-full bg-transparent font-sf text-[15px] text-primary placeholder:text-primary/45 focus:outline-none
              [&::-webkit-search-cancel-button]:appearance-none bp-xs:text-[14px]"
          />
        </label>

        {/* {filtr} chiplari — qidiruv ostida, chapga tekislangan */}
        <div className="mb-10 flex flex-wrap items-center gap-x-9 gap-y-1 bp-lg:gap-x-7 bp-md:gap-x-6 bp-sm:gap-x-5 bp-xs:gap-x-4 bp-xs:mb-8">
          <FilterChip label="Material turi" prompt="Turini tanlang" value={type} options={typeOptions} onSelect={setType} />
          <FilterChip label="Daraja" prompt="Darajani tanlang" value={daraja} options={[]} onSelect={setDaraja} />
          <FilterChip label="Saralash" prompt="Saralashni tanlang" value={sort} defaultValue="new" options={SORT_OPTIONS} onSelect={setSort} />
          <FilterChip label="Yil" prompt="Yilini tanlang" value={year} options={yearOptions} onSelect={setYear} />
          <FilterChip label="Til" prompt="Tilini tanlang" value={lang} options={langOptions} onSelect={setLang} />
          <button
            type="button"
            onClick={clearAll}
            title="Barcha filtrlarni tozalash"
            className={`py-1 font-sf text-[16px] transition-colors bp-lg:text-[15px] bp-sm:text-[14px] bp-xs:text-[13px]
              ${hasActiveFilter ? 'font-medium text-primary hover:opacity-70' : 'text-primary/70 hover:text-primary'}`}
          >
            {'{'}Tozalash{'}'}
          </button>
        </div>

        {materials.length === 0 ? (
          <p className="font-sf text-[18px] text-primary/60 bp-sm:text-[16px] bp-xs:text-[15px]">
            Hozircha bu bo&apos;limda materiallar yo&apos;q.
          </p>
        ) : visible.length === 0 ? (
          <p className="font-sf text-[18px] text-primary/60 bp-sm:text-[16px] bp-xs:text-[15px]">
            Tanlangan filtrlar bo&apos;yicha material topilmadi.
          </p>
        ) : (
          <div
            className="grid grid-cols-4 gap-x-8 gap-y-14
              bp-lg:grid-cols-3 bp-lg:gap-x-6 bp-lg:gap-y-12
              bp-md:grid-cols-3 bp-md:gap-x-5 bp-md:gap-y-10
              bp-sm:grid-cols-2 bp-sm:gap-x-4 bp-sm:gap-y-9
              bp-xs:grid-cols-2 bp-xs:gap-x-3 bp-xs:gap-y-7"
          >
            {visible.map((material) => (
              <MaterialCard key={material.id} material={material} categorySlug={categorySlug} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}-sahifa`}
                aria-current={i === safePage ? 'page' : undefined}
                onClick={() => setPage(i)}
                className={`h-2.5 w-2.5 rounded-full border transition-colors
                  ${i === safePage ? 'border-primary bg-primary' : 'border-primary/35 hover:border-primary/70'}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
