import Keldeo from '../assets/keldeo.gif'
import Lugia  from '../assets/lugia.gif'

export function PokemonCorner() {
  return (
    <div className="pokemon-corner">
      <img src={Keldeo} width={80} alt="keldeo" />
      <img src={Lugia}  width={110} alt="lugia" />
    </div>
  )
}
