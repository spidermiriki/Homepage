import { useRef, useState } from 'react'
import monSon from '../sounds/13.ogg'

interface PhoneOverlayProps {
  onClose: () => void
}

export function PhoneOverlay({ onClose }: PhoneOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activePage, setActivePage] = useState<string | null>(null)

  const handlePlay = () => {
    if (audioRef.current) audioRef.current.play()
  }

  return (
    <div className="phone-overlay">
      <div className="phone-frame">

        <button className="phone-close" onClick={onClose}>✕</button>
        <audio ref={audioRef} src={monSon} />

        {/* ── PAGE PRINCIPALE ── */}
        {activePage === null && (
          <div className="phone-content">
            <h1>L'avatar avait le téléphone d'Homelo</h1>
            <ul>
              <li><a onClick={() => setActivePage('films')}>Films</a></li>
              <li><a onClick={() => setActivePage('series')}>Séries</a></li>
              <li><a onClick={() => setActivePage('jeux')}>Jeux vidéo</a></li>
              <li><a onClick={() => setActivePage('musique')}>Musique</a></li>
            </ul>
            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}

        {/* ── PAGE FILMS ── */}
        {activePage === 'films' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Films</h1>
            {/* Ton contenu ici */}
            <p>Mes films préférés...</p>
            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}

        {/* ── PAGE SÉRIES ── */}
        {activePage === 'series' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Séries</h1>
            <p>Mes séries préférées...</p>
            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}

        {/* ── PAGE JEUX VIDÉO ── */}
        {activePage === 'jeux' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Jeux vidéo</h1>
            <p>Mes jeux préférés...</p>
            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}

        {/* ── PAGE MUSIQUE ── */}
        {activePage === 'musique' && (
          <div className="phone-content">
            <button className="back-btn" onClick={() => setActivePage(null)}>← retour</button>
            <h1>Musique</h1>
            <p>Mes musiques préférées...</p>
            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}

      </div>
    </div>
  )
}