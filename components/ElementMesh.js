import React, { PropTypes } from 'react';
import cx from 'classnames';
import Element from './Element';

export default class ElementMesh {
  static propTypes = {
    element: PropTypes.instanceOf('ElementMesh').isRequired,
    root: React.PropTypes.bool.isRequired,
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
        <div className="element__mesh">
          { element.content.map( child =>
            child.kind == 'image' ? <Element element={child} root={false}></Element> : <ElementMesh element={child} root={false}></ElementMesh>
          )}
        </div>
      </div>
    );
  }
}
