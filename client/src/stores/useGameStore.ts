import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon, PokemonTypeName, CurrencyName } from '../types/pokemon'
import { POKEMON_TYPES } from '../types/pokemon'
import { getCost } from '../utils/scaling'

export const useGameStore = defineStore('game', () => {
  const energies = ref<Record<PokemonTypeName, number>>(
    Object.fromEntries(POKEMON_TYPES.map((t) => [t, 0])) as Record<PokemonTypeName, number>,
  )

  const goldenEnergy = ref(100)

  const ownedPokemons = ref<Pokemon[]>([])

  const purchaseCounts = ref<Record<CurrencyName, number>>(
    Object.fromEntries([...POKEMON_TYPES, 'golden'].map((t) => [t, 0])) as Record<
      CurrencyName,
      number
    >,
  )

  function buyPokemon(pokemon: Pokemon): boolean {
    const cost = getCost(purchaseCounts.value['golden'] ?? 0)

    if (goldenEnergy.value < cost) return false

    goldenEnergy.value -= cost
    purchaseCounts.value['golden'] = (purchaseCounts.value['golden'] ?? 0) + 1
    ownedPokemons.value.push(pokemon)
    return true
  }

  function convertToGolden(type: string, amount: number) {
    energies.value[type as PokemonTypeName] = 0
    goldenEnergy.value += amount
  }

  function addEnergy(type: string, amount: number) {
    if (energies.value[type as PokemonTypeName] !== undefined) {
      energies.value[type as PokemonTypeName] += amount
    }
  }


  function isPokemonOwned(id: number): boolean {
    return ownedPokemons.value.some((p) => p.id === id)
  }

  return {
    energies,
    goldenEnergy,
    ownedPokemons,
    purchaseCounts,
    buyPokemon,
    convertToGolden,
    addEnergy,
    isPokemonOwned,
  }
})
