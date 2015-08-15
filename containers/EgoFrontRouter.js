import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Home from './Home';
import About from './About';
import Search from './Search';
import Layout from './Layout';
const history = new BrowserHistory();

export default class EgoFrontRouter  extends Component {
  render() {
    return (
      <Router history={history}>
        <Route component={Layout}>
          <Route path="/" component={Home}/>
          <Route name="postPage" path="/page/:page" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/search" component={Search}/>
        </Route>
      </Router>
    );
  }
}
