import React, { Component } from 'react';
import styles from './Card.scss';


export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.state = {
    //   flipped: false,
    //   cardsClicked: []
    // }
  }



  handleClick(e, card) {
    e.preventDefault();
    console.log("e", e);
    console.log("id", card.id)
    console.log("symbol", card.symbol);
    console.log("flipped", card.flipped);
    this.props.flipCard(card);
    this.props.updateScore();
    //
    // if (this.state.cardsClicked.length < 1) {
    //   this.setState({
    //     flipped: !this.state.flipped,
    //     cardsClicked: this.state.cardsClicked.push(card)
    //   })
    // }
    //
    // if (this.state.cardsClicked.length === 2) {
    //   //if there is a match, then update score
    //   if (this.state.cardsClicked[0] === this.state.cardsClicked[1]) {
    //
    //     this.props.updateScore();
    //   }
    // } else {
    //
    // }
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
