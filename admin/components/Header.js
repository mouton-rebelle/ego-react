import React, { Component } from 'react';
import {Link} from 'react-router';
export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <ul className="nav head-nav">
           <li className="head-nav__item"><Link  className="head-nav__item__link" to="/">Home</Link></li>
           <li className="head-nav__item"><Link  className="head-nav__item__link" to="/admin/comments">Comments</Link></li>
         </ul>
      </header>
    );
  }
}
