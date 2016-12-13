import React, { Component } from 'react';
import styles from './Card.scss';


export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      flipped: false
    }
  }

  handleClick(e, el) {
    e.preventDefault();
    console.log("e", e);
    console.log("el", el);
    console.log("Hey, I was clicked!");
    this.setState({ flipped: !this.state.flipped })
  }

  render() {
    return (
      <div className={styles.cardContainer} onClick={this.handleClick}>
        <div className={(this.state.flipped) ? styles.flipped : styles.card}>
          <div className={styles.back}><span className={styles.symbol}>BACK</span></div>
          <div className={styles.front}><span className={styles.symbol}>{this.props.card}</span></div>
        </div>
      </div>
    );
  }
}
