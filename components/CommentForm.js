import React, { PropTypes, Component } from 'react';
import Btn from './Btn';
import {connectReduxForm} from 'redux-form';

function validateComment(data) {
  const errors = {};
  if(!data.author) {
    errors.author = 'Required';
  }
  if(!data.text || data.text.length < 5) {
    errors.text = 'At least 5 chars';
  }

  return errors;
}

@connectReduxForm({
  form: 'contact',
  fields: ['author', 'text'],
  validate: validateComment
})
export default class CommentForm extends Component{

  static propTypes = {
    fields       : PropTypes.object.isRequired,
    handleSubmit : PropTypes.func.isRequired
  };

  render() {
    const { fields: {author, text}, handleSubmit } = this.props;
    return (
      <form className="com__form" onSubmit={handleSubmit}>
        <textarea {...text}/>
        <br/>
        <input {...author}/><br />
        <Btn kind="primary" text="add comment" onClick={handleSubmit}/>
      </form>
    );
  }
}
