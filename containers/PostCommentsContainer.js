import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { getCommentsForPost, saveComment, showCommentsForPost, hideCommentsForPost } from '../actions/CommentActions';
import PostComments from '../components/PostComments';
import CommentForm from '../components/CommentForm';
import Btn from '../components/Btn';
import _get from 'lodash/object/get';

@connect(state => ({
  commentsByPostId: state.comments.byPost,
  shownByPostId: state.comments.shownForPost
}))
export default class PostCommentsContainer extends Component {

  static propTypes={
    commentsByPostId : PropTypes.object,
    count            : PropTypes.number.isRequired,
    dispatch         : PropTypes.func.isRequired,
    postId           : PropTypes.string.isRequired,
    shownByPostId    : PropTypes.array.isRequired
  };

  toggleVisibility()
  {
    const { commentsByPostId, postId, dispatch, shownByPostId } = this.props;
    const isVisible = shownByPostId.indexOf(postId) !== -1;
    if (_get(commentsByPostId, postId, -1) === -1)
    {
      dispatch(getCommentsForPost(postId));
    }
    if (isVisible)
    {
      dispatch(hideCommentsForPost(postId));
    } else {
      dispatch(showCommentsForPost(postId));
    }
  }


  handleSubmit(postId, comment) {
    const { dispatch } = this.props;
    comment.post = postId;
    dispatch(saveComment(comment));
  }

  render() {
    const { commentsByPostId, shownByPostId,  postId, count } = this.props;
    const isVisible = shownByPostId.indexOf(postId) !== -1;
    let btnText = count ? `View ${ count } comment${ count > 1 ? 's' : '' } / leave yours` :
    'Be the first to comment';
    if (isVisible)
    {
      btnText = 'Hide this shit';
    }
    return (
      <div>
        <Btn
          handler={this.toggleVisibility.bind(this)}
          text={btnText} />
        { isVisible && commentsByPostId[postId] ? <PostComments comments={commentsByPostId[postId]} /> : null }
        { isVisible ? <CommentForm formKey={postId} onSubmit={this.handleSubmit.bind(this, postId)}/> : null }
      </div>
    );
  }
}
