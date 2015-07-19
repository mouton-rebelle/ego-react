import React, {PropTypes} from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as PostActions from '../actions/PostActions';
import PagedPosts from './PagedPosts';

@connect(state => ({
  posts: state.posts.list
}))
export default class Home {
  render() {
    const { posts, dispatch } = this.props;
    return (
      <div>
        <h2>The Homepage</h2>
        <PagedPosts posts={posts} {...bindActionCreators(PostActions, dispatch)}/>
      </div>
    );
  }
}
