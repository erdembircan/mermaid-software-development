import { useCallback, useEffect, useRef, useState } from 'react'
import MermaidDiagram from './MermaidDiagram'

type Props = {
  source: string
  label?: string
  minHeight?: number
}

type DragStart = {
  mouseX: number
  mouseY: number
  offsetX: number
  offsetY: number
}

const ZOOM_MIN = 0.25
const ZOOM_MAX = 3
const ZOOM_STEP = 1.25

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function DiagramViewer({ source, label, minHeight = 360 }: Props) {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isPanMode, setIsPanMode] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<DragStart | null>(null)

  const zoomIn = () => setZoom(z => Math.min(ZOOM_MAX, z * ZOOM_STEP))
  const zoomOut = () => setZoom(z => Math.max(ZOOM_MIN, z / ZOOM_STEP))
  const reset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setIsPanMode(false)
    setIsDragging(false)
    dragStart.current = null
  }
  const togglePan = () => {
    setIsPanMode(p => !p)
    setIsDragging(false)
    dragStart.current = null
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanMode) return
      e.preventDefault()
      dragStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        offsetX: offset.x,
        offsetY: offset.y,
      }
      setIsDragging(true)
    },
    [isPanMode, offset],
  )

  // Attach window-level listeners while dragging so the drag doesn't
  // break if the cursor leaves the viewer bounds.
  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent) => {
      if (!dragStart.current) return
      const dx = e.clientX - dragStart.current.mouseX
      const dy = e.clientY - dragStart.current.mouseY
      setOffset({ x: dragStart.current.offsetX + dx, y: dragStart.current.offsetY + dy })
    }

    const handleUp = () => {
      setIsDragging(false)
      dragStart.current = null
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging])

  // Reset view when the diagram source changes (navigating to a different chart).
  useEffect(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setIsPanMode(false)
    setIsDragging(false)
    dragStart.current = null
  }, [source])

  const cursor = isDragging ? 'grabbing' : isPanMode ? 'grab' : 'default'
  const useTransition = !isDragging && !prefersReducedMotion()
  const zoomPct = Math.round(zoom * 100)

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-white"
      style={{ minHeight }}
    >
      {/* Toolbar */}
      <div
        role="toolbar"
        aria-label="Diagram controls"
        className="absolute right-3 top-3 z-10 flex items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-white/95 shadow-sm backdrop-blur-sm"
      >
        <ToolButton onClick={zoomOut} title="Zoom out" aria-label="Zoom out" disabled={zoom <= ZOOM_MIN}>
          −
        </ToolButton>

        <span
          className="select-none border-x border-[var(--color-border)] px-2 text-xs tabular-nums text-[var(--color-muted)]"
          style={{ fontFamily: 'var(--font-mono)', lineHeight: '2rem' }}
          aria-live="polite"
          aria-label={`Zoom level ${zoomPct}%`}
        >
          {zoomPct}%
        </span>

        <ToolButton onClick={zoomIn} title="Zoom in" aria-label="Zoom in" disabled={zoom >= ZOOM_MAX}>
          +
        </ToolButton>

        <div className="mx-1 h-5 w-px bg-[var(--color-border)]" aria-hidden="true" />

        <ToolButton onClick={reset} title="Reset view" aria-label="Reset zoom and position">
          ↺
        </ToolButton>

        <div className="mx-1 h-5 w-px bg-[var(--color-border)]" aria-hidden="true" />

        <button
          type="button"
          onClick={togglePan}
          title={isPanMode ? 'Deactivate pan mode' : 'Activate pan mode'}
          aria-label={isPanMode ? 'Deactivate pan mode' : 'Activate pan mode'}
          aria-pressed={isPanMode}
          className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
            isPanMode
              ? 'bg-[var(--color-accent)] text-white'
              : 'text-[var(--color-muted)] hover:bg-[var(--color-accent-wash)] hover:text-[var(--color-accent)]'
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" aria-hidden="true">
            <path d="M5.5 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 5.5 0Zm0 8a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 5.5 8ZM0 5.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 5.5Zm8 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 8 5.5Zm-4.5 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
          </svg>
          Pan
        </button>
      </div>

      {/* Transformable diagram container */}
      <div
        className="flex h-full w-full items-center justify-center p-8"
        style={{ minHeight, cursor }}
        onMouseDown={handleMouseDown}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: useTransition ? 'transform 150ms ease-out' : 'none',
            width: '100%',
          }}
        >
          <MermaidDiagram source={source} label={label} className="w-full" />
        </div>
      </div>
    </div>
  )
}

type ToolButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

function ToolButton({ children, className = '', ...props }: ToolButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-8 w-8 items-center justify-center text-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--color-accent-wash)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[var(--color-muted)] ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
