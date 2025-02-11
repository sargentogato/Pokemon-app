import PokemonPictures from '@/modules/pokemon/components/PokemonPictures.vue';
import { mount } from '@vue/test-utils';
import { computed } from 'vue';

describe('PokemonPicture', () => {
  test('should render the hidden image when showPokemn prop is false', () => {
    //arrange
    const wrapper = mount(PokemonPictures, {
      props: {
        pokemonId:   2,
        showPokemon: false
      },
    });

    const classToHiddeImage = 'brightness-0';
    const computedURL = (wrapper.vm as unknown as { pokemonImage: string; }).pokemonImage
    const img = wrapper.find("img");
    const src = img.attributes("src")
    const attributes = img.attributes()

    //Assert
    expect(img.exists()).toBe(true);
    expect(img.classes()).toContain(classToHiddeImage);
    expect(wrapper.vm.showPokemon).toBe(false);
    expect(computedURL).toBe(src);

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px] fade-in',
        src,
        alt:   'Pokemon Image',
      }),
    );
  })
  test('should render en show the image when showPokemon prop is true', () => {
    const wrapper = mount(PokemonPictures, {
      props: {
        pokemonId:   1,
        showPokemon: true
      }
    })

    const classToHiddeImage = 'brightness-0';

    const img = wrapper.find("img");
    const attributes = img.attributes()
    const src = img.attributes("src")

    expect(img.exists()).toBe(true);
    expect(img.classes()).not.toContain(classToHiddeImage);
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'h-[200px] fade-in',
        src,
        alt:   'Pokemon Image',
      }),
    );
  })
})
