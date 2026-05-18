import type { PokemonListItem, Pokemon } from '@/types/pokemon'

export async function getAllPokemon(): Promise<PokemonListItem[] | undefined> {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151"
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`)
    }
    const result = await response.json()
    return result.results
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
  }
}

export async function getPokemonByType(type: string): Promise<PokemonListItem[] | undefined>  {
  const url = `https://pokeapi.co/api/v2/type/${type}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`)
    }
    const result = await response.json()
    return result.pokemon.map((p: { pokemon: PokemonListItem }) => p.pokemon)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
  }
}

export async function getPokemonDetail(url: string): Promise<Pokemon | undefined> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
  }
}