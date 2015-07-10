import React from 'react';
import Header from '../components/Header';

export default class Layout {
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