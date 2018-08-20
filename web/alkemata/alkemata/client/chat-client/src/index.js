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
//import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch,window.room)
sagaMiddleware.run(handleNewMessage, { socket })


const render = Component => {
  <Provider store={store}>
    <App {...window.props} />
  </Provider> ,
    document.getElementById('react')
}


render(App);
