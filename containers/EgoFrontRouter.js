import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import PagedPosts from './PagedPosts';
import About from './About';
import Search from './Search';
import Layout from './Layout';
import SinglePostPage from './SinglePostPage';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import * as reducers from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';

import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const reducer = combineReducers(reducers);
const store   = finalCreateStore(reducer);




export default class EgoFrontRouter  extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
            <Router history={this.props.history}>
              <Route component={Layout}>
                <Route path="/" component={PagedPosts}/>
                <Route path="/page/:currentPage" component={PagedPosts}/>
                <Route path="/post/:id(/:imageId)" component={SinglePostPage}/>
                <Route path="/about" component={About}/>
                <Route path="/search" component={Search}/>
              </Route>
            </Router>
        </Provider>
      </div>
    );
  }
}
