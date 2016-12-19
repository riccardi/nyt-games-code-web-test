import { RECEIVE_CARDS, FLIP_CARD, TURN_TWO_CARDS_OVER, REMOVE_MATCH } from '../constants'
import axios from 'axios'

export const receiveCards = (cards) => ({
  type: RECEIVE_CARDS,
  cards
});

export const flipCard = (card) => ({
  type: FLIP_CARD,
  card
});

export const turnTwoCardsOver = () => ({
  type: TURN_TWO_CARDS_OVER
});

export const removeMatch = () => ({
  type: REMOVE_MATCH
});

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
