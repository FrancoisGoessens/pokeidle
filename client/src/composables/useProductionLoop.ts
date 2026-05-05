import { ref } from 'vue'
import { useGameStore } from '../stores/useGameStore'
import type { Pokemon } from '../types/pokemon'

const globalTick = ref(0)
let interval: ReturnType<typeof setInterval> | null = null
let instanceCount = 0

export function useProductionLoop() {
  const gameStore = useGameStore()

  function getProductionPerSecond(pokemon: Pokemon): number {
    const speed = pokemon.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0
    return speed / 50
  }

  function tick() {
    globalTick.value++

    gameStore.ownedPokemons.forEach((pokemon) => {
      const types = pokemon.types.map((t) => t.type.name)

      if (types.length === 1 && types[0]) {
        gameStore.addEnergy(types[0], getProductionPerSecond(pokemon))
      } else {
        const tick = Math.floor(Date.now() / 1000)
        const activeType = types[globalTick.value % 2]
        if (activeType) {
          gameStore.addEnergy(activeType, getProductionPerSecond(pokemon))
        }
      }
    })
  }

  function start() {
    instanceCount++
    if (!interval) {
      interval = setInterval(tick, 1000)
    }
  }

  function stop() {
    instanceCount--
    if (instanceCount <= 0 && interval) {
      clearInterval(interval)
      interval = null
    }
  }

  return { start, stop, getProductionPerSecond }
}
