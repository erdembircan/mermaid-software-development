import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/categories'
import { charts } from '../data/charts'
import type { Category } from '../lib/categories'

const FAMILY_ICONS: Record<Category, string> = {
  flow: '⟶',
  architecture: '⬡',
  behavior: '◎',
  data: '▣',
  planning: '◈',
}

export default function AboutPage() {
  const byCategory = Object.entries(CATEGORIES) as [Category, { label: string; description: string }][]

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Hero */}
      <header className="mb-20">
        <p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Diagrams as Code
        </p>
        <h1
          className="text-5xl font-bold leading-tight text-[var(--color-ink)] sm:text-6xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Why Mermaid belongs
          <br />
          <em className="font-normal not-italic text-[var(--color-accent)]">in your repository.</em>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          Mermaid is an open-source diagramming language that renders directly from text.
          Because diagrams live next to the code they describe, they age with the codebase
          instead of rotting in a slide deck.
        </p>
      </header>

      {/* Why section */}
      <section className="mb-20">
        <h2
          className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]"
        >
          <span className="text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>01 —</span>
          Why diagrams-as-code
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              title: 'Version-controlled',
              body: 'A Mermaid diagram in a Markdown file is a diff. You can review changes, revert mistakes, and trace who changed what and why — the same as any other code.',
            },
            {
              title: 'PR-reviewable',
              body: 'Team members can comment on a diagram in a pull request. Architectural decisions become collaborative, documented, and linked to the code they influenced.',
            },
            {
              title: 'Rendered everywhere',
              body: 'GitHub, GitLab, Notion, Confluence, and VS Code all render Mermaid natively. Write once, read everywhere — no export, no PNG drift.',
            },
            {
              title: 'Always up to date',
              body: 'Because the diagram lives in the same repo as the code, the PR that changes the code can update the diagram. The source of truth stays coherent.',
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--color-border)] bg-white p-6"
            >
              <h3
                className="mb-2 font-semibold text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart families */}
      <section className="mb-20">
        <h2
          className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]"
        >
          <span className="text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>02 —</span>
          The five diagram families
        </h2>
        <div className="space-y-4">
          {byCategory.map(([key, { label, description }]) => {
            const familyCharts = charts.filter((c) => c.category === key)
            return (
              <div
                key={key}
                className="flex gap-6 rounded-xl border border-[var(--color-border)] bg-white p-6"
              >
                <span
                  className="shrink-0 pt-0.5 text-2xl text-[var(--color-accent)]"
                  aria-hidden="true"
                >
                  {FAMILY_ICONS[key]}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className="font-semibold text-[var(--color-ink)]"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}
                    >
                      {label}
                    </h3>
                    <span className="text-xs text-[var(--color-muted)]">
                      {familyCharts.length} diagram{familyCharts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {familyCharts.map((c) => (
                      <Link
                        key={c.id}
                        to={`/charts/${c.id}`}
                        className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] no-underline"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-[var(--color-accent)] bg-[var(--color-accent-wash)] p-10 text-center">
        <h2
          className="text-2xl font-bold text-[var(--color-accent-text)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Ready to explore?
        </h2>
        <p className="mt-3 text-sm text-[var(--color-accent-text)] opacity-75">
          Browse all 20 diagram types, see real examples, and find the right one for your next PR.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] no-underline"
        >
          Browse all charts →
        </Link>
      </section>
    </div>
  )
}
