import React, { Component } from 'react';
import styles from './Card.scss';


export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e, card) {
    e.preventDefault();
    // console.log("e", e);
    // console.log("id", card.id)
    // console.log("symbol", card.symbol);
    // console.log("flipped", card.flipped);

    // console.log('cardsClicked', this.props.cardsClicked);

    //User can only flip over two cards at a time
    if (this.props.cardsClicked.length < 2) {
      this.props.flipCard(card);
    }


  }


  render() {
    // let cardClasses = `${styles.card} ${styles.offBoard}`;
    return (
      <div className={styles.cardContainer} onClick={(evt) => { this.handleClick(evt, this.props.card)}}>
        <div className={(this.props.card.flipped) ? styles.flipped : styles.card}>
          <div className={styles.back}><span className={styles.symbol}>?</span></div>
          <div className={styles.front}><span className={styles.symbol}>{this.props.card.symbol}</span></div>
        </div>
      </div>
    );
  }
}
