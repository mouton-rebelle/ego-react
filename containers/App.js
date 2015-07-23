import React from 'react';
import EgoFrontRouter from './EgoFrontRouter';
import { createRedux, createDispatcher, composeStores } from 'redux';
import { Provider } from 'redux/react';
import * as reducers from '../stores/postStore';
import promiseMiddleware from 'redux-promise-middleware';
// console.log(posts(undefined,{type:'z'}));
console.log(reducers);
const reducer = composeStores(reducers);
const dispatcher = createDispatcher(
  reducer,
  getState => [promiseMiddleware(getState)] // Pass the default middleware
);
const redux = createRedux(dispatcher);

export default class App {
  render() {
    return (
      <Provider redux={redux}>
        {() => <EgoFrontRouter />}
      </Provider>
    );
  }
}
