import React, { PropTypes, Component } from 'react';
import '../sass/components/element.scss';
import { Link } from 'react-router';

export default class PostImage extends Component {

  static propTypes = {
    image      : PropTypes.object.isRequired,
    postUrl   : PropTypes.string.isRequired,
    weight     : PropTypes.number.isRequired
  };

  render() {

    const {postUrl, image, weight} = this.props;
    const styles          = {flexBasis:weight + '%', WebkitFlexBasis:weight + '%'};

    return (
      <Link className="image image--border" style={styles} to={`${postUrl}/${image._id}`}>
        <img alt={image.label} className="element__image" src={ 'http://eg0.me/uploads/ego/orig/' + image.file}/>
      </Link>
    );
  }
}
