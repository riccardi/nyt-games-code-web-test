import React, { Component } from 'react'
import axios from 'axios'

import Timer from '../Timer/Timer'
import styles from './Game.scss'
import { store, fetchCards, updateScore, flipCard, turnTwoCardsOver, resetCardsClicked, removeMatch } from '../reduxCode'
import Card from '../Card/Card'
import { Link } from 'react-router'
import { hashHistory } from 'react-router';


import { connect } from 'react-redux';

const mapStateToProps = ({ cards, score, cardsClicked, gameOver }) => ({
  cards,
  score,
  cardsClicked,
  gameOver
});

const mapDispatchToProps = (dispatch) => ({
  getCards: (difficulty) => dispatch(fetchCards(difficulty)),
  flipCard: (card) => dispatch(flipCard(card)),
  updateScore: () => dispatch(updateScore()),
  resetCardsClicked: () => dispatch(resetCardsClicked()),
  turnTwoCardsOver: () => dispatch(turnTwoCardsOver()),
  removeMatch: () => dispatch(removeMatch())
});

const Game = connect(mapStateToProps, mapDispatchToProps)(

  class Game extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log(this.props.params.difficulty);
      this.props.getCards(this.props.params.difficulty);
    }

    componentDidUpdate() {

      //After user clicks on two cards
      if (this.props.cardsClicked.length === 2) {
        //We must check for a match
        if(this.props.cards[this.props.cardsClicked[0]].symbol === this.props.cards[this.props.cardsClicked[1]].symbol) {
          //If there is a match then we remove the cards and update the score
          setTimeout(() => {
            this.props.removeMatch();
            // this.props.resetCardsClicked();
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
            //should I move this setTimeout into action creator
            this.props.turnTwoCardsOver();
            // this.props.resetCardsClicked();
          }, 1000);
        }
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
              <Card key={id} card={card} index={id} flipCard={this.props.flipCard} cardsClicked={this.props.cardsClicked} />

            )
          }
        </div>
      </div>
    )
  }

});

export default Game;
