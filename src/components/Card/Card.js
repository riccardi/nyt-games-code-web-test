import React, { Component } from 'react';
import styles from './Card.scss';


export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e, card) {
    e.preventDefault();
    //User can only flip over two cards at a time
    if (this.props.cardsClicked.length < 2 && !this.props.card.offBoard) {
      this.props.flipCard(card);
    }


  }


  render() {
    return (
      <div className={styles.cardContainer} onClick={(evt) => { this.handleClick(evt, this.props.card)}}>
        <div className={(this.props.card.flipped) ? `${styles.card} ${styles.flipped}` : styles.card}>
          <div className={(this.props.card.offBoard) ? styles.offBoard : styles.back}><span className={styles.symbol}>?</span></div>
          <div className={(this.props.card.offBoard) ? styles.offBoard : styles.front}><span className={styles.symbol}>{this.props.card.symbol}</span></div>
        </div>
      </div>
    );
  }
}
