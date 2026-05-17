export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p
              className="text-[var(--color-ink)] font-semibold"
              style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}
            >
              Mermaid Diagrams
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              A showcase of every diagram type and its place in software development.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--color-muted)]">
            <a
              href="https://mermaid.js.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              mermaid.js.org ↗
            </a>
            <a
              href="https://github.com/mermaid-js/mermaid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--color-border)] pt-6 flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span>
            All diagrams rendered with{' '}
            <a
              href="https://mermaid.js.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-accent)]"
            >
              Mermaid.js
            </a>
            {' '}— open source, MIT licensed.
          </span>
          <span>
            © 2026{' '}
            <a
              href="https://github.com/erdembircan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Erdem Bircan
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
