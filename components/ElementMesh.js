import React, { PropTypes } from 'react';
import cx from 'classnames';
import Element from './Element';
import ElementInfo from './ElementInfo';
import ElementMeshData from '../models/ElementMeshData.js';


export default class ElementMesh {

  static propTypes = {
    element: PropTypes.instanceOf(ElementMeshData).isRequired,
    root: React.PropTypes.bool.isRequired
  }

  render() {

    const { element, root } = this.props;

    const elementStyle = {flexBasis:element.ratio*100 + '%'};
    const elementClass = cx('element', {'element--root':root});

    return (
      <div className={elementClass} style={elementStyle}>

        { root ? <ElementInfo info={element.info} root={root} /> : null }
        <div className="element__mesh">
          { element.content.map( (child,index) =>
            child.kind == 'image' ? <Element key={index} element={child} root={false}></Element> : <ElementMesh element={child} root={false}></ElementMesh>
          )}
        </div>
      </div>
    );
  }
}
