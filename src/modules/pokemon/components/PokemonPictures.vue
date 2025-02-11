<template>
  <section>
    <img :class="{'brightness-0': !showPokemon}" :src="pokemonImage" class="h-[200px] fade-in"    alt="Pokemon Image">
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
  pokemonId: number,
  showPokemon?: boolean
}

const props = defineProps<IProps>()

const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`)

</script>

<style scoped>
img{
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}

</style>
