import React, { Component } from 'react'
import axios from 'axios'

import Timer from '../Timer/Timer'
import styles from './Game.scss'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "levels": [
        {
          "cards": [],
          "difficulty": "easy"
        },
      ]
    }
  }

  componentDidMount() {
    console.log('in componentDidMount');
    axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
    .then(response => {
      this.setState(response.data);
    })
    .catch(err => console.error(err));
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
          <div id={styles.scoreContainer}><h2>Score</h2><span id={styles.number}>10</span></div>
          <div id={styles.timerContainer}><h2>Timer</h2><Timer /></div>
        </div>
        <div id={styles.boardContainer}>
          {
            this.state.levels[0].cards.map((card, idx) => {
              return <div key={idx} className={styles.card}><span className={styles.symbol}>{card}</span></div>
            })
          }
        </div>
      </div>
    )
  }

}
