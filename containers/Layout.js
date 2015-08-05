import React, { Component } from 'react';
import Header from '../components/Header';

export default class Layout extends Component {
  render() {
    return (
      <div className="container app">
        <Header/>
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}