import type { UseCase } from '../data/types'

type Props = {
  useCase: UseCase
  index: number
}

export default function UseCaseCard({ useCase, index }: Props) {
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
          {useCase.title}
        </h3>
      </div>
      <p className="pl-8 text-sm leading-relaxed text-[var(--color-muted)]">{useCase.body}</p>
    </article>
  )
}
