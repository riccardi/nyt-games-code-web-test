import React from 'react'
import { Link } from 'react-router'
import styles from './BeginGame.scss'
import { selectDifficulty } from '../../redux/action-creators/difficulty'
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
      this.props.selectDifficulty(difficulty);
      hashHistory.push('/play');

    }

    render() {
      return (
        <div id={styles.chooseDifficultyContainer}>
        <h1>Select a Difficulty</h1>
        <button onClick={(evt) => { this.handleSelectDifficulty(evt, "easy") }}>Easy</button>
        <button onClick={(evt) => { this.handleSelectDifficulty(evt, "hard") }}>Hard</button>
        </div>
      )
    }
  }
);

export default BeginGame
