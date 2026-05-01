import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PokemonEntry } from '../data/pokemonData'

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0',
  electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
  fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
  flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
  dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC',
}

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

// Strips the "[À compléter — ... \n" prefix and trailing "]"
function parseDescription(raw: string): string {
  const parts = raw.split('\n')
  if (parts.length > 1) {
    return parts.slice(1).join('\n').replace(/\]$/, '').trim()
  }
  return raw.replace(/^\[.*?[\-—]\s*/, '').replace(/\]$/, '').trim()
}

interface PokeData {
  id: number
  types: string[]
  stats: { name: string; value: number }[]
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
    if (!pokemon) {
      setVisible(false)
      return
    }

    setVisible(true)
    setLoading(true)
    setPokeData(null)
    setStatWidths([])

    const start = Date.now()

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.apiName}`)
      .then(r => r.json())
      .then(data => {
        const parsed: PokeData = {
          id: data.id,
          types: data.types.map((t: { type: { name: string } }) => t.type.name),
          stats: data.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        }
        const delay = Math.max(0, 1600 - (Date.now() - start))
        setTimeout(() => {
          setPokeData(parsed)
          setLoading(false)
          setTimeout(() => {
            setStatWidths(parsed.stats.map(s => Math.min(100, (s.value / 255) * 100)))
          }, 100)
        }, delay)
      })
      .catch(() => {
        const delay = Math.max(0, 1600 - (Date.now() - start))
        setTimeout(() => setLoading(false), delay)
      })
  }, [pokemon])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 380)
  }

  if (!pokemon && !visible) return null

  const description = pokemon ? parseDescription(pokemon.description) : ''

  return createPortal(
    <div
      className={`dex-backdrop${visible ? ' dex-backdrop--open' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`dex-device${visible ? ' dex-device--open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* ── DEVICE HEADER ── */}
        <div className="dex-header">
          <div className="dex-leds">
            <span className="dex-led dex-led--cyan" />
            <span className="dex-led dex-led--magenta" />
            <span className="dex-led dex-led--yellow" />
          </div>
          <span className="dex-header-title">◈ POKÉDEX ◈</span>
          <div className="dex-header-right">
            {pokeData && (
              <span className="dex-num">No.{String(pokeData.id).padStart(3, '0')}</span>
            )}
            <button type="button" className="dex-close-btn" onClick={handleClose}>✕</button>
          </div>
        </div>

        {/* ── DEVICE BODY ── */}
        <div className="dex-body">

          {/* Left — sprite screen */}
          <div className="dex-left">
            <div className="dex-screen-bezel">
              <div className="dex-screen">
                {loading ? (
                  <>
                    <div className="dex-screen-scanline" />
                    <span className="dex-screen-boot">SCAN...</span>
                  </>
                ) : (
                  pokemon && (
                    <img
                      src={pokemon.asset}
                      alt={pokemon.frName}
                      className="dex-sprite"
                    />
                  )
                )}
              </div>
            </div>

            {/* Hardware decorations */}
            <div className="dex-hw">
              <div className="dex-camera">
                <div className="dex-camera-inner" />
              </div>
              <div className="dex-buttons">
                <span className="dex-btn-row">
                  <span className="dex-btn" /><span className="dex-btn" />
                </span>
                <span className="dex-btn-wide" />
              </div>
            </div>

            {/* Bottom vent lines */}
            <div className="dex-vents">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="dex-vent-line" />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="dex-col-divider" />

          {/* Right — info */}
          <div className="dex-right">
            {loading ? (
              <div className="dex-loading">
                <div className="dex-loading-bar">
                  <div className="dex-loading-fill" />
                </div>
                <span className="dex-loading-label">INITIALISATION...</span>
                <span className="dex-loading-sub">ANALYSE DES DONNÉES EN COURS</span>
              </div>
            ) : pokeData ? (
              <div className="dex-info">
                {/* Name + types */}
                <div className="dex-name-block">
                  <h2 className="dex-name">{pokemon!.frName.toUpperCase()}</h2>
                  <div className="dex-types">
                    {pokeData.types.map(t => (
                      <span
                        key={t}
                        className="dex-type"
                        style={{ '--type-color': TYPE_COLORS[t] ?? '#888' } as React.CSSProperties}
                      >
                        {TYPE_FR[t] ?? t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="dex-rule" />

                {/* Description */}
                <p className="dex-desc">{description}</p>

                <div className="dex-rule" />

                {/* Stats */}
                <div className="dex-stats">
                  {pokeData.stats.map((s, i) => (
                    <div key={s.name} className="dex-stat">
                      <span className="dex-stat-lbl">{STAT_FR[s.name] ?? s.name}</span>
                      <div className="dex-stat-track">
                        <div
                          className="dex-stat-fill"
                          style={{ width: `${statWidths[i] ?? 0}%` }}
                        />
                      </div>
                      <span className="dex-stat-val">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Corner HUD brackets */}
        <span className="dex-corner dex-corner--tl" />
        <span className="dex-corner dex-corner--tr" />
        <span className="dex-corner dex-corner--bl" />
        <span className="dex-corner dex-corner--br" />
      </div>
    </div>,
    document.body
  )
}
