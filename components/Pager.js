import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

const numPagesToShow = 5;

class Page {
  constructor(label, page, disabled, current = false)
  {
    this.label      = label;
    this.page       = page;
    this.disabled   = disabled;
    this.current    = current;
  }
}


export default class Pager extends Component {

  static propTypes = {
    basePath    : PropTypes.string.isRequired,
    currentPage : PropTypes.number.isRequired,
    nbPages     : PropTypes.number.isRequired
  };

  render() {

    const { basePath, nbPages, currentPage } = this.props;
    let startPager = currentPage - Math.floor(numPagesToShow / 2);
    let pages = [];
    if (startPager < 1)
    {
      startPager = 1;
    }
    if (startPager + Math.floor(numPagesToShow / 2) > nbPages)
    {
      startPager = nbPages - numPagesToShow;
    }

    pages.push(new Page('first', 1, currentPage === 1));
    pages.push(new Page('prev', currentPage - 1, currentPage === 1));

    for (let p = startPager; p <= startPager + numPagesToShow; p++)
    {
      pages.push(new Page(p, p, p === currentPage, p === currentPage));
    }

    pages.push(new Page('next', currentPage + 1, currentPage === nbPages));
    pages.push(new Page('last', nbPages, currentPage === nbPages));



    return (
      <div className="pager">
        <div className="pager__legend">showing page { currentPage } of { nbPages }</div>
        <div className="pager__content">
          {
            pages.map( (p, index) => {
              const classes = cx('pager__content__item', 'btn', {'btn--disabled': p.disabled}, {'btn--active': p.active});
              return <Link to={basePath + p.page} className={classes} disabled={p.disabled} key={index}>{p.label}</Link>
            })
          }
        </div>
      </div>
    );
  }
}
