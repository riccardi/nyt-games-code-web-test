import { combineReducers } from 'redux'

import cards from './cards'
import cardsClicked from './cardsClicked'
import time from './time'
import score from './score'


const rootReducer = combineReducers({
  cards,
  cardsClicked,
  time,
  score
});

export default rootReducer;
