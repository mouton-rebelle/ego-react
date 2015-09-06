import React, { PropTypes, Component } from 'react';

export default class CommentForm extends Component{

  static propTypes = {
    postId : PropTypes.number
  };

  render() {
    const { postId } = this.props;
    return (
      <form className="com__form">
        <textarea>
        </textarea><br/>
        <input type="text" placeholder="signature"/><br />
        <button>add comment</button>
      </form>
    );
  }
}
