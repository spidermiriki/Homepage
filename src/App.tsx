import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Starfield } from './components/Starfield'
import { Scene }     from './components/Scene'
import { useParallax } from './hooks/useParallax'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useParallax()

  useEffect(() => {
    if (!isHome) return
    let frame = 0
    const onMouseMove = (e: MouseEvent) => {
      frame++
      if (frame % 3 !== 0) return
      const dot = document.createElement('div')
      dot.className = 'trail'
      const size = Math.random() * 5 + 3
      dot.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;`
      document.body.appendChild(dot)
      setTimeout(() => dot.remove(), 500)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isHome])

  useEffect(() => {
    if (!isHome) return
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
  }, [isHome])

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Starfield count={200} />
          <h1 id="title">· MY ALIEN ROOM ·</h1>
          <Scene />
          <div id="scanlines" />
          <div className="hud-corner tl" />
          <div className="hud-corner tr" />
          <div className="hud-corner bl" />
          <div className="hud-corner br" />
        </>
      } />

    </Routes>
  )
}