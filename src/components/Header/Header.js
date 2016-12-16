import React from 'react'
import styles from './Header.scss'

const Header = () => (
  <h1 className={styles.header}>
    <span className={styles.blue}>M</span>
    <span className={styles.yellow}>e</span>
    <span className={styles.green}>m</span>
    <span className={styles.red}>o</span>
    <span className={styles.pink}>r</span>
    <span className={styles.blue}>y</span>
  </h1>
)

export default Header
