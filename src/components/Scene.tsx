import { Item } from './Item'
import { useState } from 'react'
import { PhoneOverlay } from './PhoneOverlay'
import papersImg from '../assets/papers.svg'
import avatar   from '../assets/icone.png'

export function Scene() {
  const [phoneOpen, setPhoneOpen] = useState(false)

  return (
    <div id="scene">

      {/* ── Avatar ── */}
      <Item x="50%" y="50%" dur="3.5s" delay="0s" rot="-1deg" zIndex={20} label="avatar" id="avatar" onClick={() => setPhoneOpen(true)}>
        <img src={avatar} width={100} alt="avatar" />
      </Item>

      {/* ── Portfolio ── */}
      <Item x="15%" y="55%" dur="5s" delay="0.5s" rot="-2deg" zIndex={15} label="Mon Portfolio" onClick={() => window.open('https://spidermiriki.github.io/Portfolio/', '_blank')}>
        <img src={papersImg} width={160} alt="portfolio" />
      </Item>

      {/* ── Overlay ── */}
      {phoneOpen && <PhoneOverlay onClose={() => setPhoneOpen(false)} />}

    </div>
  )
}