import { GameStatus } from '@pokemon/interfaces/game-status.enum.ts'


describe('game-status.enum', () => {
  test('should have a value "playing"', () => {
    const playing = GameStatus.Playing
    const result = "playing"

    expect(playing).toBe(result);
  })
  test('should have a value "won"', () => {
    const won = GameStatus.Won
    const result = "won"

    expect(won).toBe(result)
  })
  test('should have a value "lost', () => {
    const lost = GameStatus.Lost
    const result = "lost"

    expect(lost).toBe(result)
  })
})
