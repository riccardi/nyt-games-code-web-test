import { RECEIVE_CARDS, UPDATE_SCORE, FLIP_CARD, RESET_CARDS_CLICKED, TURN_CARDS_OVER, REMOVE_MATCH, SELECT_DIFFICULTY, RESET_GAME_STATE, SET_TIME } from './constants'

import axios from 'axios'

export const receiveCards = (cards) => ({
  type: RECEIVE_CARDS,
  cards
});

export const flipCard = (card) => ({
  type: FLIP_CARD,
  card
});

export const turnCardsOver = () => ({
  type: TURN_CARDS_OVER
});

export const removeMatch = () => ({
  type: REMOVE_MATCH
});

export const updateScore = () => ({
  type: UPDATE_SCORE
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
export const fetchCards = (difficulty) => (dispatch, getState) => {
  if (difficulty === 'triples') {
    console.log('in triples in fetchCards')
    axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/triples.json')
    .then(({data}) => {
      dispatch(receiveCards(data.cards));
    })
    .catch(err => console.error(err));
  } else {
    if (difficulty === 'beatTheClock') difficulty = 'easy'
    axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
    .then(({data}) => {
      let difficultyIndex;
      data.levels.forEach((level, idx) => {
        if (difficulty === level.difficulty) return difficultyIndex = idx;
      })
      dispatch(receiveCards(data.levels[difficultyIndex].cards));
    })
    .catch(err => console.error(err));
  }
}
