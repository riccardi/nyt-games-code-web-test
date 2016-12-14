import React, { Component } from 'react'
import axios from 'axios'

import Timer from '../Timer/Timer'
import styles from './Game.scss'
import { store, fetchCards, updateScore, flipCard, turnTwoCardsOver } from '../reduxCode'
import Card from '../Card/Card'

import { connect } from 'react-redux';

const mapStateToProps = ({ cards, score, cardsClicked }) => ({
  cards,
  score,
  cardsClicked
});

const mapDispatchToProps = (dispatch) => ({
  getCards: () => dispatch(fetchCards()),
  flipCard: (card) => dispatch(flipCard(card)),
  updateScore: () => dispatch(updateScore()),
  turnTwoCardsOver: () => dispatch(turnTwoCardsOver())
});

const Game = connect(mapStateToProps, mapDispatchToProps)(
  class Game extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.getCards();
    }

    componentDidUpdate() {

      //When user clicks on two cards, they get a second to see them, then they are turned over
      if (this.props.cardsClicked.length === 2) {
        setTimeout(this.props.turnTwoCardsOver, 1000);
      }

    }

    render() {
      return (
        <div>
          <h1 className={styles.header}>
            <span className={styles.blue}>M</span>
            <span className={styles.yellow}>e</span>
            <span className={styles.green}>m</span>
            <span className={styles.red}>o</span>
            <span className={styles.pink}>r</span>
            <span className={styles.blue}>y</span>
          </h1>
          <div id={styles.scoreAndTimerContainer}>
            <div id={styles.scoreContainer}><h2>Score</h2><span id={styles.number}>{this.props.score}</span></div>
            <div id={styles.timerContainer}><h2>Timer</h2><Timer /></div>
          </div>
          <div id={styles.boardContainer}>
            {
              this.props.cards.map((card, id) =>
              <Card key={id} card={card} index={id} updateScore={this.props.updateScore} flipCard={this.props.flipCard} cardsClicked={this.props.cardsClicked} />

            )
          }
        </div>
      </div>
    )
  }

});

export default Game;
