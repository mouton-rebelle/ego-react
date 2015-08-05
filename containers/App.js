import React, { Component } from 'react';
import EgoFrontRouter from './EgoFrontRouter';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action);

    console.log('state after dispatch', getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}
const middlewares = [promiseMiddleware, logger];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);


const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);



export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        {() => <EgoFrontRouter />}
      </Provider>
    );
  }
}
