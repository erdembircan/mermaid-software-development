import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 no-underline"
          aria-label="Mermaid Diagrams home"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-accent)]"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5h12M3 9h7M3 13h9" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="14" cy="13" r="2" fill="white" />
            </svg>
          </span>
          <span
            className="text-[var(--color-ink)] leading-none"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem' }}
          >
            Mermaid
            <span className="ml-1.5 text-[var(--color-muted)]" style={{ fontWeight: 400, fontSize: '0.95rem' }}>
              Diagrams
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-accent-wash)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-ink)]'
              }`
            }
          >
            Charts
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-accent-wash)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-ink)]'
              }`
            }
          >
            About
          </NavLink>
          <a
            href="https://mermaid.js.org"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Docs ↗
          </a>
        </nav>
      </div>
    </header>
  )
}
