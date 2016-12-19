import React from 'react'
import styles from './Header.scss'
import { Link } from 'react-router'


const Header = () => (
  <Link to="/">
    <h1 className={styles.header}>
    <span className={styles.blue}>M</span>
    <span className={styles.yellow}>e</span>
    <span className={styles.green}>m</span>
    <span className={styles.red}>o</span>
    <span className={styles.pink}>r</span>
    <span className={styles.blue}>y</span>
    </h1>
  </Link>
)

export default Header
