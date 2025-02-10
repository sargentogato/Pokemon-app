import PokemonPictures from '@/modules/pokemon/components/PokemonPictures.vue';
import { mount } from '@vue/test-utils';

describe('PokemonPicture', () => {
  test('should render the hidden image when showPokemn prop is false', () => {
    //arrange
    const wrapper = mount(PokemonPictures, {
      props: {
        pokemonId:   1,
        showPokemon: false
      },
    });

    const classToHiddeImage = 'brightness-0';

    //Act
    const element = wrapper.find("img");

    //Assert
    expect(element.exists()).toBe(true);
    expect(element.classes()).toContain(classToHiddeImage)
    expect(wrapper.vm.showPokemon).toBe(false)
  })
  test('should render en show the image when showPokemon prop is true', () => {
    const wrapper = mount(PokemonPictures, {
      props: {
        pokemonId:   1,
        showPokemon: true
      }
    })

    const classToHiddeImage = 'brightness-0';

    const element = wrapper.find("img");

    expect(element.exists()).toBe(true);
    expect(element.classes()).not.toContain(classToHiddeImage)
    expect(wrapper.vm.showPokemon).toBe(true)
  })
})
