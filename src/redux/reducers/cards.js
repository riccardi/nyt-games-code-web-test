import { RECEIVE_CARDS, FLIP_CARD, TURN_TWO_CARDS_OVER, REMOVE_MATCH } from '../constants'

const initialState = [{
  id: 0,
  symbol: '',
  flipped: false,
  offBoard: false
}]

export default function cardsReducer(state = initialState, action) {
  switch(action.type) {

    case RECEIVE_CARDS:
    return action.cards.map((card, idx) => {
      return {
        id: idx,
        symbol: card,
        flipped: false,
        offBoard: false
      }
    })

    case FLIP_CARD:
    return state.map(card => {
      if (card.id !== action.card.id) {
        return card;
      }
      return Object.assign({}, card, {
        flipped: true
      })
    })

    case TURN_TWO_CARDS_OVER:
    return state.map(card => {
      if (card.id !== action.cardsClicked[0] && card.id !== action.cardsClicked[1]) {
        return card
      }
      return Object.assign({}, card, {
        flipped: false
      })
    })

    case REMOVE_MATCH:
    return state.map(card => {
      if (card.id !== action.cardsClicked[0] && card.id !== action.cardsClicked[1]) {
        return card
      }
      return Object.assign({}, card, {
        offBoard: true
      })
    })

    default:
    return state
  }
}
