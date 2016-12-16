/* eslint-env browser */

// Kyt expects every app to have this entry point.
// You probably won't need to touch this file.

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './../components/App'
import { Provider } from 'react-redux'
import { store } from './../components/reduxCode'
import { Router, hashHistory, Route, IndexRoute, IndexRedirect } from 'react-router'
import Game from './../components/Game/Game.js'
import BeginGame from './../components/BeginGame/BeginGame.js'
import GameOver from './../components/GameOver/GameOver.js'

const root = document.querySelector('#root')

const mount = RootComponent => render(
  <AppContainer>
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <Route path="/play" component={Game} />
            <Route path="/game-over" component={GameOver} />
            <IndexRoute component={BeginGame} />
          </Route>
        </Router>
      </Provider>
  </AppContainer>,
  root
)

if (module.hot) {
  module.hot.accept('./../components/App', () => {
    System.import('./../components/App').then(RootComponent => mount(RootComponent.default))
  })
}

mount(App)
