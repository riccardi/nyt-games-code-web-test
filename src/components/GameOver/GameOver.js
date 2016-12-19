import React from 'react'
import styles from './GameOver.scss'
import { Link } from 'react-router'
import { score, time } from '../../redux/store'
import { resetGameState } from '../../redux/action-creators'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const mapStateToProps = ({ score, time, difficulty }) => ({
  score, time, difficulty
});

const mapDispatchToProps = (dispatch) => ({
  resetGameState: () => dispatch(resetGameState())
});

const GameOver = connect(mapStateToProps, mapDispatchToProps)(
  class GameOver extends React.Component {
    constructor(props) {
      super(props)
      this.handlePlayAgain = this.handlePlayAgain.bind(this)
    }

    handlePlayAgain(e) {
      e.preventDefault();
      this.props.resetGameState();
      hashHistory.push('/');
    }

    render() {
      console.log('difficulty', this.props.difficulty)
      let winOrLose = this.props.time === '0:00' ? 'Game over!' : 'You won!'
      let message = (this.props.difficulty === 'beatTheClock') ? 'Time left ' : 'Your time was '
      return (
        <div id={styles.gameOver}>
          <h1>{winOrLose}!</h1>
          <p>Your score was {this.props.score}</p>
          <p>{message} {this.props.time}</p>
          <button onClick={this.handlePlayAgain}>Play again</button>
        </div>
      )
    }


  })

  export default GameOver
