import { useEffect, useState } from 'react'

export function Intro({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2400)
    const t2 = setTimeout(onDone, 3100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`intro${exiting ? ' intro--out' : ''}`}>
      <div className="intro-corner tl" />
      <div className="intro-corner tr" />
      <div className="intro-corner bl" />
      <div className="intro-corner br" />
      <h1 className="intro-title">· Home Page ·</h1>
      <p className="intro-sub">INITIALIZING...</p>
    </div>
  )
}
