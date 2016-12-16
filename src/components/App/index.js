import React from 'react'
import Game from '../Game/Game'
import styles from './index.scss'
import { Link } from 'react-router'
import Header from './../Header/Header'

const App = (props) => (
    <div id={styles.mainContainer}>
      <Header />
      <div>{props.children}</div>
    </div>
)

export default App
