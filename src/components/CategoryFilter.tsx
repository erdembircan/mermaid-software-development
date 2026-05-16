import { useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../lib/categories'

const ALL = 'all'

export default function CategoryFilter() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category') ?? ALL

  const set = (key: string) => {
    if (key === ALL) {
      params.delete('category')
    } else {
      params.set('category', key)
    }
    params.delete('q')
    setParams(params, { replace: true })
  }

  const chips: { key: string; label: string }[] = [
    { key: ALL, label: 'All' },
    ...Object.entries(CATEGORIES).map(([key, val]) => ({ key, label: val.label })),
  ]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {chips.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => set(key)}
          aria-pressed={active === key}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            active === key
              ? 'bg-[var(--color-accent)] text-white shadow-sm'
              : 'border border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
