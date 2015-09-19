import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
export default class FormControl extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.object,
    className: PropTypes.string,
    error: PropTypes.string,
    style: PropTypes.object,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    value: PropTypes.string
  };

  render() {
    const { active, children, error, valid, style, touched } = this.props;
    const classes = cx({
      'form-control' :true,
      'form-control--valid': valid && active,
      'form-control--invalid': !valid && touched
    }) + ' ' + this.props.className;
    return (
        <div className={classes} style={style}>
          { React.Children.map( children, c => c )}
          { error && touched ? <span className="form-control__error">{error}</span> : null}
        </div>
    );
  }
}
