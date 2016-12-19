import { SELECT_DIFFICULTY } from '../constants'

const initialState = '';

export default function difficultyReducer(state = initialState, action) {
  switch(action.type) {

    case SELECT_DIFFICULTY:
    return action.difficulty

    default:
    return state
  }
}
