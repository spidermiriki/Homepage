import { PokemonEntry } from '../data/pokemonData'

interface Props {
  pokemon: PokemonEntry
  onSelect: (p: PokemonEntry) => void
}

export function PokemonCard({ pokemon, onSelect }: Props) {
  const handleClick = () => onSelect(pokemon)

  if (pokemon.wrapperClassName) {
    return (
      <div
        className={pokemon.wrapperClassName}
        onClick={handleClick}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        <img src={pokemon.asset} width={pokemon.width} alt={pokemon.frName} />
      </div>
    )
  }

  return (
    <img
      src={pokemon.asset}
      width={pokemon.width}
      alt={pokemon.frName}
      className={pokemon.className}
      onClick={handleClick}
      style={{ cursor: 'pointer', pointerEvents: 'auto' }}
    />
  )
}
