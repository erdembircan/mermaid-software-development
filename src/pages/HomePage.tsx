import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { charts } from '../data/charts'
import type { Category } from '../lib/categories'
import { CATEGORIES } from '../lib/categories'
import type { ChartEntry } from '../data/types'
import ChartCard from '../components/ChartCard'
import CategoryFilter from '../components/CategoryFilter'
import SearchInput, { SEARCH_MIN_LEN } from '../components/SearchInput'

type SearchGroup = { title: string; charts: ChartEntry[] }

function buildSearchGroups(q: string): SearchGroup[] {
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(t => t.length >= SEARCH_MIN_LEN)
  if (tokens.length === 0) return []
  const map = new Map<string, ChartEntry[]>()
  for (const chart of charts) {
    for (const uc of chart.useCases) {
      const hay = `${uc.title} ${uc.body}`.toLowerCase()
      if (tokens.some((t) => hay.includes(t))) {
        const existing = map.get(uc.title) ?? []
        map.set(uc.title, [...existing, chart])
      }
    }
  }
  return Array.from(map.entries()).map(([title, charts]) => ({ title, charts }))
}

function scrollToCharts() {
  document.getElementById('charts')?.scrollIntoView({ behavior: 'smooth' })
}

const CAT_COLOR: Record<string, string> = {
  flow: '#4ade80',
  architecture: '#60a5fa',
  behavior: '#fbbf24',
  data: '#f472b6',
  planning: '#a78bfa',
}
const CAT_BG: Record<string, string> = {
  flow: '#dcfce7', architecture: '#dbeafe', behavior: '#fef3c7',
  data: '#fce7f3', planning: '#ede9fe',
}
const CAT_TEXT: Record<string, string> = {
  flow: '#14532d', architecture: '#1e3a8a', behavior: '#78350f',
  data: '#831843', planning: '#3b0764',
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const [params] = useSearchParams()
  const activeCategory = params.get('category') as Category | null
  const navigate = useNavigate()

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    if (!value) {
      setDebouncedQuery('')
      setFocusedIndex(-1)
      return
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(value)
      setFocusedIndex(-1)
    }, 150)
  }

  const isSearching = debouncedQuery.trim().split(/\s+/).some(t => t.length >= SEARCH_MIN_LEN)
  const searchGroups = isSearching ? buildSearchGroups(debouncedQuery) : []

  const visible = activeCategory
    ? charts.filter((c) => c.category === activeCategory)
    : charts

  const flatResults = searchGroups.flatMap(g =>
    g.charts.map(c => ({ useCaseTitle: g.title, chart: c }))
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearching || flatResults.length === 0) {
      if (e.key === 'Escape') handleQueryChange('')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(focusedIndex + 1, flatResults.length - 1)
      setFocusedIndex(next)
      rowRefs.current[next]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.max(focusedIndex - 1, -1)
      setFocusedIndex(next)
      if (next >= 0) rowRefs.current[next]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (focusedIndex >= 0 && flatResults[focusedIndex]) {
        navigate(`/charts/${flatResults[focusedIndex].chart.id}`, { state: { highlight: debouncedQuery } })
        handleQueryChange('')
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleQueryChange('')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20">
          <p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            20 Diagram Types · Open Source · Free
          </p>

          <h1
            className="max-w-3xl text-6xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Every Mermaid diagram,
            <br />
            <em className="font-normal not-italic text-[var(--color-accent)]">placed in context.</em>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            A reference for software engineers — explore every chart type available in
            Mermaid.js with real examples and the software-development scenarios where
            each one belongs.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToCharts}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Browse all charts
              <span aria-hidden="true">↓</span>
            </button>
            <a
              href="https://mermaid.js.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] no-underline"
            >
              Mermaid docs ↗
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)' }}
          aria-hidden="true"
        />
      </section>

      {/* Charts section */}
      <section id="charts" className="mx-auto max-w-6xl px-6 py-16">

        {/* Search bar — always in this fixed position */}
        <div className="mb-8">
          <SearchInput ref={searchRef} value={query} onChange={handleQueryChange} onKeyDown={handleKeyDown} />
        </div>

        {/* Heading + filter row */}
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              {isSearching
                ? <><span className="text-[var(--color-muted)] font-normal text-xl" style={{ fontFamily: 'var(--font-mono)' }}>{flatResults.length} results</span></>
                : activeCategory ? `${visible.length} chart${visible.length !== 1 ? 's' : ''}` : `All ${charts.length} diagrams`}
            </h2>
            {!isSearching && <p className="mt-1 text-sm text-[var(--color-muted)]">Click any card to see a rendered example, source code, and use cases.</p>}
          </div>
          {!isSearching && <CategoryFilter />}
        </div>

        {/* Search results — minimal list */}
        {isSearching && (
          flatResults.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] py-24 text-center">
              <p className="text-[var(--color-muted)]">No use cases match.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
              {flatResults.map(({ useCaseTitle, chart }, i) => {
                const showDivider = i > 0 && flatResults[i - 1].useCaseTitle !== useCaseTitle
                return (
                  <div key={`${chart.id}-${useCaseTitle}`}>
                    {showDivider && <hr className="border-[var(--color-border)]" />}
                    <button
                      ref={(el) => { rowRefs.current[i] = el }}
                      type="button"
                      onClick={() => { navigate(`/charts/${chart.id}`, { state: { highlight: debouncedQuery } }); handleQueryChange('') }}
                      className={`group flex w-full items-center gap-3 pr-5 py-3.5 text-left transition-colors animate-fade-up ${focusedIndex === i ? 'bg-[var(--color-accent-wash)]' : 'hover:bg-[var(--color-accent-wash)]'}`}
                      style={{
                        animationDelay: `${i * 25}ms`,
                        borderLeft: `3px solid ${CAT_COLOR[chart.category] ?? 'var(--color-border)'}`,
                        paddingLeft: '1rem',
                      }}
                    >
                      {/* Use case title */}
                      <span className="flex-1 text-sm font-semibold text-[var(--color-ink)] truncate">
                        {useCaseTitle}
                      </span>
                      {/* Separator */}
                      <span className="text-[var(--color-border)] select-none text-xs shrink-0">·</span>
                      {/* Chart name */}
                      <span className="text-sm text-[var(--color-muted)] shrink-0 truncate max-w-[140px]">
                        {chart.name}
                      </span>
                      {/* Category badge */}
                      <span
                        className="shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: CAT_BG[chart.category], color: CAT_TEXT[chart.category] }}
                      >
                        {CATEGORIES[chart.category as keyof typeof CATEGORIES]?.label ?? chart.category}
                      </span>
                      {/* Arrow */}
                      <span className={`shrink-0 text-[var(--color-muted)] transition-opacity text-sm ${focusedIndex === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>→</span>
                    </button>
                  </div>
                )
              })}
            </div>
          )
        )}

        {/* Browse mode */}
        {!isSearching && (
          visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] py-24 text-center">
              <p className="text-[var(--color-muted)]">No charts in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((chart) => (
                <ChartCard key={chart.id} chart={chart} index={charts.indexOf(chart)} />
              ))}
            </div>
          )
        )}
      </section>
    </div>
  )
}
