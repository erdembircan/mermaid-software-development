import { Link } from 'react-router-dom'
import type { ChartEntry } from '../data/types'
import { CATEGORIES } from '../lib/categories'

type Props = {
  prev: ChartEntry | null
  next: ChartEntry | null
}

export default function PrevNextNav({ prev, next }: Props) {
  return (
    <nav
      aria-label="Chart navigation"
      className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div>
        {prev && (
          <Link
            to={`/charts/${prev.id}`}
            className="group flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-[var(--color-accent)] hover:shadow-sm no-underline"
          >
            <span className="mb-2 text-xs font-medium text-[var(--color-muted)]">← Previous</span>
            <span
              className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}
            >
              {prev.name}
            </span>
            <span className="mt-1 text-xs text-[var(--color-muted)]">
              {CATEGORIES[prev.category].label}
            </span>
          </Link>
        )}
      </div>
      <div className="flex justify-end">
        {next && (
          <Link
            to={`/charts/${next.id}`}
            className="group flex h-full w-full flex-col items-end rounded-xl border border-[var(--color-border)] bg-white p-5 text-right transition-all hover:border-[var(--color-accent)] hover:shadow-sm no-underline"
          >
            <span className="mb-2 text-xs font-medium text-[var(--color-muted)]">Next →</span>
            <span
              className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}
            >
              {next.name}
            </span>
            <span className="mt-1 text-xs text-[var(--color-muted)]">
              {CATEGORIES[next.category].label}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
