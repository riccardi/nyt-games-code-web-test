import reducer from '../cards'
import { RECEIVE_CARDS, FLIP_CARD, TURN_TWO_CARDS_OVER, REMOVE_MATCH } from '../../constants'

describe('cards reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([
      {
        id: 0,
        symbol: '',
        flipped: false,
        offBoard: false
      }
    ])
  })

  it('should handle RECEIVE_CARDS', () => {
    expect(
      reducer([], {
        type: RECEIVE_CARDS,
        cards: [
          "✈",
          "♘"
        ]
      })
    ).toEqual(
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
    )
  })

  let stateWithTwoCardsFaceDown = [
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
  ];

  it('FLIP_CARD should receive a card and change flipped to true', () => {
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
      ]
    )
  })

  let stateWithTwoCardsFaceUp = [
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
  ];

  it('TURN_TWO_CARDS_OVER should receive two cards and change flipped for both to false', () => {
    expect(
      reducer(stateWithTwoCardsFaceUp, {
        type: TURN_TWO_CARDS_OVER,
        cardsClicked: [0,1]
      })
    ).toEqual(
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
    )
  })

  let stateWithTwoCardsOnBoard = [
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
  ];

  it('REMOVE_MATCH should receive two cards and change offBoard for both to true', () => {
    expect(
      reducer(stateWithTwoCardsOnBoard, {
        type: REMOVE_MATCH,
        cardsClicked: [0,1]
      })
    ).toEqual(
      [
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
      ]
    )
  })


})
