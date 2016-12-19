import { RESET_GAME_STATE } from '../constants'

const initialState = {
  cards: [{
    id: 0,
    symbol: '',
    flipped: false,
    offBoard: false
  }],
  score: 0,
  cardsClicked: [],
  difficulty: "easy",
  time: 0
};

export default function resetReducer(state = initialState, action) {
  switch(action.type) {

    case RESET_GAME_STATE:
    return initialState

    default:
    return state
  }
}
