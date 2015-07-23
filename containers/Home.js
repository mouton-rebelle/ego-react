import React, {PropTypes} from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as PostActions from '../actions/PostActions';
import PagedPosts from './PagedPosts';

@connect(state => ({
  posts: state.posts.list,
  range: state.posts.range
}))
export default class Home {
  render() {
    const { posts, range, dispatch } = this.props;
    return (
      <div>
        <h2>The Homepage</h2>
        <PagedPosts posts={posts} range={range} {...bindActionCreators(PostActions, dispatch)}/>
      </div>
    );
  }
}
