import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { getCommentsForPost, saveComment } from '../actions/CommentActions';
import PostComments from '../components/PostComments';
import CommentForm from '../components/CommentForm';
import Btn from '../components/Btn';
import _get from 'lodash/object/get';

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

  toggleVisibility()
  {
    this.setState({visible:!this.state.visible});
    if (_get(this.props.commentsByPostId, this.props.postId, -1) === -1)
    {
      this.loadComments();
    }

  }


  loadComments() {
    const { postId, dispatch } = this.props;
    dispatch(getCommentsForPost(postId));
  }

  saveCommentForPost(comment) {
    const { postId, dispatch } = this.props;
    comment.post = postId;
    dispatch(saveComment(comment));
  }

  render() {
    const { commentsByPostId, postId, count } = this.props;
    let btnText = count ? `View ${ count } comment${ count > 1 ? 's' : '' } / leave yours` :
    'Be the first to comment';
    if (this.state.visible)
    {
      btnText = 'Hide this shit';
    }
    return (
      <div>
        <Btn
          handler={this.toggleVisibility.bind(this)}
          text={btnText} />
        { this.state.visible && commentsByPostId[postId] ? <PostComments comments={commentsByPostId[postId]} /> : null }
        { this.state.visible ? <CommentForm save={this.saveCommentForPost.bind(this)}/> : null }
      </div>
    );
  }
}
