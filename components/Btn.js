import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { colors, customFont} from '../styles/common';
import Radium from 'Radium';

let styles = {
  base: {
    ...customFont,
    display: 'inline-block',
    padding: '3px 7px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#FFF',
    borderRadius: 2,
    border:0,
    letterSpacing: '0.06em',
    backgroundColor: colors.brand.primary,
    ':hover':{
      backgroundColor:'#000'
    }
  },
  category:{
    opacity: 0.7,
    paddingRight: 2
  }
};
@Radium
export default class Btn extends Component {

  static propTypes = {
    handler: PropTypes.func,
    kind : PropTypes.oneOf(['primary', 'alt']),
    text : PropTypes.string.isRequired,
    url: PropTypes.string
  };

  render() {
    const kind = this.props.kind || 'primary';
    const { url, text, handler} = this.props;
    if (url)
    {
      return (
        <Link
          style={ { ...styles.base, ...styles[kind]} }
          to={ url }>
            { text }
        </Link>
      );
    } else {
      return ( <button onClick={handler} style={ { ...styles.base, ...styles[kind]} }>{text}</button> );
    }

  }
}
