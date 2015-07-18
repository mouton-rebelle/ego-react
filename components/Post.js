import React, { PropTypes } from 'react';
import cx from 'classnames';
import PostImage from './PostImage';

function renderChild(c)
{
  // return <p>ppkdpsqk</p>;
  if (c.child)
  {
    let styles = {flexBasis:c.weight + '%',WebkitFlexBasis:c.weight + '%'};
    let classes = cx('element__content', {'element__content--horizontal':c.horizontal});

    return (
      <div className={classes} style={styles}>
        { c.child.map( renderChild ) }
      </div>);
  } else {
    return <PostImage image={c.image[0]} weight={c.weight}></PostImage>;
  }
}


export default class Post {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string,
    horizontal: React.PropTypes.bool.isRequired,
    child: React.PropTypes.array.isRequired
  }

  render() {

    const { title, desc, horizontal, child } = this.props;
    const elementClass = cx('element__content', 'element__content--root',{'element__content--horizontal':horizontal});

    return (
      <div className="element">
        <div className="element__info">
          <h3 className="element__info__title">{title}</h3>
          { desc ? <div className="element__info__desc">{desc}</div> : null }
        </div>
        <div className={elementClass}>
          { child.map( renderChild ) }
        </div>
      </div>
    );
  }
}
