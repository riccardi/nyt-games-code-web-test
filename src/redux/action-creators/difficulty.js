import { SELECT_DIFFICULTY } from '../constants.js'

export const selectDifficulty = (difficulty) => ({
  type: SELECT_DIFFICULTY,
  difficulty
})
