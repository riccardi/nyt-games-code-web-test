import { RECEIVE_CARDS, UPDATE_SCORE, FLIP_CARD, RESET_CARDS_CLICKED, TURN_CARDS_OVER, REMOVE_MATCH, SELECT_DIFFICULTY, RESET_GAME_STATE, SET_TIME } from './constants'

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
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CARDS:
    return Object.assign({}, state, {
      cards: action.cards.map((card, idx) => {
        return {
          id: idx,
          symbol: card,
          flipped: false,
          offBoard: false
        }
      })
    });

    case UPDATE_SCORE:
    return Object.assign({}, state, {
      score: state.score + 1
    });

    case FLIP_CARD:
    return Object.assign({}, state, {
      cards: state.cards.map(card => {
        if (card.id !== action.card.id) {
          return card;
        }
        return Object.assign({}, card, {
          flipped: true
        });
      }),
      cardsClicked: (state.cardsClicked.includes(action.card.id)) ? state.cardsClicked : [...state.cardsClicked, action.card.id]
    });

    case RESET_CARDS_CLICKED:
    return Object.assign({}, state, {
      cardsClicked: []
    });

    case TURN_CARDS_OVER:
    return Object.assign({}, state, {
      cards: state.cards.map(card => {
        if (!state.cardsClicked.includes(card.id)) {
          return card
        }
        return Object.assign({}, card, {
          flipped: false
        })
      }),
      cardsClicked: []
    });

    case REMOVE_MATCH:
    return Object.assign({}, state, {
      cards: state.cards.map(card => {
        if(!state.cardsClicked.includes(card.id)) {
          return card;
        }
        return Object.assign({}, card, {
          offBoard: true
        })
      }),
      cardsClicked: []
    });

    case SELECT_DIFFICULTY:
    return Object.assign({}, state, {
      difficulty: action.difficulty
    })

    case RESET_GAME_STATE:
    return Object.assign({}, state, {
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
    });

    case SET_TIME:
    return Object.assign({}, state, {
      time: action.time
    })

    default:
    return state;
  }
}

export default reducer;
