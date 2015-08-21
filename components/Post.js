import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import PostImage from './PostImage';
import PostDateRange from './PostDateRange';

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
    let ids = 'mesh_'+flattenImages(c,[]).map(img => img._id).join('-');
    return (
      <div className={classes} key={ids} style={styles}>
        { c.child.map( (c2, indice) => renderChild(c2, rootId, level, indice) ) }
      </div>);
  } else {
    if (c.image)
    {
      return <PostImage image={c.image} key={c.image.id} weight={c.weight}/>;
    }
  }
}

function flattenImages(c, images)
{
  if (c.image)
  {
    images.push(c.image);
    return images;
  } else {
    if (!c.child)
    {
      console.error(c);return;

    }
    c.child.forEach( child => flattenImages(child, images));
    return images;
  }
}


export default class Post extends Component{

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
    const dates = flattenImages(this.props, []).map( img => img.takenOn).sort( (a, b) => a > b ? 1 : -1);
    return (
      <div className="element">
        <div className="element__head">
          <div className="element__head__info">
            <h3 className="element__head__info__title">{title}</h3>
            { desc ? <div className="element__head__info__desc">{desc}</div> : null }
          </div>
          <div className="element__head__date">
            <PostDateRange dates={dates}/>
          </div>
        </div>
        <div className={elementClass}>
          { child.map( (c, level) => renderChild(c, id, level, 0) ) }
        </div>
      </div>
    );
  }
}
