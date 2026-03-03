import { useEffect, useRef } from 'react'

interface StarConfig {
  x: number       // position % horizontale
  y: number       // position % verticale
  size: number    // diamètre en px
  duration: number // durée du twinkle en secondes
  delay: number   // délai de départ en secondes
}

function generateStarConfigs(count: number): StarConfig[] {
  return Array.from({ length: count }, () => ({
    x:        Math.random() * 100,
    y:        Math.random() * 100,
    size:     Math.random() * 2.5 + 0.5,
    duration: 2 + Math.random() * 4,
    delay:    -(Math.random() * 5),   // délai négatif = déjà en cours
  }))
}

interface StarfieldProps {
  count?: number
}

export function Starfield({ count = 200 }: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const stars = generateStarConfigs(count)

    stars.forEach((cfg) => {
      const el = document.createElement('div')
      el.className = 'star'
      el.style.cssText = `
        left:    ${cfg.x}%;
        top:     ${cfg.y}%;
        width:   ${cfg.size}px;
        height:  ${cfg.size}px;
        --d:     ${cfg.duration}s;
        --delay: ${cfg.delay}s;
      `
      container.appendChild(el)
    })

    // Nettoyage au démontage
    return () => {
      container.innerHTML = ''
    }
  }, [count])

  return <div id="starfield" ref={containerRef} />
}