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
              child={p.child}
              desc={p.desc}
              horizontal={p.horizontal}
              id={p._id}
              key={p._id}
              title={p.title}
              />
            </div>
        )}
      </div>
    );
  }
}
