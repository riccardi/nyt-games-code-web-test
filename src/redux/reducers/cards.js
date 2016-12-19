import { RECEIVE_CARDS, FLIP_CARD } from '../constants'

const initialState = [{
  id: 0,
  symbol: '',
  flipped: false,
  offBoard: false
}]

export default function cardsReducer(state = initialState, action) {
  switch(action.type) {

    case RECEIVE_CARDS:
    let cards = action.cards.map((card, idx) => {
      return {
        id: idx,
        symbol: card,
        flipped: false,
        offBoard: false
      }
    });
    return cards;

    case FLIP_CARD:
     return state.map(card => {
      if (card.id !== action.card.id) {
        return card;
      }
      return Object.assign({}, card, {
        flipped: true
      })
    });


    // case TURN_TWO_CARDS_OVER:
    // return return state.cards.map(card => {
    //     if (card.id !== state.cardsClicked[0] && card.id !== state.cardsClicked[1]) {
    //       return card
    //     }
    //     return Object.assign({}, card, {
    //       flipped: false
    //     })
    //   }),
    //   cardsClicked: []
    // });

    default:
    return state
  }
}
