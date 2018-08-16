import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import App from './App'
import reducers from './reducers'
import handleNewMessage from './sagas'
import setupSocket from './sockets'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(handleNewMessage, { socket})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

