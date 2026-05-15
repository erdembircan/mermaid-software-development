import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p
        className="text-8xl font-bold text-[var(--color-border)]"
        style={{ fontFamily: 'var(--font-display)' }}
        aria-hidden="true"
      >
        404
      </p>
      <h1
        className="mt-6 text-3xl font-bold text-[var(--color-ink)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Page not found
      </h1>
      <p className="mt-4 text-[var(--color-muted)]">
        This page doesn't exist. Maybe you were looking for a diagram?
      </p>
      <Link
        to="/"
        className="mt-10 inline-block rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] no-underline"
      >
        ← Back to all charts
      </Link>
    </div>
  )
}
