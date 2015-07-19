import React from 'react';
import EgoFrontRouter from './EgoFrontRouter';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores/postStore';
// console.log(posts(undefined,{type:'z'}));
console.log(stores);
const redux = createRedux(stores);

export default class App {
  render() {
    return (
      <Provider redux={redux}>
        {() => <EgoFrontRouter />}
      </Provider>
    );
  }
}
