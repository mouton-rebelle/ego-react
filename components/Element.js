import React, { PropTypes } from 'react';

import '../sass/components/element.scss';

export default class Element {
  static propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    src: PropTypes.string.isRequired
  }

  render() {
    const { title, desc, src } = this.props;
    console.log(title,desc, src);
    return (
      <div className='element'>
        <div className="element__info">
          <h3 className="element__info__title">{title}</h3>
          { desc ? <div className="element__info__desc">{desc}</div> : null }
        </div>
        <img className="element__image" src={src} />
      </div>
    );
  }
}
