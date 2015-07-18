import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import '../sass/components/element.scss';

export default class PostImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      zoom: false
    };
  }

  handleClick(event) {
    this.setState({zoom: !this.state.zoom});
  }
  render() {
    const {image, weight} = this.props;
    const zoom            = this.state.zoom;
    const styles          = {flexBasis:weight + '%',WebkitFlexBasis:weight + '%'};
    const classes         = cx('image','image--border', {'image--zoom':zoom});
    return (
      <div style={styles} className={classes} onClick={::this.handleClick}>
        <img className="element__image" src={ 'http://ego.mouton-rebelle.com/uploads/ego/orig/' + image.file} />
      </div>
    );
  }
}
