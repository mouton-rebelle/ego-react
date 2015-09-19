import React, { Component, PropTypes } from 'react';

export default class FormControl extends Component {

  static propTypes = {
    children: PropTypes.object,
    error: PropTypes.string,
    valid: PropTypes.bool,
    value: PropTypes.string
  };

  render() {
    const { children, error, valid, value } = this.props;
    return (
        <div className="form-control">
        {
          React.Children.map( children, (c, i) => {
            return c;
          })
        }
        { valid ? <span>valid</span> : <span className="form-control__error">{error}</span>}
      </div>
    );
  }
}
