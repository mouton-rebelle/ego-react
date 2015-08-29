import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { colors, customFont} from '../styles/common';
import Radium from 'Radium';

let styles = {
  base: {
    ...customFont,
    display: 'inline-block',
    padding: '3px 7px',
    margin: '2px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#FFF',
    borderRadius: 2,
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
    kind : PropTypes.oneOf('primary', 'secondary'),
    // onClick: PropTypes.function,
    text : PropTypes.string.isRequired,
    url: PropTypes.string
  };

  render() {
    const kind = this.props.kind || 'primary';
    const { url, text } = this.props;
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
      return <button>{text}</button>;
    }

  }
}
