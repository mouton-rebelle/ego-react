import React from 'react';
import Element from '../components/Element';

const elements = [
  {
    key: 1,
    title:'il fait beau',
    desc: 'un champ bien labouré',
    url: 'http://eg0.me/uploads/ego/orig/9352.jpg'
  }, {
    key: 2,
    title: 'coucou',
    url: 'http://eg0.me/uploads/ego/orig/9352.jpg'
  }
]

export default class Home {
  render() {
    return (
      <div>
        <h2>The Homepage</h2>
          {elements.map( element =>
            <Element title={element.title} desc={element.desc} key={element.key} src={element.url}></Element>
          )}
      </div>
    );
  }
}
