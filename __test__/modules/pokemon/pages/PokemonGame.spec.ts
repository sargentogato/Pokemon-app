import PokemonGame from '@pokemon/pages/PokemonGame.vue';
import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';
import { GameStatus } from './../../../../src/modules/pokemon/interfaces/game-status.enum';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';

/* Mock usePokemonGame */
vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonOptions = [
  {
    name: 'bulbasaur',
    id:   1,
  },
  {
    name: 'ivysaur',
    id:   2,
  },
  {
    name: 'venusaur',
    id:   3,
  },
  {
    name: 'charmander',
    id:   4,
  },
];

describe('PokemonGame', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus:     GameStatus.Playing,
      isLoading:      true,
      pokemonOptions: [],
      randomPokemon:  undefined,
      checkAnswer:    vi.fn(),
      getNextRound:   vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);
    expect(wrapper.get('h3').text()).toBe('Cargando Pokémons');
  });
  test('should render PokemonPictures and PokemonOptions', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus:     GameStatus.Playing,
      isLoading:      false,
      pokemonOptions: pokemonOptions,
      randomPokemon:  pokemonOptions.at(0),
      checkAnswer:    vi.fn(),
      getNextRound:   vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    /* \\ es para escapar los : */
    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');
    const imgUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
    const pokemons = pokemonOptions.map((pokemon) => pokemon.name);

    expect(wrapper.find('img').attributes('src')).toBe(imgUrl);
    expect(buttons.length).toBe(4);
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(pokemonOptions[index].name);
    });

    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });
  test('should not show button when GameStatus is Playing', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus:     GameStatus.Playing,
      isLoading:      false,
      pokemonOptions: pokemonOptions,
      randomPokemon:  pokemonOptions.at(0),
      checkAnswer:    vi.fn(),
      getNextRound:   vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test="btn-next-round"]');

    expect(button.classes()).toEqual(['notShow'])
  });
  test('should show button when GameStatus is Won or Lost ', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus:     GameStatus.Won,
      isLoading:      false,
      pokemonOptions: pokemonOptions,
      randomPokemon:  pokemonOptions.at(0),
      checkAnswer:    vi.fn(),
      getNextRound:   vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test="btn-next-round"]');

    expect(button.classes()).toEqual(['show'])
  });
  test('should call function getNextRound when the button is clicked', () => {
    const getNextRoundMock = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      gameStatus:     GameStatus.Won,
      isLoading:      false,
      pokemonOptions: pokemonOptions,
      randomPokemon:  pokemonOptions.at(0),
      checkAnswer:    vi.fn(),
      getNextRound:   getNextRoundMock,
    });

    const getNextRoundMock = vi.fn()

        (usePokemonGame as Mock).mockReturnValue({
          gameStatus:     GameStatus.Won,
          isLoading:      false,
          pokemonOptions: pokemonOptions,
          randomPokemon:  pokemonOptions.at(0),
          checkAnswer:    vi.fn(),
          getNextRound:   getNextRoundMock,
        });


    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test="btn-next-round"]');
    button.trigger('click');
  });
});
