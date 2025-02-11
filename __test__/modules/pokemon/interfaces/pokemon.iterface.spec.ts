import type { IPokemon } from '@/modules/pokemon/interfaces/pokemon.interface';

describe('Pokemon Interface', () => {
  const pokemon: IPokemon = { id: 1, name: 'bulbasur'}

  test('should have and id property with type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number))
  })

  test('should have any name with type string', () => {
    expect(pokemon.name).toEqual(expect.any(String))
  })
})
