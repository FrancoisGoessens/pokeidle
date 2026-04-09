<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>PokéIdle Home 🔥</h1>
        <v-btn @click="clear" icon="mdi-refresh" size="small"></v-btn>
        <v-btn @click="niveau1">Niveau 1</v-btn>
        <v-btn @click="niveau2">Niveau 2</v-btn>
        <v-btn @click="niveau3">Niveau 3</v-btn>
        <v-btn @click="niveau4">Niveau 4</v-btn>
      </v-container>
      <v-container>
        <div v-for="image in pokemonImages" :key="image.id">
          <v-img :width="200" :src="image.sprites.front_default"/>
          <p>{{ image.id }} - {{ image.name.toUpperCase() }}</p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { Pkmn, Pokemon } from '@/types/pokemon'

  const pokemons = ref<Pkmn[]>([])
  const pokemonImages = ref<Pokemon[]>([])

  async function getData() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20"
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`)
      }

      const result = await response.json()
      pokemons.value = result.results
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  function clear() {
    pokemonImages.value = []
  }

  function niveau1() {
    console.log(pokemons.value)
  }

  function niveau2() {
    pokemons.value.forEach((e) => console.log(e.name))
  }

  function niveau3() {
    console.log(pokemons.value.filter((e) => e.name.includes('a')))
  }

  async function niveau4() {
    const pkmn = pokemons.value.slice(0,3)
    const responses = await Promise.all(pkmn.map(p => fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)))
    pokemonImages.value = await Promise.all(responses.map(r => r.json()))
  }

  onMounted(() => {
    getData()
  })
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
