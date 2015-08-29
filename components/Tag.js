import React, { Component, PropTypes } from 'react';
//import {Link} from 'react-router';
import { colors, customFont} from '../styles/common';

let styles = {
  base: {
    ...customFont,
    display: 'inline-block',
    padding: '3px 7px',
    margin: '2px',
    background: colors.brand.alt,
    fontSize: '0.8em'
  },
  category:{
    opacity: 0.7,
    paddingRight: 2
  }
};


export default class Tag extends Component {

  static propTypes = {
    category : PropTypes.string,
    name : PropTypes.string.isRequired
  };

  render() {
    const { category, name } = this.props;
    return (
      <span style={styles.base}>
        { category ? <span style={styles.category}>{category}</span> : null }
        <span>{name}</span>
      </span>
    );
  }
}
