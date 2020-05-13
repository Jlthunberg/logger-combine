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
import axios from 'axios';

//reducers put things on reduxState
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

const shipReducer= (state=[], action ) =>{
  if(action.type === 'blastOff'){
    console.log('in if ships:', action);
    state = action.payload
  }// end blastOff
  return state;
}//end shipReducer

//generator function the *(splat) lets it know this is a generator
function* watcherSaga(){
  //watcher is going to listen for Saga things
  //generator function so we can do async stuff (can leave function and come back when needed)
  //we will use "yield" in these
  //every time something with the 'test00' comes, run testSaga function
  yield takeEvery('FETCH_STARSHIPS', fetchShips); //fetch usually is a get call
} //end watcher

function* fetchShips( action ){
  console.log('in fetchShips:', action);
  try{
    const response = yield axios.get('https://swapi.dev/api/starships/');
    console.log('in fetchShips:', response.data);
    //sage uses put to reducers receive information from 
    yield put({ type: 'blastOff', payload: response.data} );
  } catch (error){
    console.log( error)
    alert('error getting ships')
  }// end try/catch
}// end fetchShips

//similar to storeInstance 
const sagaMiddleware = createSagaMiddleware(watcherSaga);


const storeInstance = createStore(
  combineReducers({ reducerOne, reducerTwo, shipReducer }),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

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
