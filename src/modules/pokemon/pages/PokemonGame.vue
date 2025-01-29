<template>
  <section
    v-if="isLoading || randomPokemon?.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokémon</h1>
    <h3 class="capitalize" :class="{'text-5xl': gameStatus !== GameStatus.Playing }">{{ gameStatus }}</h3>

    <!-- Pokemon Picture -->
    <PokemonPictures :pokemon-id="randomPokemon?.id ?? 0" :show-pokemon="GameStatus.Playing !== gameStatus"/>

    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options ?? []"
      @selected-option="checkAnswer"
      :block-selection="gameStatus !== GameStatus.Playing"
      :higlightButton="higlightButton"
    />
  </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPictures from '../components/PokemonPictures.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interface';

const { gameStatus, isLoading, randomPokemon, pokemonOptions: options, checkAnswer, higlightButton } = usePokemonGame();

</script>

<style lang="scss" scoped></style>
