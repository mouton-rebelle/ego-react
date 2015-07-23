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
  loadMore() {
    this.props.postLoadRange([this.props.range[0]+10,this.props.range[1]+10]);
  }
  render() {
    const { posts, range } = this.props;
    return (
      <div>
        <div>
          <button onClick={() => this.loadMore()}>loadMore</button>
        </div>
        {posts.map( (p, index) =>
          <div onClick={() => this.deletePost(index)}>
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
