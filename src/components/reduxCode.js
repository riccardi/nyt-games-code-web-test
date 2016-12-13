import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


/* INITIAL STATE */
const initialState = {
  cards: [],
  score: 0,
  time: 0,
  cardsClicked: 0
};

/* ACTIONS */
const RECEIVE_CARDS = 'RECEIVE_CARDS';
const UPDATE_SCORE = 'UPDATE_SCORE';
const REMOVE_CARDS = 'REMOVE_CARDS';


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

export const fetchCards = (dispatch) => {
  return axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
  .then(({data}) => {
    // console.log("in fetch", data.levels[0].cards)
    const dispatchObj = receiveCards(data.levels[0].cards);
    // console.log("dispatchObj", dispatchObj);
    dispatch(dispatchObj);
  })
  .catch(err => console.error(err));
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
console.log(store.getState());
store.dispatch(updateScore());
console.log(store.getState());
fetchCards(store.dispatch)
.then(() => {
  console.log(store.getState());
});
