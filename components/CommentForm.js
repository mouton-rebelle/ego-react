import React, { PropTypes, Component } from 'react';
import Btn from './Btn';
import {connectReduxForm} from 'redux-form';
import FormControl from './form/FormControl';

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
    const {  fields: {author, text}, handleSubmit } = this.props;
    console.log(text);
    return (
      <form className="com-form" onSubmit={handleSubmit}>
        <FormControl {...text} className="mb">
          <textarea {...text} rows="4" />
        </FormControl>
        <div className="fc">
          <FormControl {...author} className="fc__item fc__item--grow" style={ {marginRight:'0.3rem'} }>
            <input {...author}/>
          </FormControl>
          <Btn disabled={!(text.valid && text.dirty && author.valid && author.dirty)}
           handler={handleSubmit} kind="primary" text="add comment" className="fc__item"/>
        </div>
      </form>
    );
  }
}
