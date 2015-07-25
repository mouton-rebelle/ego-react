import React, { PropTypes } from 'react';
import cx from 'classnames';
import PostImage from './PostImage';

//

/*
  Recursively render the child til we hit an image.
  c : element to render
  rootId: base post index
  level: base post child index
  indice : current post index
 */
function renderChild(c, rootId, level, indice)
{
  if(c.child)
  {
    let styles = {flexBasis: c.weight + '%', WebkitFlexBasis: c.weight + '%'};
    let classes = cx('element__content', {'element__content--horizontal': c.horizontal});
    return (
      <div className={classes} key={rootId + '-' + level + '-' + indice} style={styles}>
        { c.child.map( (c2, indice) => renderChild(c2, rootId, level, indice) ) }
      </div>);
  } else {
    return <PostImage image={c.image[0]} key={c.image[0].id} weight={c.weight}/>;
  }
}


export default class Post {

  static propTypes = {
    child      : PropTypes.array.isRequired,
    desc       : PropTypes.string,
    horizontal : PropTypes.bool,
    id         : PropTypes.number.isRequired,
    title      : PropTypes.string.isRequired
  };

  render() {

    const { title, desc, horizontal, child, id } = this.props;
    const elementClass = cx('element__content', 'element__content--root', {'element__content--horizontal': horizontal});

    return (
      <div className="element">
        <div className="element__info">
          <h3 className="element__info__title">{title}</h3>
          { desc ? <div className="element__info__desc">{desc}</div> : null }
        </div>
        <div className={elementClass}>
          { child.map( (c, level) => renderChild(c, id, level, 0) ) }
        </div>
      </div>
    );
  }
}
