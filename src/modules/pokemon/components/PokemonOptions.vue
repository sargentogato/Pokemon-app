<template>
  <section class="mt-5">
    <ul class="flex flex-col">
      <button
      v-for="{ name, id } in options"
      @click="$emit('selectedOption', id)"
      :key="id"
      class="capitalize disabled:shadow-none disabled:bg-gray-100"
      :disabled="blockSelection"
      :class="{'text-4xl': higlightButton === id}"
      >{{ name }}</button>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { IPokemon } from '../interface';

interface IProps {
  options: IPokemon[];
  blockSelection: boolean;
  higlightButton:number
}

defineProps<IProps>();
defineEmits<{ selectedOption: [id: number]; }>()

</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}
</style>
