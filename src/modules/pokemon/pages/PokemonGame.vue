<template>
  <section
    v-if="isLoading"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokémon</h1>
    <h3>{{ randomPokemon }}</h3>

    <!-- Pokemon Picture -->
    <PokemonPictures />

    <!-- Pokemon Options -->
    <PokemonOptions />
  </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPictures from '../components/PokemonPictures.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { gameStatus, isLoading, randomPokemon } = usePokemonGame();
</script>

<style lang="scss" scoped></style>
