import { useEffect } from 'react'
import { Starfield } from './components/Starfield'
import { Scene }     from './components/Scene'
import { useParallax } from './hooks/useParallax'

/**
 * App
 * Point d'entrée de la scène.
 * Ne devrait pas avoir besoin d'être modifié —
 * travaille dans Scene.tsx pour ajouter tes objets.
 */
export default function App() {

  // Active la parallaxe souris sur toute la scène
  useParallax()

  // ── Trail souris ──────────────────────────────────
  useEffect(() => {
    let frame = 0

    const onMouseMove = (e: MouseEvent) => {
      frame++
      if (frame % 3 !== 0) return // 1 point sur 3

      const dot = document.createElement('div')
      dot.className = 'trail'
      const size = Math.random() * 5 + 3
      dot.style.cssText = `
        left:   ${e.clientX}px;
        top:    ${e.clientY}px;
        width:  ${size}px;
        height: ${size}px;
      `
      document.body.appendChild(dot)
      setTimeout(() => dot.remove(), 500)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ── Burst au clic ─────────────────────────────────
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const burst = document.createElement('div')
      burst.className = 'click-burst'
      burst.style.left = `${e.clientX}px`
      burst.style.top  = `${e.clientY}px`
      document.body.appendChild(burst)
      setTimeout(() => burst.remove(), 450)
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {/* Fond étoilé */}
      <Starfield count={200} />

      {/* Titre */}
      <h1 id="title">. Homelo's Room .</h1>

      {/* Tous les objets lévitants */}
      <Scene />

      {/* Overlays décoratifs */}
      <div id="scanlines" />
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />
    </>
  )
}
