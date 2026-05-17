import { useParams, Link, useLocation } from 'react-router-dom'
import { getChartById, getAdjacentCharts } from '../data/charts'
import { CATEGORIES } from '../lib/categories'
import DiagramViewer from '../components/DiagramViewer'
import CodeBlock from '../components/CodeBlock'
import UseCaseCard from '../components/UseCaseCard'
import PrevNextNav from '../components/PrevNextNav'

const CATEGORY_STYLE: Record<string, { bg: string; text: string }> = {
  flow: { bg: 'var(--color-cat-flow)', text: 'var(--color-cat-flow-text)' },
  architecture: { bg: 'var(--color-cat-arch)', text: 'var(--color-cat-arch-text)' },
  behavior: { bg: 'var(--color-cat-behavior)', text: 'var(--color-cat-behavior-text)' },
  data: { bg: 'var(--color-cat-data)', text: 'var(--color-cat-data-text)' },
  planning: { bg: 'var(--color-cat-planning)', text: 'var(--color-cat-planning-text)' },
}

export default function ChartDetailPage() {
  const { chartId } = useParams<{ chartId: string }>()
  const { state } = useLocation()
  const highlight: string = (state as { highlight?: string } | null)?.highlight ?? ''
  const chart = chartId ? getChartById(chartId) : undefined
  const { prev, next } = chartId ? getAdjacentCharts(chartId) : { prev: null, next: null }

  if (!chart) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p
          className="text-5xl font-bold text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </p>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          No chart found with id <code className="rounded bg-[var(--color-border)] px-2 py-0.5 text-sm">{chartId}</code>.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] no-underline"
        >
          ← Back to all charts
        </Link>
      </div>
    )
  }

  const catStyle = CATEGORY_STYLE[chart.category]
  const catLabel = CATEGORIES[chart.category].label

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link to="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors no-underline">
          ← All charts
        </Link>
      </nav>

      {/* Hero */}
      <header className="mb-16">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
          >
            {catLabel}
          </span>
          <a
            href={chart.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors no-underline"
          >
            Official docs ↗
          </a>
        </div>
        <h1
          className="text-5xl font-bold leading-tight text-[var(--color-ink)] sm:text-6xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {chart.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {chart.description}
        </p>
      </header>

      {/* Diagram + Code split */}
      <section aria-labelledby="section-example" className="mb-20">
        <h2
          id="section-example"
          className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]"
        >
          <span className="text-[var(--color-accent)]" aria-hidden="true" style={{ fontFamily: 'var(--font-mono)' }}>01 —</span>
          Example
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DiagramViewer source={chart.example} label={`${chart.name} example diagram`} />
          <CodeBlock code={chart.example} />
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="section-usecases">
        <h2
          id="section-usecases"
          className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]"
        >
          <span className="text-[var(--color-accent)]" aria-hidden="true" style={{ fontFamily: 'var(--font-mono)' }}>02 —</span>
          Use Cases in Software Development
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {chart.useCases.map((uc, i) => (
            <UseCaseCard key={uc.slug} useCase={uc} index={i} highlight={highlight} />
          ))}
        </div>
      </section>

      <PrevNextNav prev={prev} next={next} />
    </article>
  )
}
