import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import PostImage from './PostImage';
import PostHeader from './PostHeader';

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

class PostMesh extends Component{

  render(){
    const {  horizontal, children, weight, childWeight } = this.props;

    let meshStyle = {
      minHeight: 100
    };

    if (horizontal)
    {
      meshStyle.display = 'flex;display:-webkit-flex';
    }

    return (
      <section style={meshStyle}>
      { React.Children.map( this.props.children, (c, i) => {
        let childStyle = {};
        if (horizontal)
        {
          childStyle.flexBasis = `${childWeight[i]}%`;
          childStyle.WebkitFlexBasis = `${childWeight[i]}%`;
        }
        return (
          <article key={i} style={childStyle}>
            {c}
          </article>
        );
      }) }
      </section>
    );
  }
}

class PostTree extends Component{

  static propTypes = {
    child      : PropTypes.array.isRequired,
    horizontal : PropTypes.bool,
    weight     : PropTypes.number
  };

  render(){
    const {  horizontal, child, weight } = this.props;
    const childWeight = child.map(c => c.weight);
    return (
      <PostMesh childWeight={childWeight} horizontal={horizontal} weight={weight}>
        { child.map( (c, indice) => {
          if (c.image)
          {
            return <PostImage image={c.image} key={c.image.id}/>;
          } else {
            return <PostTree child={c.child} horizontal={c.horizontal} key={indice} weight={c.weight}/>;
          }
        })}
      </PostMesh>
    );

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
      <div className="element">
        <PostHeader dates={dates} desc={post.desc} kind="light" title={post.title}/>
        <PostTree child={post.child} horizontal={post.horizontal} />
      </div>
    );
  }
}
