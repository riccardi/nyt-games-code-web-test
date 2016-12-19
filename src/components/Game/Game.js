import React, { Component } from 'react'
import axios from 'axios'
import styles from './Game.scss'
import Timer from '../Timer/Timer'
import Card from '../Card/Card'
import { Link } from 'react-router'
import { hashHistory } from 'react-router'

import { cards, cardsClicked, score } from '../../redux/store'
import { fetchCards, flipCard, turnTwoCardsOver, removeMatch } from '../../redux/action-creators/cards'
import { addCardToCardsClicked, resetCardsClicked } from '../../redux/action-creators/cardsClicked'
import { updateScore } from '../../redux/action-creators/score'

import { connect } from 'react-redux';

const mapStateToProps = ({ cards, cardsClicked, score }) => ({
  cards,
  cardsClicked,
  score
});

const mapDispatchToProps = (dispatch) => ({
  getCards: () => dispatch(fetchCards()),
  flipCard: (card) => dispatch(flipCard(card)),
  turnTwoCardsOver: (cardsClicked) => dispatch(turnTwoCardsOver(cardsClicked)),
  removeMatch: (cardsClicked) => dispatch(removeMatch(cardsClicked)),
  addCardToCardsClicked: (cardId) => dispatch(addCardToCardsClicked(cardId)),
  resetCardsClicked: () => dispatch(resetCardsClicked()),
  updateScore: () => dispatch(updateScore())
});

const Game = connect(mapStateToProps, mapDispatchToProps)(

  class Game extends Component {
    constructor(props) {
      super(props)
      this.handleCardClick = this.handleCardClick.bind(this)
    }

    componentDidMount() {
      this.props.getCards()
    }

    componentDidUpdate() {
      //After user clicks on two cards
      if (this.props.cardsClicked.length === 2) {
        //We must check for a match
        if(this.props.cards[this.props.cardsClicked[0]].symbol === this.props.cards[this.props.cardsClicked[1]].symbol) {
          //If there is a match then we remove the cards and update the score
          setTimeout(() => {
            this.props.removeMatch(this.props.cardsClicked);
            this.props.resetCardsClicked();
            this.props.updateScore();

            if(this.props.score === this.props.cards.length/2) {
              //get what time was when user won
              hashHistory.push('/game-over');
            }
          }, 1000);
        } else {
          //If not
          //They get a second to see them, then they are turned over
          setTimeout(() => {
            this.props.turnTwoCardsOver(this.props.cardsClicked);
            this.props.resetCardsClicked();
          }, 1000);
        }
      }
    }

    handleCardClick(e, card) {
      e.preventDefault();
      //User can only flip over two cards at a time
      //User cannot flip over a card that was already flipped and cannot flip over a card that is off the board
      if (this.props.cardsClicked.length < 2 && !card.offBoard && !this.props.cardsClicked.includes(card.id)) {
        this.props.flipCard(card);
        this.props.addCardToCardsClicked(card.id);
      }
    }

    render() {
      return (
        <div>
          <div id={styles.scoreAndTimerContainer}>
            <div id={styles.scoreContainer}><h2>Score</h2><span id={styles.number}>{this.props.score}</span></div>
            <div id={styles.timerContainer}><h2>Timer</h2><Timer /></div>
          </div>
          <div id={styles.boardContainer}>
            {
              this.props.cards.map((card, id) =>
              <Card
                key={id}
                card={card}
                handleCardClick={this.handleCardClick}
                />
              )
            }
        </div>
      </div>
    )
  }

});

export default Game;
