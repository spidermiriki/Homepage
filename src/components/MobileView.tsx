import { useState } from 'react'
import { Starfield } from './Starfield'
import papersImg from '../assets/papers.svg'
import avatar from '../assets/icone.png'
import { PokemonCorner } from './PokemonCorner'
import { SocialBar } from './SocialBar'

type Page = null | 'musique' | 'jeux'

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

  return (
    <>
      <Starfield count={120} />
      <div id="scanlines" />
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

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
              <MobileItem label="Films" href="https://spidermiriki.github.io/Melo-s-Studio/">
                <span className="mobile-item-text">FILMS</span>
              </MobileItem>
              <MobileItem label="Musique" onClick={() => setActivePage('musique')}>
                <span className="mobile-item-text">MUSIQUE</span>
              </MobileItem>
              <MobileItem label="Jeux vidéo" onClick={() => setActivePage('jeux')}>
                <span className="mobile-item-text">JEUX</span>
              </MobileItem>
            </nav>
          </>
        )}

        {activePage === 'jeux' && (
          <div className="mobile-page">
            <button type="button" className="mobile-back" onClick={() => setActivePage(null)}>← retour</button>
            <h2>Jeux vidéo</h2>
            <p className="mobile-wip">⚙ En cours de programmation...</p>
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
          </div>
        )}

      </div>

      <PokemonCorner />
      <SocialBar />
    </>
  )
}
