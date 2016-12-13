import React from 'react'
import Game from '../Game/Game'
import styles from './index.scss'
import { Provider } from 'react-redux'
import { store } from '../reduxCode'

const App = () => (
  <Provider store={store}>
    <div id={styles.root}>
      <Game />
    </div>
  </Provider>
)

export default App
