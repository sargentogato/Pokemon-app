import { pokemonApi } from '@pokemon/api/pokemonApi'

describe("pokemonApi", () => {
  test("should be configured as expected", () => {
    //Arrange
    const baseURL = 'https://pokeapi.co/api/v2/pokemon';
    const result  = pokemonApi.defaults.baseURL

    //Act

    //Assert
    expect(baseURL).toBe(result)
  })
})
