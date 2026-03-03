import { useEffect, useRef } from 'react'

// Lisse une valeur vers une cible (linear interpolation)
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * useParallax
 * Écoute la souris et applique un décalage de parallaxe
 * à chaque .item selon son index (profondeur simulée).
 */
export function useParallax() {
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafId = useRef<number>(0)

  useEffect(() => {
    // ── Écoute souris ──────────────────────
    const onMouseMove = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth  - 0.5) * 40
      targetY.current = (e.clientY / window.innerHeight - 0.5) * 25
    }

    // ── Écoute tactile ────────────────────
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      targetX.current = (t.clientX / window.innerWidth  - 0.5) * 25
      targetY.current = (t.clientY / window.innerHeight - 0.5) * 15
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // ── Boucle d'animation ────────────────
    const animate = () => {
      currentX.current = lerp(currentX.current, targetX.current, 0.06)
      currentY.current = lerp(currentY.current, targetY.current, 0.06)

      const items = document.querySelectorAll<HTMLElement>('.item')
      items.forEach((item, i) => {
        const depth = ((i % 5) + 1) * 0.25
        item.style.marginLeft = `${currentX.current * depth}px`
        item.style.marginTop  = `${currentY.current * depth}px`
      })

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])
}