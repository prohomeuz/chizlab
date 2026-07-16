'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { slugify } from '@/lib/slug'
import MaterialCard from '@/components/MaterialCard'

const MATERIAL_TYPE_LABELS = {
  textbook: 'Darslik',
  textbook_electronic: 'Elektron darslik',
  thesis: 'Dissertatsiya',
  article: 'Maqola',
  monograph: 'Monografiya',
  presentation: 'Taqdimot',
}

const SORTS = [
  { key: 'new', label: 'Avval yangi' },
  { key: 'old', label: 'Avval eski' },
  { key: 'az', label: 'Nomi (A–Z)' },
]

const PAGE_SIZE = 8

const NAV = [
  { label: 'Chizmachilik', href: `/materiallar/${slugify('Chizmachilik')}` },
  { label: 'Dizayn', href: `/materiallar/${slugify('Dizayn')}` },
]

function Naqsh({ size = 18 }) {
  return <Image src="/naqsh.svg" alt="" width={size} height={size} className="opacity-60 shrink-0" aria-hidden="true" />
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Yorug‘ rejim' : 'Qorong‘i rejim'}
      data-cursor-hover=""
      className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors shrink-0"
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}

// Generic dropdown filter. `options` = [{value, label}]. value '' means "all".
function FilterDropdown({ label, options, value, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const active = options.find((o) => o.value === value)
  const display = active && active.value !== '' ? active.label : label

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        data-cursor-hover=""
        className={`font-sf text-[16px] transition-colors bp-lg:text-[14px] ${
          value ? 'text-primary font-medium' : 'text-primary/85 hover:text-primary'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {'{'}{display}{'}'}
      </button>
      {open && !disabled && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-30 min-w-[170px] bg-bg border border-primary/25 rounded-md py-1.5 shadow-lg">
          {options.map((o) => (
            <button
              key={o.value || 'all'}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false) }}
              className={`block w-full text-left px-4 py-2 font-sf text-[15px] hover:bg-primary/10 transition-colors ${
                o.value === value ? 'text-primary font-medium' : 'text-primary/80'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function uniqueOptions(materials, field, labelFn = (v) => v) {
  const vals = [...new Set(materials.map((m) => m[field]).filter((v) => v != null && v !== ''))]
  return vals.map((v) => ({ value: String(v), label: labelFn(v) }))
}

export default function CatalogShell({ materials, categorySlug, children }) {
  const [theme, setTheme] = useState('light')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [level, setLevel] = useState('')
  const [sort, setSort] = useState('new')
  const [year, setYear] = useState('')
  const [lang, setLang] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('chizlab-theme') : null
    if (saved === 'dark' || saved === 'light') setTheme(saved)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem('chizlab-theme', next) } catch {}
      return next
    })
  }

  const browse = Array.isArray(materials)
  const list = materials ?? []

  const typeOptions = useMemo(
    () => [{ value: '', label: 'Material turi' }, ...uniqueOptions(list, 'materialType', (v) => MATERIAL_TYPE_LABELS[v] ?? v)],
    [list],
  )
  const levelOptions = useMemo(
    () => [{ value: '', label: 'Daraja' }, ...uniqueOptions(list, 'level')],
    [list],
  )
  const yearOptions = useMemo(
    () => [{ value: '', label: 'Yil' }, ...uniqueOptions(list, 'publishYear').sort((a, b) => Number(b.value) - Number(a.value))],
    [list],
  )
  const langOptions = useMemo(
    () => [{ value: '', label: 'Til' }, ...uniqueOptions(list, 'language')],
    [list],
  )

  const filtered = useMemo(() => {
    if (!browse) return []
    const q = search.trim().toLowerCase()
    let out = list.filter((m) => {
      if (type && String(m.materialType) !== type) return false
      if (level && String(m.level) !== level) return false
      if (year && String(m.publishYear) !== year) return false
      if (lang && String(m.language) !== lang) return false
      if (q) {
        const hay = [
          m.title,
          ...(m.authors ?? []),
          ...(m.tags ?? []),
          m.materialType,
          MATERIAL_TYPE_LABELS[m.materialType],
          m.language,
          m.publishYear,
          m.country,
          m.level,
          m.pageCount,
          m.blurb,
          m.publisher,
          m.description,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        // Match every whitespace-separated term (order-independent).
        if (!q.split(/\s+/).every((term) => hay.includes(term))) return false
      }
      return true
    })
    out = [...out].sort((a, b) => {
      if (sort === 'az') return (a.title ?? '').localeCompare(b.title ?? '')
      const ya = Number(a.publishYear) || 0
      const yb = Number(b.publishYear) || 0
      return sort === 'old' ? ya - yb : yb - ya
    })
    return out
  }, [browse, list, search, type, level, year, lang, sort])

  // Reset to first page whenever the filtered set changes.
  useEffect(() => { setPage(0) }, [search, type, level, year, lang, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const hasAnyFilter = search || type || level || year || lang

  const resetFilters = () => {
    setSearch(''); setType(''); setLevel(''); setYear(''); setLang(''); setSort('new')
  }

  // AI suggestion shown when a search/filter returns nothing.
  const suggestion = list[0]

  return (
    <div data-theme={theme} className="bg-bg min-h-screen text-primary">
      <header className="px-10 pt-9 pb-2 bp-lg:px-8 bp-md:px-6 bp-sm:px-5 bp-xs:px-4 bp-sm:pt-6 bp-xs:pt-5">
        {/* Desktop header row */}
        <div className="flex bp-md:hidden bp-sm:hidden bp-xs:hidden items-center justify-between gap-6">
          <nav className="flex items-center gap-3">
            <Link href="/" aria-label="Chizlab — bosh sahifa" data-cursor-hover="" className="shrink-0 mr-1">
              <Image src="/logo.svg" alt="Chizlab" width={140} height={32} priority className="bp-lg:w-[120px] bp-lg:h-auto" />
            </Link>
            <Naqsh />
            {NAV.map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <Link href={item.href} data-cursor-hover="" className="font-sf text-[17px] text-primary hover:opacity-70 transition-opacity px-2 bp-lg:text-[15px]">
                  {item.label}
                </Link>
                <Naqsh />
              </div>
            ))}
          </nav>

          <form onSubmit={(e) => e.preventDefault()} className="flex-1 max-w-[420px]">
            <label className="flex items-center gap-2.5 border border-primary/40 rounded-md px-4 py-2.5 bg-transparent focus-within:border-primary transition-colors">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-primary shrink-0" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Qidiramiz"
                className="w-full bg-transparent font-sf text-[16px] text-primary placeholder:text-primary/50 outline-none"
              />
            </label>
          </form>

          <div className="flex items-center gap-1">
            <Naqsh />
            <a href="#" onClick={(e) => e.preventDefault()} data-cursor-hover="" className="font-sf text-[17px] text-primary hover:opacity-70 transition-opacity px-2 bp-lg:text-[15px]">Saqlanganlar</a>
            <Naqsh />
            <a href="#" onClick={(e) => e.preventDefault()} data-cursor-hover="" className="font-sf text-[17px] text-primary hover:opacity-70 transition-opacity px-2 bp-lg:text-[15px]">Kirish</a>
            <Naqsh />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Desktop filter row */}
        {browse && (
          <div className="flex bp-md:hidden bp-sm:hidden bp-xs:hidden items-center justify-center gap-8 mt-5 bp-lg:gap-6">
            <FilterDropdown label="Material turi" options={typeOptions} value={type} onChange={setType} />
            <FilterDropdown label="Daraja" options={levelOptions} value={level} onChange={setLevel} disabled={levelOptions.length <= 1} />
            <FilterDropdown label="Saralash" options={SORTS.map((s) => ({ value: s.key, label: s.label }))} value={sort} onChange={setSort} />
            <FilterDropdown label="Yil" options={yearOptions} value={year} onChange={setYear} />
            <FilterDropdown label="Til" options={langOptions} value={lang} onChange={setLang} />
            <button
              type="button"
              onClick={resetFilters}
              data-cursor-hover=""
              className={`font-sf text-[16px] transition-colors bp-lg:text-[14px] ${hasAnyFilter ? 'text-primary font-medium hover:opacity-70' : 'text-primary/85 hover:text-primary'}`}
            >
              {hasAnyFilter ? '{Tozalash}' : '{Filterlar}'}
            </button>
          </div>
        )}

        {/* Mobile header */}
        <div className="hidden bp-md:block bp-sm:block bp-xs:block">
          <div className="flex justify-center mb-4">
            <Link href="/" aria-label="Chizlab — bosh sahifa">
              <Image src="/logo.svg" alt="Chizlab" width={130} height={30} priority />
            </Link>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="flex items-center justify-center gap-2.5 border border-primary/40 rounded-md px-4 py-3.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-primary shrink-0" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Qidiramiz"
                className="w-full bg-transparent font-sf text-[19px] text-primary placeholder:text-primary/60 outline-none text-center"
              />
            </label>
          </form>
          <div className="flex items-center justify-center gap-8 mt-4">
            <button type="button" onClick={() => setMobileOpen((v) => !v)} className="font-sf text-[19px] text-primary">{'{Menyu}'}</button>
            {browse && (
              <button type="button" onClick={() => setShowFilters((v) => !v)} className="font-sf text-[19px] text-primary">{'{Filter}'}</button>
            )}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          {mobileOpen && (
            <div className="flex flex-col items-center gap-3 mt-4">
              {NAV.map((item) => (
                <Link key={item.label} href={item.href} className="font-sf text-[18px] text-primary" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          {browse && showFilters && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-4">
              <FilterDropdown label="Material turi" options={typeOptions} value={type} onChange={setType} />
              <FilterDropdown label="Daraja" options={levelOptions} value={level} onChange={setLevel} disabled={levelOptions.length <= 1} />
              <FilterDropdown label="Saralash" options={SORTS.map((s) => ({ value: s.key, label: s.label }))} value={sort} onChange={setSort} />
              <FilterDropdown label="Yil" options={yearOptions} value={year} onChange={setYear} />
              <FilterDropdown label="Til" options={langOptions} value={lang} onChange={setLang} />
              <button type="button" onClick={resetFilters} className="font-sf text-[16px] text-primary">{hasAnyFilter ? '{Tozalash}' : '{Filterlar}'}</button>
            </div>
          )}
        </div>
      </header>

      {/* Browse mode: functional grid + search/filters. Plain mode: render children (detail page). */}
      {browse ? (
        <section className="px-10 pt-6 pb-16 bp-lg:px-8 bp-md:px-6 bp-sm:px-5 bp-xs:px-4 bp-sm:pt-5 bp-xs:pt-4">
          {filtered.length === 0 ? (
            <div className="max-w-[640px] mx-auto text-center py-8">
              <p className="font-ppe text-[34px] leading-[1.2] text-primary mb-3 bp-sm:text-[26px] bp-xs:text-[22px]">
                Topilmadimi? AI yordam beradi.
              </p>
              <p className="font-sf text-[16px] text-primary/60 mb-8 bp-xs:text-[14px]">
                “{search || 'so‘rov'}” bo‘yicha aniq moslik topilmadi — mana AI tavsiyasi:
              </p>
              {suggestion && (
                <div className="max-w-[300px] mx-auto">
                  <MaterialCard material={{ ...suggestion, isNew: true }} categorySlug={categorySlug} />
                </div>
              )}
              {hasAnyFilter && (
                <button type="button" onClick={resetFilters} className="mt-8 inline-block font-sf text-[15px] bg-primary text-bg px-7 py-3 hover:opacity-85 transition-opacity">
                  Barcha materiallar
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 bp-md:grid-cols-3 bp-md:gap-3.5 bp-sm:grid-cols-2 bp-sm:gap-3.5 bp-xs:grid-cols-2 bp-xs:gap-3.5">
                {pageItems.map((material) => (
                  <MaterialCard key={material.id} material={material} categorySlug={categorySlug} />
                ))}
              </div>

              {pageCount > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      aria-label={`${i + 1}-sahifa`}
                      data-cursor-hover=""
                      className={`w-3.5 h-3.5 rounded-full border border-primary/50 transition-colors ${i === page ? 'bg-primary/70' : 'hover:bg-primary/20'}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        children
      )}
    </div>
  )
}
