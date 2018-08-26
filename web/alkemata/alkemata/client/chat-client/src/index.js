import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {emptyNotebook,toJS} from '@nteract/commutable'

import './index.css'
import App from './App'
import reducers from './reducers'
import handleNewMessage from './sagas'
import setupSocket from './sockets'
import Immutable from 'immutable';


const notebook = emptyNotebook;
const defaultState = Immutable.Map({
  messages: notebook,
  info: "",
  users: Immutable.List([]),
  kernels: Immutable.List([])
}
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers, defaultState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
const socket = setupSocket(store.dispatch, window.props.room);
const room=window.props.room;
sagaMiddleware.run(handleNewMessage, { socket,room });
ReactDOM.render(
  <Provider store={store}>
    <App {...window.props} />
  </Provider>,
  document.getElementById('react')
)