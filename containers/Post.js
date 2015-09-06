import React, { PropTypes, Component } from 'react';
import PostHeader from '../components/PostHeader';
import PostComments from '../components/PostComments';
import PostTree from './PostTree';

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
    post      : PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;
    const images   = flattenImages(post, []);
    const dates    = images.map( img => img.takenOn).sort( (a, b) => a > b ? 1 : -1);
    return (
      <section className="element">
        <PostHeader dates={dates} desc={post.desc} kind="light" title={post.title}/>
        <PostTree child={post.child} horizontal={post.horizontal} />
        <PostComments comments={post.comments} />
      </section>
    );
  }
}
