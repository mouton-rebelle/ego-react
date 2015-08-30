import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import PostImage from './PostImage';
import PostHeader from './PostHeader';

//

/*
  Recursively render the child til we hit an image.
  c : element to render
  rootId: base post index
  level: base post child index
  indice : current post index
 */
function renderChild(c, postUrl)
{
  if(c.child)
  {
    let styles = {flexBasis: c.weight + '%', WebkitFlexBasis: c.weight + '%'};

    let classes = cx('element__content', {'element__content--horizontal': c.horizontal});
    let ids = 'mesh_' + flattenImages(c, []).map(img => img._id).join('-');
    return (
      <div className={classes} key={ids} style={styles}>
        { c.child.map( (c2) => renderChild(c2, postUrl) ) }
      </div>);
  } else {
    if (c.image)
    {
      return <PostImage postUrl={postUrl} image={c.image} key={c.image.id} weight={c.weight}/>;
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
      console.error(c);
      return null;
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
    id         : PropTypes.string.isRequired,
    title      : PropTypes.string.isRequired
  };

  render() {
    const { title, desc, horizontal, child, id } = this.props;
    const elementClass = cx('element__content', 'element__content--root', {'element__content--horizontal': horizontal});
    const images = flattenImages(this.props, []);
    const dates = images.map( img => img.takenOn).sort( (a, b) => a > b ? 1 : -1);
    const postUrl = `/post/${id}`;
    return (
      <div className="element">
        <PostHeader dates={dates} desc={desc} kind="light" title={title}/>
        <div className={elementClass}>
          { child.map( (c) => renderChild(c, postUrl) ) }
        </div>
      </div>
    );
  }
}
