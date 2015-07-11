import React, { PropTypes } from 'react';
import cx from 'classnames';
import ElementInfoData from '../models/ElementInfoData.js';


export default class ElementInfo {

  static propTypes = {
    info: PropTypes.instanceOf(ElementInfoData).isRequired,
    root: React.PropTypes.bool.isRequired,
    shown: React.PropTypes.bool
  }

  render() {

    const { info, root, shown } = this.props;

    const infoClass = cx(
      { 'element__info': true,
        'element__info--root':root,
        'element__info--overlay':!root,
        'element__info--overlay--on':(!root && shown)
      });

    return (
      <div className={infoClass}>
        <h3 className="element__info__title">{info.title}</h3>
        { info.desc ? <div className="element__info__desc">{info.desc}</div> : null }
      </div>

    );
  }
}
