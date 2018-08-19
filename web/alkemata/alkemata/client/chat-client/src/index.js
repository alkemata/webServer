import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import App from './App'
import reducers from './reducers'
import handleNewMessage from './sagas'
import setupSocket from './sockets'
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch)
sagaMiddleware.run(handleNewMessage, { socket })

const render = Component => {
  <Provider store={store}>
    <AppContainer>
      <App {...window.props} />
    </AppContainer>
  </Provider>,
  document.getElementById('react')
}

registerServiceWorker();
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
