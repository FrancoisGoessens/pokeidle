import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllPokemon, getPokemonByType, getPokemonDetail } from '../services/pokeapi'
import type { Pokemon } from '@/types/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref<Pokemon[]>([])
  const filteredPokemons = ref<Pokemon[]>([])
  const loading = ref(false)

  async function fetchAllPokemon() {
    loading.value = true
    const list = await getAllPokemon()
    if (list) {
      const details = await Promise.all(list.map((p) => getPokemonDetail(p.url)))
      pokemons.value = details.filter((p): p is Pokemon => p !== undefined)
      filteredPokemons.value = pokemons.value
    }
    loading.value = false
  }

  async function filterByType(type: string) {
    const typeList = await getPokemonByType(type)
    if (typeList) {
      filteredPokemons.value = pokemons.value.filter((p) => typeList.some((t) => t.name === p.name))
    }
  }

  function resetFilter() {
    filteredPokemons.value = pokemons.value
  }

  return { pokemons, filteredPokemons, loading, fetchAllPokemon, filterByType, resetFilter }
})
