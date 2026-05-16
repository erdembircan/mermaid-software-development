export const SEARCH_MIN_LEN = 2
export const SEARCH_MAX_LEN = 50

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative flex items-center">
      <svg
        className="pointer-events-none absolute left-4 h-4 w-4 shrink-0 text-[var(--color-muted)]"
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
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={SEARCH_MAX_LEN}
        placeholder="Search use cases — try 'deploy' or 'auth flow'…"
        aria-label="Search use cases"
        className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white pl-11 pr-10 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-accent)] hover:text-white"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1l6 6M7 1L1 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
