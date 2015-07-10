import React, { PropTypes } from 'react';
import cx from 'classnames';
import '../sass/components/element.scss';

export default class Element {
  static propTypes = {
    element: PropTypes.object.isRequired,
  }

  render() {
    const { element, root } = this.props;
    const elementStyle = {flexBasis:element.ratio*100 + '%'};
    const elementClass = cx('element', {'element--root':root});
    return (
      <div className={elementClass} style={elementStyle}>
        <div className="element__info">
          <h3 className="element__info__title">{element.info.title}</h3>
          { element.info.desc ? <div className="element__info__desc">{element.info.desc}</div> : null }
        </div>
        <img className="element__image" src={element.url} />
      </div>
    );
  }
}