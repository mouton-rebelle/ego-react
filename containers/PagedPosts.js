import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import Pager from '../components/Pager';
import { postLoadPage } from '../actions/PostActions';
import _get from 'lodash/object/get';

const nbPerPage = 10;

@connect(state => ({
  postIdsPerPage: state.posts.byPage,
  postsById: state.posts.byId,
  nbPages: state.posts.nbPages
}))
export default class PagedPosts extends Component {

  static propTypes={
    dispatch: PropTypes.func.isRequired,
    nbPages: PropTypes.number.isRequired,
    params: PropTypes.object,
    postIdsPerPage: PropTypes.object,
    postsById: PropTypes.object
  };

  componentWillMount() {
    console.warn('this call shall not be necessary once server side render works');
    let page = _get(this.props, 'params.currentPage', 1) * 1;
    if (!_get(this.props.postIdsPerPage, page, false))
    {
      this.props.dispatch(postLoadPage(page, nbPerPage));
    }
  }

  componentWillReceiveProps(nextProps) {
    let page = _get(this.props, 'params.currentPage', 1) * 1;
    let nextPage = _get(nextProps, 'params.currentPage', 1) * 1;
    if (page !== nextPage && !_get(this.props.postIdsPerPage, nextPage, false))
    {
      this.props.dispatch(postLoadPage(nextPage, nbPerPage));
    }
  }

  loadPostForCurrentPage() {
    let page = _get(this.props, 'params.currentPage', 1) * 1;
    this.props.dispatch(postLoadPage(page, nbPerPage));
  }

  render() {
    const { params, postIdsPerPage, postsById, nbPages } = this.props;
    const currentPage = params.currentPage ? 1 * params.currentPage : 1;
    let posts = [];
    _get(postIdsPerPage, currentPage, []).forEach( id => {
      posts.push(postsById[id]);
    });

    return (
      <div>
        <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
        <PostsList posts={posts}/>
        <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
      </div>
    );
  }
}
