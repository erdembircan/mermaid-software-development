import { useEffect, useId, useRef, useState } from 'react'
import { mermaid } from '../lib/mermaid'

type Props = {
  source: string
  label?: string
  className?: string
}

export default function MermaidDiagram({ source, label, className = '' }: Props) {
  const rawId = useId()
  const id = `mmd-${rawId.replace(/:/g, '')}`
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    setSvg(null)
    setError(null)

    mermaid
      .render(id, source)
      .then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Diagram rendering failed.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [id, source, inView])

  if (error) {
    return (
      <div ref={ref} className={`rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 ${className}`}>
        <span className="font-medium">Diagram error: </span>
        {error}
      </div>
    )
  }

  if (!svg) {
    return (
      <div ref={ref} className={`skeleton-pulse rounded-xl bg-[var(--color-border)] ${className}`} style={{ minHeight: 120 }} />
    )
  }

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label ?? 'Mermaid diagram'}
      className={`mermaid-output overflow-auto rounded-xl ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
