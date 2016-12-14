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

    const dispatchObj = receiveCards(data.levels[0].cards);
    dispatchObj.cards.forEach((card, id) => {
      dispatchObj.cards[id] = {
        id: id,
        symbol: card,
        flipped: false,
        offBoard: false
      }
    });
    // console.log("dispatchObj", dispatchObj);
    dispatch(receiveCards(dispatchObj.cards));
  })
  .catch(err => console.error(err));
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
