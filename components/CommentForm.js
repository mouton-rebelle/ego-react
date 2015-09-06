import React, { PropTypes, Component } from 'react';
import Btn from './Btn';
export default class CommentForm extends Component{

  static propTypes = {
    postId : PropTypes.string.isRequired,
    save   : PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      author:'',
      text: ''
    };
  }

  authorChanged(e)
  {
    console.log(e);
    this.setState({author:e.target.value});
  }

  textChanged(e)
  {
    this.setState({text:e.target.value});
  }

  save(){
    let com = {
      text: this.state.text,
      author: this.state.author
    };
    this.props.save(com);
  }
  render() {
    return (
      <div className="com__form">
        <textarea onChange={this.textChanged.bind(this)} value={ this.state.text }/>
        <br/>
        <input  onChange={this.authorChanged.bind(this)} placeholder="signature" type="text" value={ this.state.author }/><br />
        <Btn handler={this.save.bind(this)} kind="primary" text="add comment" />
      </div>
    );
  }
}
