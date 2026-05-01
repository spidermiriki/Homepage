import GobouGif      from '../assets/gobou.gif'
import PsykokwakGif  from '../assets/psykokwak.gif'
import KarchackrockGif from '../assets/karchacrock.gif'
import SimiabrazGif  from '../assets/simiabraz.gif'
import BroussatifGif from '../assets/broussatif.gif'
import BrutalibreImg from '../assets/brutalibre.png'
import MimikyuGif    from '../assets/mimikyu.gif'
import KeldeoGif     from '../assets/keldeo.gif'
import LugiaGif      from '../assets/lugia.gif'

export interface PokemonEntry {
  frName: string
  apiName: string
  asset: string
  width: number
  description: string
  className?: string
  wrapperClassName?: string
}

export const POKEMON_LIST: PokemonEntry[] = [
  {
    frName: 'Gobou',
    apiName: 'mudkip',
    asset: GobouGif,
    width: 55,
    description: '[Pourquoi j\'apprécie Gobou.\n Gobou est pour moi le meilleur starter all gen, et je parle bien de première forme, un des rare a avoir un beau shiny et un design original, de plus il est trop mignon et il m\' marque la première fois que je l\' vu je m\'en souviens encore comme si c\'était hier, de si bons souvenirs avec lui dans pokemon rosa]',
  },
  {
    frName: 'Psykokwak',
    apiName: 'psyduck',
    asset: PsykokwakGif,
    width: 50,
    description: '[Pourquoi j\'apprécie Psykokwak\n Psykokwak est a mes yeux le meilleur pokémon de la 1g, cela est purement subjectif je veux pas me faire bully svp, avec une forme shiny juste magnifique et un lore tellement triste, c\'est un miskine de la vie, il vie avec une migraine constante et si il a trop mal au crâne il explose c\'est juste un concept super original]',
  },
  {
    frName: 'Karchacrock',
    apiName: 'krookodile',
    asset: KarchackrockGif,
    width: 65,
    description: '[Pourquoi j\'apprécie Karchacrock\n Parlons de Carchacrock, il a un flow de malade, premièrement c\'est un dragon requin marteau, osez me dire que ce n\'est pas juste super stylé. En plus de cela, il a une mega incroyable et dans le lore de pokémon il aura farm tellement en étant le meilleur pokémon de Cynthia]',
  },
  {
    frName: 'Simiabraz',
    apiName: 'simisear',
    asset: SimiabrazGif,
    width: 65,
    description: '[Pourquoi j\'apprécie Simiabraz\n Ne me parlez pas d\'amphinobi que j\'apprécie à un plus haut point, il a bercé la fin de mon enfance. Cependant Simiabraz est pour moi le starter forme final le plus stylé, il pète de flow, un manrdill de feu c\'est trop stylé certe pas un type original mais il a tout pour avoir un flow de malade. Sans parler du fait qu\'il a aussi eu le meilleur fight dans l\'anime je me souviens encore des frissons que j\'ai eu étant petit lors du combat contre Elekable]',
  },
  {
    frName: 'Broussatif',
    apiName: 'tangrowth',
    asset: BroussatifGif,
    width: 110,
    className: 'pokemon-trim',
    description: '[Pourquoi j\'apprécie Broussatif\n Ce pokémon n\'est même pas encore jouable à l\'heure où j\'écris cela il y en a encore pour un an et pourtant il s\'est déjà distingué une rédomption à la a-train. D\'abord bully par le monde entier carrément vanné par Angry Brids sur tik tok. Et pourtant le BroussatifLiveMatter est né et il a explosé le net avec ses memes et a fini par détroner Ogeko en cote de popularité]',
  },
  {
    frName: 'Brutalibre',
    apiName: 'hawlucha',
    asset: BrutalibreImg,
    width: 70,
    className: 'pokemon-drop',
    description: '[Pourquoi j\'apprécie Brutalibre\n Comment être mexicain et ne pas parler de Brutalibré !!\n Un Pokémon Catcheur, de type vole et combat, la combinaison de type la plus stylé jamais vu et une aura de malade. \nUn pokémon superhéro, avec une mega de zinzin, sans parler de la vidéo d\'introduction à sa mega qui était juste stylé. Tout ça sans même avoir abordé son shiny qui est juste magnifique, un rouge et vert super flashy, c\'est juste super stylé]',
  },
  {
    frName: 'Mimiqui',
    apiName: 'mimikyu',
    asset: MimikyuGif,
    width: 170,
    wrapperClassName: 'pokemon-half-left pokemon-trim pokemon-drop-lg',
    description: '[Pourquoi j\'apprécie Mimikyu\nLe lore de Mimikyu me fais juste énormément de peine, il se trouve ignoble et se cache donc sous un déguisement de pikachu, Pokémon apprecié par toute la communauté. Etant donné qu\'il ne cherche que l\'acceptation. C\'est juste super triste.\nCependant grace à cela il a un design de dingue, une aura de malade, sans parler de son talent le permettant d\'encaisser des coups.]',
  },
  {
    frName: 'Keldeo',
    apiName: 'keldeo-ordinary',
    asset: KeldeoGif,
    width: 80,
    description: '[Pourquoi j\'apprécie Keldeo\nKeldeo, mon pokémon préféré all time.\nIl m\'a tellement touché quand j\'étais petit, quand j\'ai vu le film sur les lames de la justice, face à Kyurem c\'était juste incroyable. Un pokémon avec une si belle mentalitée et tellement stylé. Sans parler de son shiny, IL EST TROP STYLÉ !!!]',
  },
  {
    frName: 'Lugia',
    apiName: 'lugia',
    asset: LugiaGif,
    width: 110,
    description: '[Pourquoi j\'apprécie Lugia\nLugia est le premier pokémon a m\'avoir impréssioné, ayant commencé la license pokémon par Soulsilver, la découverte de Lugia m\'a juste glacé le sang, c\'était juste incroyable de découvrir un pokémon aussi stylé et puissant. Gardien des mers,le premier légendaire que j\'croisé quand j\'était petit, mon pokémon le plus fort à l\'époque]',
  },
]
