import React from 'react';
import Element from '../components/Element';
import ElementMesh from '../components/ElementMesh';

import {elements} from '../models/faked.js';
console.log(elements);
export default class Home {
  render() {
    return (
      <div>
        <h2>The Homepage</h2>
          {elements.map( (element, index) =>
            element.kind == 'image' ? <Element key={index} element={element} root={true}></Element> : <ElementMesh key={index} element={element} root={true}></ElementMesh>
          )}
      </div>
    );
  }
}
