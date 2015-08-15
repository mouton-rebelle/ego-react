import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import Pager from '../components/Pager';
import { postLoadPage } from '../actions/PostActions';

@connect(state => ({
  posts: state.posts.list,
  nbPages: state.posts.nbPages
}))
export default class PagedPosts extends Component {

  componentWillMount() {
    console.warn('this call shall not be necessary once server side render works');
    this.props.dispatch(postLoadPage(this.props.params.currentPage ? this.props.params.currentPage : 1));
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.params.currentPage*1 !== this.props.params.currentPage*1)
    {
      this.props.dispatch(postLoadPage(nextProps.params.currentPage));
    }
  }

  render() {
    const { posts, params, nbPages } = this.props;
    const currentPage = params.currentPage ? 1 * params.currentPage : 1;
    return (
      <div>
        <h2>The Homepage</h2>
        <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
        <PostsList posts={posts}/>
      </div>
    );
  }
}
