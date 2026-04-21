import { Item } from './Item'
import { useState } from 'react'
import { PhoneOverlay } from './PhoneOverlay'
import papersImg from '../assets/papers.svg'
import avatar   from '../assets/icone.png'
import tvImg    from '../assets/homelo.png'
import Keldeo   from '../assets/keldeo.gif'
import Lugia    from '../assets/lugia.gif'

export function Scene() {
  const [phoneOpen, setPhoneOpen] = useState(false)
  const handleAvatarClick = () => {
    setPhoneOpen(true)
  }

  return (
    <div id="scene">

      {/* ── Avatar ── */}
      <Item x="50%" y="50%" dur="3.5s" delay="0s" rot="-1deg" zIndex={20} label="avatar" id="avatar" onClick={handleAvatarClick}>
        <img src={avatar} width={100} alt="avatar" />
      </Item>

      {/* ── Homelo ── */}
      <Item x="20%" y="40%" dur="4s" delay="0.8s" rot="1deg" zIndex={21} label="Qui suis je ?">
        <img src={tvImg} width={200} alt="Homelo" />
      </Item>

      {/* ── Portfolio ── */}
      <Item x="15%" y="55%" dur="5s" delay="0.5s" rot="-2deg" zIndex={15} label="Mon Portfolio" onClick={() => window.open('https://spidermiriki.github.io/Portfolio/', '_blank')}>
        <img src={papersImg} width={160} alt="portfolio" />
      </Item>

      {/* ── Keldeo ── */}
      <Item x="72%" y="45%" dur="5.5s" delay="0.3s" rot="0deg" zIndex={11} label="Shiny Keldeo is my favorite pokemon">
        <img src={Keldeo} width={160} alt="keldeo" />
      </Item>

      {/* ── Lugia ── */}
      <Item x="75%" y="40%" dur="5.5s" delay="0.3s" rot="0deg" zIndex={10} label="Lugia is my other favorite pokemon">
        <img src={Lugia} width={300} alt="Lugia" />
      </Item>

      {/* ── Overlay ── */}
      {phoneOpen && <PhoneOverlay onClose={() => setPhoneOpen(false)} />}

    </div>
  )
}