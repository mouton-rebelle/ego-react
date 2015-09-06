import React, { PropTypes, Component } from 'react';

import Post from './Post';

export default class PostsList extends Component{
  static propTypes = {
    posts : PropTypes.array.isRequired
  };
  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.map( p =>
          <div key={p._id}>
            <Post
              id={p._id}
              post={p}
              />
            </div>
        )}
      </div>
    );
  }
}
