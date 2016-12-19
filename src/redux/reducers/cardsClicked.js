import { ADD_TO_CARDS_CLICKED, RESET_CARDS_CLICKED } from '../constants'

const initialState = []

export default function cardsClickedReducer(state = initialState, action) {
    switch (action.type) {

      case ADD_TO_CARDS_CLICKED:
      return [...state, action.cardId]

      case RESET_CARDS_CLICKED:
      return []

      default:
      return state
    }
}
