import React from 'react'
import styles from './GameOver.scss'
import { Link } from 'react-router'
import { score, time } from '../../redux/store'
import { resetGameState } from '../../redux/action-creators/reset'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const mapStateToProps = ({ score, time }) => ({
  score, time
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
      console.log("clicked play again")
      e.preventDefault();
      this.props.resetGameState();
      hashHistory.push('/');
    }

    render() {
      return (
        <div id={styles.gameOver}>
        <h1>You won!</h1>
        <p>Your score was {this.props.score}</p>
        <p>Your time was {this.props.time}</p>

        <button onClick={this.handlePlayAgain}>Play again</button>
        </div>
      )
    }


  })

  export default GameOver
