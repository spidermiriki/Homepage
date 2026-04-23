import Keldeo      from '../assets/keldeo.gif'
import Lugia       from '../assets/lugia.gif'
import Gobou       from '../assets/gobou.gif'
import Karchacrock from '../assets/karchacrock.gif'
import Mimikyu     from '../assets/mimikyu.gif'
import Psykokwak   from '../assets/psykokwak.gif'
import Simiabraz   from '../assets/simiabraz.gif'
import Broussatif  from '../assets/broussatif.gif'
import Brutalibre  from '../assets/brutalibre.png'

export function PokemonCorner() {
  return (
    <div className="pokemon-corner">
      <img src={Gobou}       width={55}  alt="gobou" />
      <img src={Psykokwak}   width={50}  alt="psykokwak" />
      <img src={Karchacrock} width={65}  alt="karchacrock" />
      <img src={Simiabraz}   width={65}  alt="simiabraz" />
      <img src={Broussatif}  width={110} alt="broussatif" className="pokemon-trim" />
      <img src={Brutalibre}  width={70}  alt="brutalibre" className="pokemon-drop" />
      <div className="pokemon-half-left pokemon-trim pokemon-drop-lg">
        <img src={Mimikyu}   width={170} alt="mimikyu" />
      </div>
      <img src={Keldeo}      width={80}  alt="keldeo" />
      <img src={Lugia}       width={110} alt="lugia" />
    </div>
  )
}
