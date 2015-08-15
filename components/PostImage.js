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
    this.setState({zoom: !this.state.zoom});
  }
  render() {

    const {image, weight} = this.props;
    const zoom            = this.state.zoom;
    const styles          = {flexBasis:weight + '%', WebkitFlexBasis:weight + '%'};
    const classes         = cx('image', 'image--border', {'image--zoom':zoom});

    return (
      <div  className={classes} onClick={::this.handleClick} style={styles}>
        <img className="element__image" src={ '/orig/' + image.file} />
      </div>
    );
  }
}
