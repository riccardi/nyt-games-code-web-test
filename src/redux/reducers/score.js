import { UPDATE_SCORE } from '../constants'

const initialState = 0;

export default function scoreReducer(state = initialState, action) {
  switch (action.type) {

    case UPDATE_SCORE:
    return state + 1

    default:
    return state

  }
}
