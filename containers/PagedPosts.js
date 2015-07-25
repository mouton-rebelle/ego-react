import React, {PropTypes} from 'react';

import Post from '../components/Post';


export default class PagedPosts {
  static propTypes = {
    posts : PropTypes.array.isRequired,
    range : PropTypes.array.isRequired
  };
  deletePost(id) {
    console.log(id);
    this.props.postRemove(id);
  }
  loadMore(inc) {
    this.props.postLoadRange([this.props.range[0]+inc,this.props.range[1]+inc]);
  }
  render() {
    const { posts, range } = this.props;
    return (
      <div>
        <div>
          <button onClick={() => this.loadMore(-10)}>prev</button>
          <span>{ range[0]} - { range[1]}</span>
          <button onClick={() => this.loadMore(10)}>next</button>
        </div>
        {posts.map( (p, index) =>
          <div key={index + range[0]} onClick={() => this.deletePost(index)}>
            <Post
              child={p.child}
              desc={p.desc}
              horizontal={p.horizontal}
              id={index}
              key={index + range[0]}
              title={p.title}
              />
            </div>
        )}
        <div>loadMore</div>
      </div>
    );
  }
}
