import reducer from '../cards'
import { RECEIVE_CARDS, FLIP_CARD } from '../../constants'

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

  let stateWithTwoCards = [
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
      reducer(stateWithTwoCards, {
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

})
