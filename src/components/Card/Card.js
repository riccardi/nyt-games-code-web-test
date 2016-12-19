import React, { Component } from 'react';
import styles from './Card.scss';


const Card = (props) => (
  <div className={styles.cardContainer} onClick={(evt) => { props.handleCardClick(evt, props.card)}}>
    <div className={(props.card.flipped) ? `${styles.card} ${styles.flipped}` : styles.card}>
      <div className={(props.card.offBoard) ? styles.offBoard : styles.back}><span className={styles.symbol}>?</span></div>
      <div className={(props.card.offBoard) ? styles.offBoard : styles.front}><span className={styles.symbol}>{props.card.symbol}</span></div>
    </div>
  </div>
)

export default Card
