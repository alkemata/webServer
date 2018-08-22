import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import emptyNotebook from '@nteract/commutable'

import './index.css'
import App from './App'
import reducers from './reducers'
import handleNewMessage from './sagas'
import setupSocket from './sockets'
import {Map,List} from 'immutable';


const notebook=emptyNotebook;
const defaultState =Map({
messages: notebook,
info: "",
users: List(),
kernels: List()
}
);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,defaultState,
  applyMiddleware(sagaMiddleware)
)
const socket = setupSocket(store.dispatch, window.props.room);
sagaMiddleware.run(handleNewMessage, { socket });
ReactDOM.render(
  <Provider store={store}>
    <App {...window.props} />
  </Provider>,
  document.getElementById('react')
)