export interface PokemonListItem {
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

export type PokemonTypeName =
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric'
  | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying'
  | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon'

export const POKEMON_TYPES: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'grass', 'electric',
  'ice', 'fighting', 'poison', 'ground', 'flying',
  'psychic', 'bug', 'rock', 'ghost', 'dragon'
]

export type CurrencyName = PokemonTypeName | 'golden'

export const POKEMON_TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
}