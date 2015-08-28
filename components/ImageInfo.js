import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import '../sass/components/imageInfo.scss';
import { Link } from 'react-router';

export default class ImageInfo extends Component {

  static propTypes = {
    image      : PropTypes.object.isRequired
  };

  renderTag(t) {
    let temp = t.split(':');
    if (temp.length === 2)
    {
      let [cat, name] = temp;
      return (
        <span className="tag" key={t}>
          <span className="tag__cat">{cat}</span>
          <span className="tag__value">{name}</span>
        </span>
      );
    } else {
      return (
        <span className="tag" key={t}>
          <span className="tag__value">{t}</span>
        </span>
      );
    }
  }

  render() {

    const {image} = this.props;
    return (
      <div className="imgInfo">
        <h4 className="imgInfo__title">{ image.label }</h4>
        <p className="imgInfo__desc">{ image.desc }</p>
        { image.tags
            .sort( (a, b) => a > b ? 1 : -1 )
            .map( t => this.renderTag(t) )
        }
      </div>
    );
  }
}
