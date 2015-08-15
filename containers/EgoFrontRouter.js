import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import Home from './Home';
import About from './About';
import Search from './Search';
import Layout from './Layout';

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




export default class EgoFrontRouter  extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.props.history}>
              <Route component={Layout}>
                <Route path="/" component={Home}/>
                <Route name="postPage" path="/page/:page" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/search" component={Search}/>
              </Route>
            </Router>
          }
        </Provider>
      </div>
    );
  }
}
