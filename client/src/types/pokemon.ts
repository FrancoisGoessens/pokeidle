export interface Pkmn {
    name: string
    url: string
}

export interface PokemonSprites {
  front_default: string
  front_shiny: string
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonType {
  slot: number
  type: {
    name: string
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  sprites: PokemonSprites
  stats: PokemonStat[]
  types: PokemonType[]
}