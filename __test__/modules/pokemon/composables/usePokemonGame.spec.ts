import { GameStatus } from '@pokemon/interfaces/game-status.enum.ts';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti'; //esto es una función de vitest


import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { pokemonListFake } from '../../../dataMock/fake-pokemons';
import { withSetup } from '../../../utils/with-setup';

/* Mock de la llamada a API */
const mockPokemonApi = new MockAdapter(pokemonApi);
mockPokemonApi.onGet('/?limit=157').reply(200, {
  results: pokemonListFake
},)

/* Mock del paquete canvas-confetti esto simula la llamada a la función*/
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}) );

describe('usePokemonGame', () => {
  test('should inicialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame);
    const numberOfPokemonsToPlay = 4

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await flushPromises()

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toEqual(numberOfPokemonsToPlay);
    expect(results.randomPokemon.value).toEqual({
      id:   expect.any(Number),
      name: expect.any(String)
    });
  });
  test('should correctly handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    //Act
    results.getNextRound(5);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value).toHaveLength(5);
  });
  test("should correctly handle getNextRound and return different pokemons", async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const firstPokemonOptions = results.pokemonOptions.value;
    const firstOption = [...results.pokemonOptions.value].map((p) => p.name);
    /* Otra forma de evaluación */

    results.getNextRound(); //default 4

    const newPokemonOptions = results.pokemonOptions.value;
    const secondOption = [...results.pokemonOptions.value]; /* Otra forma de evaluación */

    expect(firstPokemonOptions).not.to.equal(newPokemonOptions);
    firstOption.forEach((pokemon) => {
      expect(secondOption).not.to.contain(pokemon.name);
    });
  })
  test("should correctly handle incorrect answer", async() => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises()
    const { checkAnswer, gameStatus } = results

    expect(gameStatus.value).toBe(GameStatus.Playing)

    checkAnswer(100000000); //id pokemon no existe

    expect(gameStatus.value).toBe(GameStatus.Lost)
  })
  test("should correctly handle correct answer", async() => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises()
    const { checkAnswer, gameStatus, randomPokemon } = results;

    //Act
    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalled()
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread:        200,
      origin:        { y: 0.5, x: 0.5 },
    });
    expect(gameStatus.value).toBe(GameStatus.Won)
  })
});
