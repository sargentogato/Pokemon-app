<template>
  <section class="mt-5">
    <ul class="flex flex-col">
      <button
      v-for="{ name, id } in options"
      @click="$emit('selectedOption', id)"
      :key="id"
      v-bind:class="['capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          'text-2xl correct': id === idSelected && blockSelection,
          incorrect: id !== correctAnswer && id === idSelected
        }
      ]"
      :disabled="blockSelection"
      >{{ name }}</button>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { IPokemon } from '../interface';

interface IProps {
  options: IPokemon[];
  blockSelection: boolean;
  correctAnswer: number,
  idSelected: number
}

defineProps<IProps>();
defineEmits<{ selectedOption: [id: number]; }>()

// const emit = defineEmits<{
//   (e:'selectedOption', id: number):void
// }>()

</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}


.correct {
  @apply bg-green-600 text-white;
}

.incorrect{
  @apply bg-red-600 opacity-70;
}

button {
  padding: 10px 10px;
}
</style>
