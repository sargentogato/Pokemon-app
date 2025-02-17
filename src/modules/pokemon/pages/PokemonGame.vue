<template>
  <section
    v-if="isLoading || randomPokemon?.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
    <h3>{{  errorMessage  }}</h3>
  </section>

  <section
    v-else
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="m-5">¿Quién es este Pokémon</h1>
    <div class="boxBtn">
      <button
        @click="getNextRound()"
        :class="{
          notShow: GameStatus.Playing === 'playing',
          show: GameStatus.Playing !== gameStatus,
        }"
      >
        {{ nextRoundButton }}
      </button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPictures
      :pokemon-id="randomPokemon?.id ?? 0"
      :show-pokemon="GameStatus.Playing !== gameStatus"

    />

    <!-- Pokemon Options -->
     <!--
      gameStatus !== GameStatus.Playing será true cuando ambos valores
      sean distintos. gameStatus tiene "playing y GameStatus.Playing también"
      cuando uno de los dos cambie a otro valor, entonces la condición será true
     -->
    <PokemonOptions
      :options="options ?? []"
      @selected-option="checkAnswer"
      :current-game-state="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon?.id ?? 0"
      :idSelected="idSelected ?? 0"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPictures from '../components/PokemonPictures.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces/interfaces';

const {
  gameStatus,
  isLoading,
  pokemonOptions: options,
  randomPokemon,
  idSelected,
  errorMessage,
  checkAnswer,
  getNextRound,
} = usePokemonGame();

console.log("🚀 ~ options:", options.value);

const nextRoundButton = ref('Next Round');
</script>

<style scoped>
button {
  @apply bg-green-500 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.notShow {
  display: none;
}

.show {
  display: block;
}

.boxBtn {
  height: 60px;
}
</style>
