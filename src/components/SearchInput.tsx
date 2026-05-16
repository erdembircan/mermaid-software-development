import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SEARCH_MIN_LEN = 2
export const SEARCH_MAX_LEN = 50
export const SEARCH_DEBOUNCE_MS = 150

export default function SearchInput() {
  const [params, setParams] = useSearchParams()
  const [value, setValue] = useState(() => params.get('q') ?? '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = value.trim()
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (trimmed.length >= SEARCH_MIN_LEN) {
            next.set('q', trimmed)
            next.delete('category')
          } else {
            next.delete('q')
          }
          return next
        },
        { replace: true }
      )
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [value, setParams])

  return (
    <div className="relative flex items-center">
      <svg
        className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--color-muted)]"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m15 15 3 3" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={SEARCH_MAX_LEN}
        placeholder="Search use cases…"
        aria-label="Search use cases"
        className="h-9 w-56 rounded-full border border-[var(--color-border)] bg-white pl-9 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none sm:w-64"
      />
    </div>
  )
}
