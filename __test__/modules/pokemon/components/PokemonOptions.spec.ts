import PokemonOptions from '@pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';

const options = [
  { id: 1, name: 'Persian' },
  { id: 2, name: 'Slowpoke' },
  { id: 3, name: 'Venomotho' },
  { id: 4, name: 'Electabuzz' },
];

describe("PokemonOption", () => {
  test("should render buttons with correct text", () => {
    //Arrange
    const wrapper = mount(PokemonOptions, {
      props: {
        options:          options,
        currentGameState: true,
        correctAnswer:    2,
        idSelected:       1,
      },
    });

    //Act
    const buttons = wrapper.findAll('button');

    //Verifico que estén todos los botones renderizados
    expect(options.length).toBe(buttons.length)
    //Verifico el texto de todos los botones
    buttons.forEach((button, index) => {
      expect(button.attributes('class')).contain('capitalize disabled:shadow-none disabled:bg-gray-100');
      expect(button.text()).toBe(options[index].name)
    })
  })
  test("should emit selectedOption event when a button is clicked", () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options:          options,
        currentGameState: false,
        correctAnswer:    2,
        idSelected:       1,
      }
    })


    const buttons = wrapper.findAll('button');
    buttons.forEach(( button) => {
      button.trigger('click')
    })
    // await b1.trigger('click')
    // await b2.trigger('click')
    // await b3.trigger('click')
    // await b4.trigger('click')

    expect(wrapper.emitted().selectedOption).toBeTruthy()
    expect(wrapper.emitted('selectedOption')?.[0]).toEqual([1])
    expect(wrapper.emitted().selectedOption[1]).toEqual([2])
    expect(wrapper.emitted().selectedOption[2]).toEqual([3])
    expect(wrapper.emitted().selectedOption[3]).toEqual([4])
  })
  test("should disable buttons when currentGameState prop is true", () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        currentGameState: true,
        correctAnswer:    1,
        idSelected:       1
      }
    })

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      const attribute = Object.keys(button.attributes());
      expect(attribute).toContain('disabled')
    })
  })
  test('should apply correct styling to buttons based on correct answer', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        currentGameState: true,
        correctAnswer:    1,
        idSelected:       1,
      },
    });

    const buttons = wrapper.findAll('button');
     const idSelected = wrapper.vm.idSelected;
     const correctAnswer = wrapper.vm.correctAnswer;

    buttons.forEach((button, index) => {
      if (options[index].id === idSelected && options[index].id === correctAnswer) {
        expect(button.classes()).toContain('correct');
      }
    })
  })
  test('should apply incorrect class to buttons base on incorrect answer', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        currentGameState: true,
        correctAnswer:    1,
        idSelected:       2,
      },
    });

    const buttons = wrapper.findAll('button');
    const idSelected = wrapper.vm.idSelected;
    const correctAnswer = wrapper.vm.correctAnswer

    buttons.forEach((button, index) => {
      if (options[index].id === idSelected && options[index].id !== correctAnswer) {
        expect(button.classes()).toContain('incorrect')
      }
    })

  })
})
