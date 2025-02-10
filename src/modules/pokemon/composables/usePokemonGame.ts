import confetti from 'canvas-confetti';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '../api/pokemonApi';
import { GameStatus, type IPokemon, type IPokemonListResponse } from '../interfaces/interfaces';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<IPokemon[]>([]);
  const pokemonOptions = ref<IPokemon[]>();
  const idSelected = ref<number>()

  const isLoading = computed(() => pokemons.value.length === 0);

  /* Llamada a la API */
  const getPokemons = async (): Promise<IPokemon[]> => {
    const response = await pokemonApi.get<IPokemonListResponse>('/?limit=15');

    const pokemonList = extractPokemonNameAndId(response.data);

    return shufflePokemonList(pokemonList);
  };

  /* Extrae de los datos sólo el name y el id */
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

  /* Mezcla los pokemos de manera aleatoria */
  const shufflePokemonList = (arr: IPokemon[]) => {
    const arrCopy = [...arr];

    for (let i = arrCopy.length - 1; i > 0; i--) {
      const randomNumber = Math.floor(Math.random() * (i + 1));

      [arrCopy[randomNumber], arrCopy[i]] = [arrCopy[i], arrCopy[randomNumber]];
    }

    return arrCopy;
  };

  const randomPokemon = computed(() => {
    if (!pokemonOptions.value?.length) return;

    const selectedPokemon = Math.floor(Math.random() * pokemonOptions.value!.length);

    return pokemonOptions.value![selectedPokemon!];
  });

  // const randomPokemon = computed(() => pokemonOptions.value![Math.floor(Math.random() * pokemonOptions.value!.length)].name)

  const getNextRound = async (howMany: number = 4) => {
    console.log("Cantidad de pokemons restantes", pokemons.value.length);

    if (pokemons.value.length < howMany) {
      console.log("Poekmos antes de la llamda a getPokemons", pokemons.value.length);
      pokemons.value = await getPokemons()
      console.log('Cantidad de pokemons Después de la llamda a getPokemos', pokemons.value.length);
    }


    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany); //Devuelve los primeros 4 elementos(0,1,2,3)
    pokemons.value = pokemons.value.slice(howMany); //Devuelve el array con los elementos a partir del index 4 (no incluye el 4)
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value?.id === id;
    idSelected.value = id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread:        200,
        origin:        { y: 0.5, x: 0.5 },
      });

      return;
    }

    gameStatus.value = GameStatus.lost;
  };

  onMounted(async () => {
    await new Promise((response) => setTimeout(response, 0));

    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    randomPokemon,
    pokemonOptions,
    idSelected,

    //Methods
    getNextRound,
    checkAnswer,
  };
};
