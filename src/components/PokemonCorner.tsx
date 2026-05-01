import { useState } from 'react'
import { POKEMON_LIST, PokemonEntry } from '../data/pokemonData'
import { PokemonCard } from './PokemonCard'
import { Pokedex } from './Pokedex'

export function PokemonCorner() {
  const [selected, setSelected] = useState<PokemonEntry | null>(null)

  return (
    <>
      <div className="pokemon-corner">
        {POKEMON_LIST.map(p => (
          <PokemonCard key={p.frName} pokemon={p} onSelect={setSelected} />
        ))}
      </div>

      <Pokedex pokemon={selected} onClose={() => setSelected(null)} />
    </>
  )
}
