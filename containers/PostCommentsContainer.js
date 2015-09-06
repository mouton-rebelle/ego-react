import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { getCommentsForPost, saveComment } from '../actions/CommentActions';
import PostComments from '../components/PostComments';
import CommentForm from '../components/CommentForm';


@connect(state => ({
  commentsByPostId: state.comments.byPost
}))
export default class PostCommentsContainer extends Component {
  static propTypes={
    commentsByPostId : PropTypes.object,
    count            : PropTypes.number.isRequired,
    dispatch         : PropTypes.func.isRequired,
    postId           : PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false
    };
  }


  loadComments() {
    const { postId, dispatch } = this.props;
    dispatch(getCommentsForPost(postId));
  }

  saveComment(comment) {
    const { postId, dispatch } = this.props;
    comment.post = postId;
    dispatch(saveComment(postId));
  }

  render() {
    const { commentsByPostId, postId, count } = this.props;
    return (
      <div>
        <button onClick={this.loadComments.bind(this)}>load</button>
        { commentsByPostId[postId] ? <PostComments comments={commentsByPostId[postId]} /> : null }
        <CommentForm postId={ postId } save={saveComment}/>
      </div>
    );
  }
}
