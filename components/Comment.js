import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import '../sass/components/comment.scss';

export default class Comment extends Component{

  static propTypes = {
    author : PropTypes.string,
    text : PropTypes.string,
    when : PropTypes.string
  };

  render() {
    moment.locale('fr');
    const { author, text, when } = this.props;
    return (
      <div className="comment comlist__item">
        <div className="comment__text">
          {{ text }}
        </div>
        <div className="comment__meta">
          <span className="comment__meta__author">{ author}</span>
          <span className="comment__meta__date">{moment(when).format('LLLL')}</span>
        </div>
      </div>
    );
  }
}
