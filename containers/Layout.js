import React from 'react';
import {Link} from 'react-router';

export default class Layout {
  render() {
    return (
      <div className="container app">
        <h1>EGO</h1>
        <ul className="nav">
           <li><Link to="/">Home</Link></li>
           <li><Link to="/search">Search</Link></li>
           <li><Link to="/about">About</Link></li>
         </ul>
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}