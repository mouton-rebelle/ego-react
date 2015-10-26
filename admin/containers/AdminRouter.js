import React, { Component, PropTypes } from 'react';
import { createStore, compose, combineReducers } from 'redux';
import { ReduxRouter, routerStateReducer, reduxReactRouter} from 'redux-router';
import { Route, Link } from 'react-router';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';

import Header from '../components/Header';

@connect(state => ({ routerState: state.router }))
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const links = [
      '/admin/',
      '/admin/parent?foo=bar',
      '/admin/parent/child?bar=baz',
      '/admin/parent/child/123?baz=foo'
    ].map(l =>
      <p>
        <Link to={l}>{l}</Link>
      </p>
    );

    return (
      <div>
        <h1>Eg0 Admin</h1>
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
}

class Parent extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        <h2>Parent</h2>
        {this.props.children}
      </div>
    );
  }
}

class Child extends Component {
  render() {
    return (
      <div>
        <h2>Child</h2>
      </div>
    );
  }
}

const reducer = combineReducers({
  router: routerStateReducer
});

const store = compose(
  reduxReactRouter({ createHistory }),
  devTools()
)(createStore)(reducer);

export default class AdminRouter extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/admin/" component={App}>
              <Route path="comments" component={Parent}>
              </Route>
            </Route>
          </ReduxRouter>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}


