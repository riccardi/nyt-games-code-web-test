import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


/* INITIAL STATE */
const initialState = {
  cards: [{
    id: 0,
    symbol: '',
    flipped: false
  }],
  score: 0,
  // time: 0,
  cardsClicked: []
};

/* ACTIONS */
const RECEIVE_CARDS = 'RECEIVE_CARDS';
const UPDATE_SCORE = 'UPDATE_SCORE';
const FLIP_CARD = 'FLIP_CARD';


/* REDUCERS */
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
    return Object.assign({}, state, {
      cards: state.cards.map(card => {
        if (card.id !== action.card.id) {
          return card;
        }
        return Object.assign({}, card, {
          flipped: !card.flipped
        });
      })
    });

    // case ADD_CARD_CLICKED:
    //   return Object.assign({}, state, {
    //     cardsClicked: [...state.cardsClicked, action.card]
    //   })
    //
    // case CHECK_FOR_MATCH:
    //   if (state.cardsClicked[0] === state.cardsClicked[1]) {
    //     return Object.assign({}, state, {
    //       cardsClicked: [],
    //       score: state.score + 1
    //     });
    //   } else {
    //     return Object.assign({}, state, {
    //       cardsClicked: []
    //     });
    //   }

    // case FLIP_CARD:
    //   if (state.cardsClicked.length < 2) {
    //     return Object.assign({}, state, {
    //       // cards[action.card.index].flipped: !state.cards[action.card.index].flipped,
    //       cardsClicked: [...state.cardsClicked, action.card]
    //     })
    //   } else {
    //     //see if both cards are a match
    //     if (cardsClicked[0].symbol === cardsClicked[1].symbol) {
    //       //if they are then remove them from board
    //       //add 1 to score
    //     } else {
    //       //if they are not
    //       //flip both cards in cardsClicked over
    //     }
    //
    //     return Object.assign({}, state, {
    //       cardsClicked: []
    //     })
    //   }

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

//a function that returns a function that takes dispatch as its argument
//for thunk middleware which allows us to make async dispatch calls
export const fetchCards = () => dispatch => {
  axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
  .then(({data}) => {

    const dispatchObj = receiveCards(data.levels[0].cards);
    dispatchObj.cards.forEach((card, id) => {
      dispatchObj.cards[id] = {
        id: id,
        symbol: card,
        flipped: false
      }
    });
    console.log("dispatchObj", dispatchObj);
    dispatch(receiveCards(dispatchObj.cards));
  })
  .catch(err => console.error(err));
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
