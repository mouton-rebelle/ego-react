import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import '../sass/components/element.scss';

export default class PostImage extends Component {

  static propTypes = {
    image      : PropTypes.object.isRequired,
    weight     : PropTypes.number.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      zoom: false
    };
  }

  handleClick() {
    console.log('handle click');
  }

  renderTag(t) {
    let temp = t.split(':');
    if (temp.length === 2)
    {
      let [cat, name] = temp;
      return <span key={t} className="tag"><span className="tag__cat">{cat}</span> <span className="tag__value">{name}</span> </span>;
    } else {
      return <span key={t} className="tag"><span className="tag__value">{t}</span> </span>;
    }
  }

  render() {

    const {image, weight} = this.props;
    const styles          = {flexBasis:weight + '%', WebkitFlexBasis:weight + '%'};
    const classes         = cx('image', 'image--border');

    return (
      <div  className={classes} onClick={::this.handleClick} style={styles}>
        <div className="image__info">
          <h4 className="image__info__title">{ image.label }</h4>
          <p className="image__info__desc">{ image.desc }</p>
          { image.tags
              .sort( (a, b) => a > b ? 1 : -1 )
              .map( t => this.renderTag(t) )
          }
        </div>
        <img className="element__image" src={ '/orig/' + image.file} />
      </div>
    );
  }
}
