import React, { Component } from 'react'
import axios from 'axios'
import styles from './Game.scss'
import Timer from '../Timer/Timer'
import Card from '../Card/Card'
import { Link } from 'react-router'
import { hashHistory } from 'react-router'

import { cards, cardsClicked, score, difficulty } from '../../redux/store'
import { fetchCards, flipCard, turnCardsOver, resetCardsClicked, removeMatch, updateScore, resetGameState } from '../../redux/action-creators'

import { connect } from 'react-redux';

const mapStateToProps = ({ cards, cardsClicked, score, difficulty }) => ({
  cards,
  cardsClicked,
  score,
  difficulty
});

const mapDispatchToProps = (dispatch) => ({
  getCards: (difficulty) => dispatch(fetchCards(difficulty)),
  flipCard: (card) => dispatch(flipCard(card)),
  turnCardsOver: () => dispatch(turnCardsOver()),
  removeMatch: () => dispatch(removeMatch()),
  updateScore: () => dispatch(updateScore()),
  resetGameState: () => dispatch(resetGameState())
});

const Game = connect(mapStateToProps, mapDispatchToProps)(

  class Game extends Component {
    constructor(props) {
      super(props)
      this.handleCardClick = this.handleCardClick.bind(this)
      this.checkForMatch = this.checkForMatch.bind(this)
    }

    componentDidMount() {
      this.props.resetGameState();
      // if (this.props.difficulty === '') {
      //   hashHistory.push('/');
      // }
      this.props.getCards(this.props.difficulty)
    }

    checkForMatch() {
      if (this.props.difficulty === 'triples') {
        return (this.props.cards[this.props.cardsClicked[0]].symbol === this.props.cards[this.props.cardsClicked[1]].symbol && this.props.cards[this.props.cardsClicked[1]].symbol === this.props.cards[this.props.cardsClicked[2]].symbol)
      } else {
        return (this.props.cards[this.props.cardsClicked[0]].symbol === this.props.cards[this.props.cardsClicked[1]].symbol)
      }
    }

    componentDidUpdate() {
      //After user clicks on cards
      let len = 2;
      if (this.props.difficulty === 'triples') len = 3

      if (this.props.cardsClicked.length === len) {
        //We must check for a match
        if(this.checkForMatch()) {
          //If there is a match then we remove the cards and update the score
          setTimeout(() => {
            this.props.removeMatch();
            this.props.updateScore();

            //check for end of game
            if(this.props.score === this.props.cards.length/len) hashHistory.push('/game-over');

          }, 1000);
        } else {
          //If not, they get a second to see them, then they are turned over
          setTimeout(this.props.turnCardsOver, 1000);
        }
      }
    }

    handleCardClick(e, card) {
      e.preventDefault();
      //User can only flip over two cards at a time
      //User cannot flip over a card that was already flipped and cannot flip over a card that is off the board
      let len = 2;
      if (this.props.difficulty === 'triples') len = 3
      if (this.props.cardsClicked.length < len && !card.offBoard && !this.props.cardsClicked.includes(card.id)) this.props.flipCard(card)
    }

    render() {
      let time = this.props.difficulty === 'beatTheClock' ? 30 : 0
      return (
        <div>
          <div id={styles.scoreAndTimerContainer}>
            <div id={styles.scoreContainer}><h2>Score</h2><span id={styles.number}>{this.props.score}</span></div>
            <div id={styles.timerContainer}><h2>Timer</h2><Timer startTime={time} /></div>
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
