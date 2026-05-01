import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PokemonEntry } from '../data/pokemonData'

const TYPE_FR: Record<string, string> = {
  normal: 'NORMAL', fire: 'FEU', water: 'EAU',
  electric: 'ÉLECTRIK', grass: 'PLANTE', ice: 'GLACE',
  fighting: 'COMBAT', poison: 'POISON', ground: 'SOL',
  flying: 'VOL', psychic: 'PSY', bug: 'INSECTE',
  rock: 'ROCHE', ghost: 'SPECTRE', dragon: 'DRAGON',
  dark: 'TÉNÈBRES', steel: 'ACIER', fairy: 'FÉE',
}

const STAT_FR: Record<string, string> = {
  hp: 'PV', attack: 'ATQ', defense: 'DÉF',
  'special-attack': 'AT.SP', 'special-defense': 'DF.SP', speed: 'VIT',
}

function parseDescription(raw: string): string {
  const parts = raw.split('\n')
  if (parts.length > 1) return parts.slice(1).join('\n').replace(/\]$/, '').trim()
  return raw.replace(/^\[.*?[\-—]\s*/, '').replace(/\]$/, '').trim()
}

function extractFlavorText(entries: { language: { name: string }; flavor_text: string }[]): string {
  const fr = entries.filter(e => e.language.name === 'fr')
  const en = entries.filter(e => e.language.name === 'en')
  const pool = fr.length ? fr : en
  const raw = pool[pool.length - 1]?.flavor_text ?? ''
  return raw.replace(/[\f\n\r]/g, ' ').replace(/\s+/g, ' ').trim()
}

interface PokeData {
  id: number
  types: string[]
  stats: { name: string; value: number }[]
  flavorText: string
}

interface Props {
  pokemon: PokemonEntry | null
  onClose: () => void
}

export function Pokedex({ pokemon, onClose }: Props) {
  const [pokeData, setPokeData] = useState<PokeData | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [statWidths, setStatWidths] = useState<number[]>([])

  useEffect(() => {
    if (!pokemon) { setVisible(false); return }
    setVisible(true)
    setLoading(true)
    setPokeData(null)
    setStatWidths([])

    const start = Date.now()

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.apiName}`)
      .then(r => r.json())
      .then(pokemonData =>
        Promise.all([
          Promise.resolve(pokemonData),
          fetch(pokemonData.species.url).then(r => r.json()),
        ])
      )
      .then(([pokemonData, speciesData]) => {
        const parsed: PokeData = {
          id: pokemonData.id,
          types: pokemonData.types.map((t: { type: { name: string } }) => t.type.name),
          stats: pokemonData.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          flavorText: extractFlavorText(speciesData.flavor_text_entries),
        }
        const delay = Math.max(0, 1600 - (Date.now() - start))
        setTimeout(() => {
          setPokeData(parsed)
          setLoading(false)
          setTimeout(() => {
            setStatWidths(parsed.stats.map(s => Math.min(100, (s.value / 255) * 100)))
          }, 80)
        }, delay)
      })
      .catch(() => {
        const delay = Math.max(0, 1600 - (Date.now() - start))
        setTimeout(() => setLoading(false), delay)
      })
  }, [pokemon])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 360)
  }

  if (!pokemon && !visible) return null
  const myNote = pokemon ? parseDescription(pokemon.description) : ''

  return createPortal(
    <div
      className={`dex-backdrop${visible ? ' dex-backdrop--open' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`dex-device${visible ? ' dex-device--open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* ── TOP DARK SECTION ── */}
        <div className="dex-top">

          <div className="dex-header">
            <span className="dex-header-label">POKÉDEX</span>
            <div className="dex-header-right">
              {pokeData && (
                <span className="dex-num">No.{String(pokeData.id).padStart(3, '0')}</span>
              )}
              <span className="dex-led-green" />
              <button type="button" className="dex-close-btn" onClick={handleClose}>✕</button>
            </div>
          </div>

          {/* Sprite screen */}
          <div className="dex-screen-sprite">
            {loading ? (
              <>
                <div className="dex-scanline" />
                <span className="dex-boot-text">SCAN...</span>
              </>
            ) : (
              pokemon && (
                <img src={pokemon.asset} alt={pokemon.frName} className="dex-sprite" />
              )
            )}
          </div>

          {/* Info screen */}
          <div className="dex-screen-info">
            {loading ? (
              <div className="dex-loading">
                <span className="dex-loading-label">INITIALISATION...</span>
                <div className="dex-loading-bar">
                  <div className="dex-loading-fill" />
                </div>
                <span className="dex-loading-sub">ANALYSE DES DONNÉES</span>
              </div>
            ) : pokeData ? (
              <div className="dex-info">

                {/* Name + types */}
                <div className="dex-name-row">
                  <span className="dex-name">{pokemon!.frName.toUpperCase()}</span>
                  <div className="dex-types">
                    {pokeData.types.map(t => (
                      <span key={t} className="dex-type" data-type={t}>
                        {TYPE_FR[t] ?? t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="dex-rule" />

                {/* Official Pokédex entry */}
                {pokeData.flavorText && (
                  <>
                    <span className="dex-section-label">ENTRÉE POKÉDEX</span>
                    <p className="dex-desc dex-desc--official">{pokeData.flavorText}</p>
                    <div className="dex-rule" />
                  </>
                )}

                {/* Personal note */}
                <span className="dex-section-label">MA NOTE</span>
                <p className="dex-desc">{myNote}</p>

                <div className="dex-rule" />

                {/* Stats */}
                <div className="dex-stats">
                  {pokeData.stats.map((s, i) => (
                    <div key={s.name} className="dex-stat">
                      <span className="dex-stat-lbl">{STAT_FR[s.name] ?? s.name}</span>
                      <div className="dex-stat-track">
                        <div
                          className="dex-stat-fill"
                          style={{ '--stat-pct': `${statWidths[i] ?? 0}%` } as React.CSSProperties}
                        />
                      </div>
                      <span className="dex-stat-val">{s.value}</span>
                    </div>
                  ))}
                </div>

              </div>
            ) : null}
          </div>

          {/* Control bar */}
          <div className="dex-ctrl-bar">
            <div className="dex-ctrl-btns">
              <span className="dex-ctrl-btn">STAT</span>
              <span className="dex-ctrl-btn">MAP</span>
            </div>
          </div>
        </div>

        {/* ── HINGE ── */}
        <div className="dex-hinge" />

        {/* ── BOTTOM ORANGE SECTION ── */}
        <div className="dex-bottom">
          <div className="dex-pokeball">
            <div className="dex-pokeball-center" />
          </div>
          <div className="dex-bottom-row">
            <div className="dex-dots"><span /><span /><span /></div>
            <div className="dex-black-btns"><span /><span /></div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
