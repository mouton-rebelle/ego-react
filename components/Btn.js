import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { colors, customFont} from '../styles/common';
import Radium from 'radium';

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
    disabled: PropTypes.bool,
    handler: PropTypes.func,
    kind : PropTypes.oneOf(['primary', 'alt']),
    text : PropTypes.string.isRequired,
    url: PropTypes.string
  };

  render() {
    const kind = this.props.kind || 'primary';
    const { url, text, handler, disabled} = this.props;
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
      return ( <button onClick={handler} disabled={disabled} style={ { ...styles.base, ...styles[kind]} }>{text}</button> );
    }

  }
}
