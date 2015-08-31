import React, { PropTypes, Component } from 'react';

import Post from '../components/Post';

export default class PostsList extends Component{
  static propTypes = {
    posts : PropTypes.array.isRequired
  };
  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.map( (p, index) =>
          <div key={index}>
            <Post
              post={p}
              id={p._id}
              key={p._id}
              />
            </div>
        )}
      </div>
    );
  }
}
