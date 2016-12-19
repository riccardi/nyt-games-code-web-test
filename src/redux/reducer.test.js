import reducer from './reducer'
import { RECEIVE_CARDS, FLIP_CARD, TURN_TWO_CARDS_OVER, REMOVE_MATCH } from './constants'

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

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
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
    })
  })

  it('should handle RECEIVE_CARDS', () => {
    expect(
      reducer({}, {
        type: RECEIVE_CARDS,
        cards: [
          "✈",
          "♘"
        ]
      })
    ).toEqual(
      {
        cards:
        [
          {
            id: 0,
            symbol: "✈",
            flipped: false,
            offBoard: false
          },
          {
            id: 1,
            symbol: "♘",
            flipped: false,
            offBoard: false
          }
        ]
      }
    )
  })

  let stateWithTwoCardsFaceDown = {
    cards:[
      {
        id: 0,
        symbol: "✈",
        flipped: false,
        offBoard: false
      },
      {
        id: 1,
        symbol: "♘",
        flipped: false,
        offBoard: false
      }
    ],
    cardsClicked: []
  }

  it('FLIP_CARD should receive a card, change flipped to true, and add card to cardsClicked', () => {
    expect(
      reducer(stateWithTwoCardsFaceDown, {
        type: FLIP_CARD,
        card: {
          id: 1,
          symbol: "♘",
          flipped: false,
          offBoard: false
        }
      })
    ).toEqual(
      {
        cards:
        [
          {
            id: 0,
            symbol: "✈",
            flipped: false,
            offBoard: false
          },
          {
            id: 1,
            symbol: "♘",
            flipped: true,
            offBoard: false
          }
        ],
        cardsClicked: [1]
      }
    )
  })

  let stateWithTwoCardsFaceUp = {
    cards: [
      {
        id: 0,
        symbol: "✈",
        flipped: true,
        offBoard: false
      },
      {
        id: 1,
        symbol: "♘",
        flipped: true,
        offBoard: false
      }
    ],
    cardsClicked: [0,1]
  }

  it('TURN_TWO_CARDS_OVER should receive two cards and change flipped for both to false. It should also reset cardsClicked', () => {
    expect(
      reducer(stateWithTwoCardsFaceUp, {
        type: TURN_TWO_CARDS_OVER,
        cardsClicked: [0,1]
      })
    ).toEqual(
      {
        cards: [
          {
            id: 0,
            symbol: "✈",
            flipped: false,
            offBoard: false
          },
          {
            id: 1,
            symbol: "♘",
            flipped: false,
            offBoard: false
          }
        ],
        cardsClicked: []
      }
    )
  })

  let stateWithTwoCardsOnBoard = {
    cards: [
      {
        id: 0,
        symbol: "✈",
        flipped: true,
        offBoard: false
      },
      {
        id: 1,
        symbol: "♘",
        flipped: true,
        offBoard: false
      }
    ],
    cardsClicked: [0,1]
  }

  it('REMOVE_MATCH should receive two cards and change offBoard for both to true. It should also reset cardsClicked', () => {
    expect(
      reducer(stateWithTwoCardsOnBoard, {
        type: REMOVE_MATCH,
        cardsClicked: [0,1]
      })
    ).toEqual({
      cards: [
        {
          id: 0,
          symbol: "✈",
          flipped: true,
          offBoard: true
        },
        {
          id: 1,
          symbol: "♘",
          flipped: true,
          offBoard: true
        }
      ],
      cardsClicked: []
    }
    )
  })


})
