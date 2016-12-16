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
  cardsClicked: [],
  difficulty: "easy",
  time: 0
};

/* ACTIONS */
const RECEIVE_CARDS = 'RECEIVE_CARDS';
const UPDATE_SCORE = 'UPDATE_SCORE';
const FLIP_CARD = 'FLIP_CARD';
const RESET_CARDS_CLICKED = 'RESET_CARDS_CLICKED';
const TURN_TWO_CARDS_OVER = 'TURN_TWO_CARDS_OVER';
const REMOVE_MATCH = 'REMOVE_MATCH';
const SELECT_DIFFICULTY = 'SELECT_DIFFICULTY';
const RESET_GAME_STATE = 'RESET_GAME_STATE';
const SET_TIME = 'SET_TIME';



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

export const selectDifficulty = (difficulty) => ({
  type: SELECT_DIFFICULTY,
  difficulty
})

export const resetGameState = () => ({
  type: RESET_GAME_STATE
})

export const setTime = (time) => ({
  type: SET_TIME,
  time
})

//a function that returns a function that takes dispatch as its argument
//for thunk middleware which allows us to make async dispatch calls
export const fetchCards = () => (dispatch, getState) => {
  axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
  .then(({data}) => {
    let difficultyIndex;
    data.levels.forEach((level, idx) => {
      //Should I really be using getState() here??
      if (getState().difficulty === level.difficulty) difficultyIndex = idx;
    })
    const cards = data.levels[difficultyIndex].cards.map((card, idx) => {
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
