import React from 'react'
import { Link } from 'react-router'
import styles from './BeginGame.scss'
import { selectDifficulty } from '../../redux/action-creators.js'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
  selectDifficulty: (difficulty) => dispatch(selectDifficulty(difficulty))
});

const BeginGame = connect(null, mapDispatchToProps)(

  class BeginGame extends React.Component {
    constructor(props) {
      super(props);
      this.handleSelectDifficulty = this.handleSelectDifficulty.bind(this);
    }

    handleSelectDifficulty(e, difficulty) {
      e.preventDefault();
      console.log('handleSelectDifficulty', difficulty)
      this.props.selectDifficulty(difficulty);
      hashHistory.push('/play');

    }

    render() {
      return (
        <div id={styles.chooseDifficultyContainer}>
        <h1>Select a Difficulty</h1>
        <button onClick={(evt) => { this.handleSelectDifficulty(evt, "easy") }}>Easy</button>
        <button onClick={(evt) => { this.handleSelectDifficulty(evt, "hard") }}>Hard</button>
        <button onClick={(evt) => { this.handleSelectDifficulty(evt, "triples") }}>Triples</button>
        <button onClick={(evt) => { this.handleSelectDifficulty(evt, "beatTheClock") }}>Beat The Clock</button>
        </div>
      )
    }
  }
);

export default BeginGame
