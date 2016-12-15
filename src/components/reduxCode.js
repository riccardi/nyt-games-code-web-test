import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


/* INITIAL STATE */
const initialState = {
  cards: [{
    id: 0,
    symbol: '',
    flipped: false,
    offBoard: false
  }],
  score: 0,
  cardsClicked: []
};

/* ACTIONS */
const RECEIVE_CARDS = 'RECEIVE_CARDS';
const UPDATE_SCORE = 'UPDATE_SCORE';
const FLIP_CARD = 'FLIP_CARD';
const RESET_CARDS_CLICKED = 'RESET_CARDS_CLICKED';
const TURN_TWO_CARDS_OVER = 'TURN_TWO_CARDS_OVER';
const REMOVE_MATCH = 'REMOVE_MATCH';



/* REDUCERS */

/* Think about separating out reducers - one that deals with cards and one that deals with cardsClicked - is this a good idea? */
function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CARDS:
    return Object.assign({}, state, {
      cards: action.cards
    });

    case UPDATE_SCORE:
    return Object.assign({}, state, {
      score: state.score + 1
    });

    case FLIP_CARD:
    // console.log('IN FLIP_CARD');
    // console.log('action.card', action.card);
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

    case TURN_TWO_CARDS_OVER:
    // console.log('IN TURN_TWO_CARDS_OVER');
    return Object.assign({}, state, {
      cards: state.cards.map(card => {
        if (card.id !== state.cardsClicked[0] && card.id !== state.cardsClicked[1]) {
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
        if(card.id !== state.cardsClicked[0] && card.id !== state.cardsClicked[1]) {
          return card;
        }
        return Object.assign({}, card, {
          offBoard: true
        })
      }),
      cardsClicked: []
    });

    default:
    return state;
  }
}

/* DISPATCHERS */
export const receiveCards = (cards) => ({
  type: RECEIVE_CARDS,
  cards
});

export const updateScore = () => ({
  type: UPDATE_SCORE
});

export const flipCard = (card) => ({
  type: FLIP_CARD,
  card
});

export const resetCardsClicked = () => ({
  type: RESET_CARDS_CLICKED
})

export const turnTwoCardsOver = () => ({
  type: TURN_TWO_CARDS_OVER
});

export const removeMatch = () => ({
  type: REMOVE_MATCH
});

//a function that returns a function that takes dispatch as its argument
//for thunk middleware which allows us to make async dispatch calls
export const fetchCards = () => dispatch => {
  axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
  .then(({data}) => {

    const cards = data.levels[0].cards.map((card, idx) => {
      return {
        id: idx,
        symbol: card,
        flipped: false,
        offBoard: false
      }
    });

    dispatch(receiveCards(cards));
  })
  .catch(err => console.error(err));
}


export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
