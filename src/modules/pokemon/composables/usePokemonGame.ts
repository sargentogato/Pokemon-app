import confetti from 'canvas-confetti';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '../api/pokemonApi';
import { GameStatus, type IPokemon, type IPokemonListResponse } from '../interface';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<IPokemon[]>([]);
  const pokemonOptions = ref<IPokemon[]>();
  const higlightButton = ref<number>(0)

  const isLoading = computed(() => pokemons.value.length === 0);

  const randomPokemon = computed(() => {
    if (!pokemonOptions.value?.length) return;

    const selectedPokemon = Math.floor(Math.random() * pokemonOptions.value!.length);

    return pokemonOptions.value![selectedPokemon!];
  });

  // const randomPokemon = computed(() => pokemonOptions.value![Math.floor(Math.random() * pokemonOptions.value!.length)].name)

  const getPokemons = async (): Promise<IPokemon[]> => {
    const response = await pokemonApi.get<IPokemonListResponse>('/?limit=151');

    const pokemonList = extractPokemonNameAndId(response.data);

    return shufflePokemonList(pokemonList);
  };

  const extractPokemonNameAndId = (response: IPokemonListResponse) => {
    const pokemonArray = response.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;

      return {
        name: pokemon.name,
        id:   +id,
      };
    });

    return pokemonArray;
  };

  const shufflePokemonList = (arr: IPokemon[]) => {
    const arrCopy = [...arr];

    for (let i = arrCopy.length - 1; i > 0; i--) {
      const randomNumber = Math.floor(Math.random() * (i + 1));

      [arrCopy[randomNumber], arrCopy[i]] = [arrCopy[i], arrCopy[randomNumber]];
    }

    return arrCopy;
  };

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany); //Devuelve los primeros 4 elementos(0,1,2,3)
    pokemons.value = pokemons.value.slice(howMany); //Devuelve el array con los elementos a partir del index 4 (no incluye el 4)
  };

  const checkAnswer = (id:number) => {
    const hasWon = randomPokemon.value?.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won
      confetti({
        particleCount: 300,
        spread:        200,
        origin:        { y: 0.5, x: 0.5 }
      });

      higlightButton.value = id;
      return
    }

    gameStatus.value = GameStatus.lost;
  }

  onMounted(async () => {
    await new Promise((response) => setTimeout(response, 0));

    pokemons.value = await getPokemons();
    getNextOptions();
  });

  return {
    gameStatus,
    isLoading,
    randomPokemon,
    pokemonOptions,
    higlightButton,

    //Methods
    getNextOptions,
    checkAnswer
  };
};
