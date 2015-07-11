import React, { PropTypes } from 'react';
import cx from 'classnames';
import '../sass/components/element.scss';
import ElementInfo from './ElementInfo';
import ElementImageData from '../models/ElementImageData.js';

export default class Element {
  static propTypes = {
    element: PropTypes.instanceOf(ElementImageData).isRequired,
  }

  render() {
    const { element, root } = this.props;
    const elementStyle = {flexBasis:element.ratio*100 + '%'};
    const elementClass = cx('element', {'element--root':root});
    return (
      <div className={elementClass} style={elementStyle}>
        <ElementInfo info={element.info} root={root} />
        <img className="element__image" src={element.url} />
      </div>
    );
  }
}
