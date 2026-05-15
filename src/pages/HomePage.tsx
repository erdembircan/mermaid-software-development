import { useSearchParams } from 'react-router-dom'
import { charts } from '../data/charts'
import type { Category } from '../lib/categories'
import ChartCard from '../components/ChartCard'
import CategoryFilter from '../components/CategoryFilter'

export default function HomePage() {
  const [params] = useSearchParams()
  const activeCategory = params.get('category') as Category | null

  const visible = activeCategory
    ? charts.filter((c) => c.category === activeCategory)
    : charts

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20">
          {/* Editorial marker */}
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
            <a
              href="#charts"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] no-underline"
            >
              Browse all charts
              <span aria-hidden="true">↓</span>
            </a>
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

        {/* Decorative grid line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)' }}
          aria-hidden="true"
        />
      </section>

      {/* Charts section */}
      <section id="charts" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="text-2xl font-bold text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {activeCategory ? `${visible.length} chart${visible.length !== 1 ? 's' : ''}` : `All ${charts.length} diagrams`}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Click any card to see a rendered example, source code, and use cases.
            </p>
          </div>
          <CategoryFilter />
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] py-24 text-center">
            <p className="text-[var(--color-muted)]">No charts in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((chart, i) => (
              <ChartCard key={chart.id} chart={chart} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
