import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import Pager from '../components/Pager';
import { postLoadPage } from '../actions/PostActions';
import _get from 'lodash/object/get';

const nbPerPage = 10;

@connect(state => ({
  posts: state.posts.list,
  nbPages: state.posts.nbPages
}))
export default class PagedPosts extends Component {

  static propTypes={
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  loadPostForCurrentPage() {
    let page = _get(this.props, 'params.currentPage', 1) * 1;
    this.props.dispatch(postLoadPage(page, nbPerPage));
  }

  componentWillMount() {
    console.warn('this call shall not be necessary once server side render works');
    let page = _get(this.props, 'params.currentPage', 1) * 1;
    this.props.dispatch(postLoadPage(page, nbPerPage));
  }

  componentWillReceiveProps(nextProps) {
    let page = _get(this.props, 'params.currentPage', 1) * 1;
    let nextPage = _get(nextProps, 'params.currentPage', 1) * 1;
    if (page !== nextPage)
    {
      this.props.dispatch(postLoadPage(nextPage, nbPerPage));
    }

  }

  render() {
    const { posts, params, nbPages } = this.props;
    const currentPage = params.currentPage ? 1 * params.currentPage : 1;
    return (
      <div>
        <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
        <PostsList posts={posts}/>
        <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
      </div>
    );
  }
}
