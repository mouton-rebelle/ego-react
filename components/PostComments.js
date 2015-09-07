import React, { PropTypes, Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

export default class PostComments extends Component{

  static propTypes = {
    comments : PropTypes.array
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <div className="comlist">
          { comments.map( (com, indice) => {
            return (
              <Comment author={com.author} key={indice} text={com.text} when={com.when} />
            );
          })}
        </div>
      </div>
    );
  }
}
