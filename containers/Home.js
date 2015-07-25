import React, {PropTypes} from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as PostActions from '../actions/PostActions';
import PagedPosts from './PagedPosts';
import Pager from '../components/Pager';


@connect(state => ({
  posts: state.posts.list,
  range: state.posts.range,
  count: state.posts.count
}))
export default class Home {
  render() {
    const { posts, range, count, dispatch } = this.props;
    return (
      <div>
        <h2>The Homepage</h2>
        <Pager count={count} perPage={10} range={range} changeRange={bindActionCreators(PostActions, dispatch).postLoadRange}/>
        <PagedPosts posts={posts} range={range} {...bindActionCreators(PostActions, dispatch)}/>
      </div>
    );
  }
}
