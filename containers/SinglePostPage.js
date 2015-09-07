import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { postLoadById } from '../actions/PostActions';
import Post from './Post';
import PostDetail from '../components/PostDetail';



@connect(state => ({
  byId: state.posts.byId
}))
export default class SinglePostPage extends Component {

  static propTypes={
    byId: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  componentWillMount() {
    if (!this.props.byId[this.props.params.id])
    {
      this.props.dispatch(postLoadById(this.props.params.id));
    }
  }

  render() {
    const { byId, params } = this.props;
    const p = byId[params.id];
    if (params.imageId)
    {
      return (
        p ? (<PostDetail
          child={p.child}
          desc={p.desc}
          id={p._id}
          imageId={params.imageId}
          title={p.title}
          />) : null
      );
    } else {
      return (
        p ? (<Post
          id={p._id}
          key={p._id}
          post={p}
          />) : null
      );
    }
  }
}
