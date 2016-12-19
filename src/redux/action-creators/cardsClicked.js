import { ADD_TO_CARDS_CLICKED, RESET_CARDS_CLICKED } from '../constants'


export const resetCardsClicked = () => ({
  type: RESET_CARDS_CLICKED
})

export const addCardToCardsClicked = (cardId) => ({
  type: ADD_TO_CARDS_CLICKED,
  cardId
})
