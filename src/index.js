import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import {takeEvery, put } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

const reducerOne = (state = 0, action) => {
  // console.log('in reducer one:', action);
  return state;
}// end reducerOne

const reducerTwo = (state = 'fake', action) => {
  // console.log('in reducer two:', action);
  if(action.type === 'test'){
    console.log('in reducerTwo');
    state = 'tester'
  }// end if
  return state;
}// end reducerOne

//generator function the *(splat) lets it know this is a generator
//yield to deal with
function* watcherSaga(){
  //watcher is going to listen for Saga things
  //generator function so we can do async stuff (can leave function and come back when needed)
  //we will use "yield" in these
} //end watcher

const sagaMiddleware =createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({ reducerOne, reducerTwo }),
  applyMiddleware(logger, sagaMiddleware)
);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
