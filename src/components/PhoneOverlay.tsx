import { useRef, useState } from 'react'
import monSon from '../sounds/The Police - Every Breath You Take.mp3'

interface PhoneOverlayProps {
  onClose: () => void
}



export function PhoneOverlay({ onClose }: PhoneOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activePage, setActivePage] = useState<string | null>(null)

const [playing, setPlaying] = useState(false)

const handlePlay = () => {
  if (audioRef.current) {
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }
}

  return (
    <div className="phone-overlay">
      <div className="phone-frame">

        <button className="phone-close" onClick={onClose}>✕</button>
        <audio ref={audioRef} src={monSon} />

        {/* ── PAGE PRINCIPALE ── */}
        {activePage === null && (
          <div className="phone-content">
            <h1>L'avatar avait le Hphone d'Homelo</h1>
            <ul>
              <li><a href="https://spidermiriki.github.io/Melo-s-Studio/" target="_blank" rel="noopener noreferrer" onClick={onClose}>Films</a></li>
              <li><a onClick={() => setActivePage('series')}>Séries</a></li>
              <li><a onClick={() => setActivePage('jeux')}>Jeux vidéo</a></li>
              <li><a onClick={() => setActivePage('musique')}>Musique</a></li>
            </ul>
            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}


        {/* ── PAGE SÉRIES ── */}
        {activePage === 'series' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Séries</h1>
            <p className="wip-text">⚙ En cours de programmation...</p>
          </div>
        )}

        {/* ── PAGE JEUX VIDÉO ── */}
        {activePage === 'jeux' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Jeux vidéo</h1>
            <p className="wip-text">⚙ En cours de programmation...</p>
          </div>
        )}

        {/* ── PAGE MUSIQUE ── */}
        {activePage === 'musique' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Musique</h1>
            <p className="wip-text">⚙ En cours de programmation...</p>
          </div>
        )}
      </div>
    </div>
  )
}