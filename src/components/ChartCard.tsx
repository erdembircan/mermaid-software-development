import { memo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ChartEntry } from '../data/types'
import { CATEGORIES } from '../lib/categories'
import MermaidDiagram from './MermaidDiagram'

type Props = {
  chart: ChartEntry
  index: number
  hidden?: boolean
  filterKey: string
}

const CATEGORY_STYLE: Record<string, { bg: string; text: string }> = {
  flow: { bg: 'var(--color-cat-flow)', text: 'var(--color-cat-flow-text)' },
  architecture: { bg: 'var(--color-cat-arch)', text: 'var(--color-cat-arch-text)' },
  behavior: { bg: 'var(--color-cat-behavior)', text: 'var(--color-cat-behavior-text)' },
  data: { bg: 'var(--color-cat-data)', text: 'var(--color-cat-data-text)' },
  planning: { bg: 'var(--color-cat-planning)', text: 'var(--color-cat-planning-text)' },
}

export default memo(function ChartCard({ chart, index, hidden = false, filterKey }: Props) {
  const [initialDelay] = useState(index * 40)
  const [useStagger, setUseStagger] = useState(true)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const prevFilterKey = useRef(filterKey)

  useEffect(() => {
    const timer = setTimeout(() => setUseStagger(false), initialDelay + 500)
    return () => clearTimeout(timer)
  }, [initialDelay])

  useEffect(() => {
    if (prevFilterKey.current !== filterKey && !hidden && linkRef.current) {
      const el = linkRef.current
      el.style.display = 'none'
      void el.offsetWidth
      el.style.display = ''
    }
    prevFilterKey.current = filterKey
  }, [filterKey, hidden])

  const catStyle = CATEGORY_STYLE[chart.category]
  const catLabel = CATEGORIES[chart.category].label

  return (
    <Link
      ref={linkRef}
      to={`/charts/${chart.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white no-underline transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg animate-fade-up"
      style={{ animationDelay: useStagger ? `${initialDelay}ms` : '0ms', display: hidden ? 'none' : undefined }}
      aria-label={`${chart.name}: ${chart.tagline}`}
    >
      {/* Mini diagram preview */}
      <div className="flex h-[200px] items-center justify-center overflow-hidden bg-[var(--color-bg)] p-4">
        <MermaidDiagram
          source={chart.example}
          label={`${chart.name} preview`}
          className="pointer-events-none max-h-[160px] w-full scale-90 overflow-hidden transition-transform group-hover:scale-95"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between border-t border-[var(--color-border)] p-5">
        <div>
          <div className="mb-3">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
            >
              {catLabel}
            </span>
          </div>
          <h2
            className="font-bold text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
          >
            {chart.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] line-clamp-2">
            {chart.tagline}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-[var(--color-muted)]">
            {chart.useCases.length} use cases
          </span>
          <span className="text-xs font-medium text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
})
