import type { ReactNode } from 'react'
import type { UseCase } from '../data/types'

type Props = {
  useCase: UseCase
  index: number
  highlight?: string
}

function highlightText(text: string, query: string): ReactNode {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(t => t.length >= 2)
  if (tokens.length === 0) return text
  const escaped = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    i % 2 === 1
      ? <mark key={i} className="bg-[var(--color-accent-wash)] text-[var(--color-accent)] rounded px-0.5 not-italic font-medium">{part}</mark>
      : part
  )
}

export default function UseCaseCard({ useCase, index, highlight = '' }: Props) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <article
      id={`use-case-${useCase.slug}`}
      className="group rounded-xl border border-[var(--color-border)] bg-white p-6 transition-all hover:border-[var(--color-accent)] hover:shadow-sm"
    >
      <div className="mb-3 flex items-start gap-4">
        <span
          className="shrink-0 select-none text-xs font-semibold text-[var(--color-muted)] tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', paddingTop: '0.15rem' }}
          aria-hidden="true"
        >
          {num}
        </span>
        <h3
          className="font-semibold text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-accent)] transition-colors"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}
        >
          {highlightText(useCase.title, highlight)}
        </h3>
      </div>
      <p className="pl-8 text-sm leading-relaxed text-[var(--color-muted)]">{highlightText(useCase.body, highlight)}</p>
    </article>
  )
}
