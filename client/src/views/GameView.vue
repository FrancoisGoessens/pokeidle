<template>
  <v-container class="px-0">
    <v-row class="mb-4">
      <v-col
        v-for="(amount, type) in gameStore.energies"
        :key="type"
        cols="auto"
        class="d-flex align-center ga-2 pr-0"
      >
        <div
          :style="{
            backgroundColor: POKEMON_TYPE_COLORS[type as PokemonTypeName],
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
        >
          <v-img :src="`/src/assets/types/${type}.svg`" :width="18
          " :height="18" />
        </div>
        <span>{{ formatNumber(amount) }}</span>
        <v-btn size="x-small" @click="gameStore.convertToGolden(type, amount)">✨</v-btn>
      </v-col>
      <v-col class="pl-8">
        <v-chip color="orange"
          >✨ Golden Energy : {{ formatNumber(gameStore.goldenEnergy) }}</v-chip
        >
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col>
        <v-btn
          v-for="type in types"
          :key="type"
          class="mr-2 mb-2"
          @click="pokemonStore.filterByType(type)"
        >
          {{ type }}
        </v-btn>
        <v-btn class="mr-2 mb-2" @click="pokemonStore.resetFilter()">Tous</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="pokemonStore.loading">
      <v-col class="text-center">
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="pokemon in pokemonStore.filteredPokemons"
        :key="pokemon.id"
        cols="6"
        sm="3"
        md="2"
        class="text-center"
      >
        <v-img :src="pokemon.sprites.front_default" :width="96" class="mx-auto" />
        <p>{{ pokemon.name }}</p>
        <p class="text-caption">{{ getProductionPerSecond(pokemon) }}/s</p>

        <v-chip v-if="gameStore.isPokemonOwned(pokemon.id)" color="green" size="small">
          Working
        </v-chip>
        <v-btn v-else size="small" @click="gameStore.buyPokemon(pokemon)">
          Recruit ({{ formatNumber(getCost(gameStore.purchaseCounts['golden'] ?? 0)) }} ✨)
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePokemonStore } from '../stores/usePokemonStore'
import { useGameStore } from '../stores/useGameStore'
import { useProductionLoop } from '../composables/useProductionLoop'
import { formatNumber } from '../utils/formatNumber'
import { getCost } from '../utils/scaling'
import { POKEMON_TYPES, POKEMON_TYPE_COLORS, type PokemonTypeName } from '../types/pokemon'

const pokemonStore = usePokemonStore()
const gameStore = useGameStore()
const { start, stop, getProductionPerSecond } = useProductionLoop()
const types = ref(POKEMON_TYPES)

onMounted(async () => {
  await pokemonStore.fetchAllPokemon()
  start()
})

onUnmounted(() => {
  stop()
})
</script>
