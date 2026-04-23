import { useRef, useState } from 'react'
import { Starfield } from './Starfield'
import monSon from '../sounds/The Police - Every Breath You Take.mp3'
import monGif from '../assets/keldeo.gif'
import papersImg from '../assets/papers.svg'
import avatar from '../assets/icone.png'
import { PokemonCorner } from './PokemonCorner'
import { SocialBar } from './SocialBar'

type Page = null | 'films' | 'musique'

interface MobileItemProps {
  label: string
  onClick?: () => void
  href?: string
  children: React.ReactNode
}

function MobileItem({ label, onClick, href, children }: MobileItemProps) {
  const inner = (
    <>
      <div className="item-inner">{children}</div>
      <span className="mobile-item-label">{label}</span>
    </>
  )
  if (href) return (
    <a className="mobile-item" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  )
  return (
    <button type="button" className="mobile-item" onClick={onClick}>{inner}</button>
  )
}

export function MobileView() {
  const [activePage, setActivePage] = useState<Page>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else audioRef.current.play()
    setPlaying(!playing)
  }

  return (
    <>
      <Starfield count={120} />
      <div id="scanlines" />
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />
      <audio ref={audioRef} src={monSon} />

      <div className="mobile-view">

        {activePage === null && (
          <>
            <div className="mobile-header">
              <img src={avatar} className="mobile-avatar" alt="avatar" />
              <h1 className="mobile-title">· MY ALIEN ROOM ·</h1>
            </div>

            <nav className="mobile-menu">
              <MobileItem label="Mon Portfolio" href="https://spidermiriki.github.io/Portfolio/">
                <img src={papersImg} width={110} alt="portfolio" />
              </MobileItem>
              <MobileItem label="Films" onClick={() => setActivePage('films')}>
                <span className="mobile-item-text">FILMS</span>
              </MobileItem>
              <MobileItem label="Musique" onClick={() => setActivePage('musique')}>
                <span className="mobile-item-text">MUSIQUE</span>
              </MobileItem>
            </nav>

            <button type="button" className="mobile-play-btn" onClick={handlePlay}>
              {playing ? '⏸' : '▶'}
            </button>
          </>
        )}

        {activePage === 'films' && (
          <div className="mobile-page">
            <button type="button" className="mobile-back" onClick={() => setActivePage(null)}>← retour</button>
            <h2>Films</h2>
            <p>Tu veux voir mes reviews de films ?</p>
            <a
              className="gif-link"
              onClick={() => window.open('https://spidermiriki.github.io/Melo-s-Studio/', '_blank')}
            >
              <img src={monGif} width={140} alt="reviews" />
            </a>
            <button type="button" className="mobile-play-btn" onClick={handlePlay}>{playing ? '⏸' : '▶'}</button>
          </div>
        )}

        {activePage === 'musique' && (
          <div className="mobile-page">
            <button type="button" className="mobile-back" onClick={() => setActivePage(null)}>← retour</button>
            <h2>Musique</h2>
            <iframe
              title="Playlist Spotify 1"
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/1kYBDMaHq5oFeoFMfR9gH7?theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <iframe
              title="Playlist Spotify 2"
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/3D761oLILZAFcJ5WydCg6o?theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <iframe
              title="Playlist Spotify 3"
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/1kYBDMaHq5oFeoFMfR9gH7?theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <button type="button" className="mobile-play-btn" onClick={handlePlay}>{playing ? '⏸' : '▶'}</button>
          </div>
        )}

      </div>

      <PokemonCorner />
      <SocialBar />
    </>
  )
}
