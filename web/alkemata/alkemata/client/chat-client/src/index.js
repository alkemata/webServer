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
import EditorState from 'draft-js';

const defaultState = {
  editorState: EditorState,
listMessages: {},
info: ""
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,defaultState,
  applyMiddleware(sagaMiddleware)
)
console.log(window.props.room);
const socket = setupSocket(store.dispatch, window.props.room);
console.log('socket opened');
sagaMiddleware.run(handleNewMessage, { socket });

console.log('rendering');
ReactDOM.render(
  <Provider store={store}>
    <App {...window.props} />
  </Provider>,
  document.getElementById('react')
)