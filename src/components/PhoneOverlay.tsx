import { useRef, useState } from 'react'
import monSon from '../sounds/The Police - Every Breath You Take.mp3'
import monGif from '../assets/keldeo.gif'

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
            <p>Tu veux voir mes reviews de films ?</p>

              <a onClick={() => { onClose(); window.open('https://spidermiriki.github.io/Melo-s-Studio/', '_blank') }} className="gif-link">
                <img src={monGif} width={150} alt="reviews" />
              </a>

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

            <iframe
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/1kYBDMaHq5oFeoFMfR9gH7?theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <iframe
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/3D761oLILZAFcJ5WydCg6o?theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <iframe
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/1kYBDMaHq5oFeoFMfR9gH7?theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />

            <button className="play-btn" onClick={handlePlay}></button>
          </div>
        )}
      </div>
    </div>
  )
}