import { SET_TIME } from '../constants'

const initialState = '';

export default function difficultyReducer(state = initialState, action) {
  switch(action.type) {

    case SET_TIME:
    return action.time

    default:
    return state
  }
}
