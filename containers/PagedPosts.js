import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import Pager from '../components/Pager';
import { postLoadPage } from '../actions/PostActions';

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

  componentWillMount() {
    console.warn('this call shall not be necessary once server side render works');
    this.props.dispatch(postLoadPage(this.props.params.currentPage ? this.props.params.currentPage : 1, nbPerPage));
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.params.currentPage * 1 !== 1 && nextProps.params.currentPage * 1 !== this.props.params.currentPage * 1)
    {
      this.props.dispatch(postLoadPage(nextProps.params.currentPage, nbPerPage));
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
