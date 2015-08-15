import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';

const numPagesToShow = 5;

class Page {
  constructor(label, start, disabled, current = false)
  {
    this.rangeStart = start;
    this.label      = label;
    this.disabled   = disabled;
    this.current    = current;
  }
}


export default class Pager extends Component {

  static propTypes = {
    changeRange : PropTypes.func.isRequired,
    count       : PropTypes.number.isRequired,
    perPage     : PropTypes.number.isRequired,
    range       : PropTypes.array.isRequired
  };

  handleClick( page )
  {
    this.props.changeRange([page.rangeStart, page.rangeStart + this.props.perPage]);
  }

  render() {

    const { range, count, perPage } = this.props;
    const nbPage  = Math.floor(count / perPage);
    const currentPage  = (range[0] + perPage) / perPage;


    /*
    We want :
      - first / last page
      - prev / next page
      - 4 pages around the current one

    We will only compute range[0]
    */

    let targetRanges = [];
    targetRanges.push(new Page('first', 0, range[0] === 0));
    targetRanges.push(new Page('prev', range[0] - perPage, range[0] === 0));
    let startPager = currentPage - Math.floor(numPagesToShow / 2);
    if (startPager < 1)
    {
      startPager = 1;
    }
    if (startPager + Math.floor(numPagesToShow / 2) > nbPage)
    {
      startPager = nbPage - numPagesToShow;
    }

    for (let p = startPager; p <= startPager + numPagesToShow; p++)
    {
      targetRanges.push(new Page(p, perPage * (p - 1), p === currentPage, p === currentPage));
    }

    targetRanges.push(new Page('next', range[0] + perPage, currentPage === nbPage));
    targetRanges.push(new Page('last', nbPage * perPage, currentPage === nbPage));



    return (
      <div className="pager">
        <div className="pager__legend">showing posts { range[0] } to { range[1] } of { count }</div>
        <div className="pager__content">
          {
            targetRanges.map( (p, index) => {
              const classes = cx('pager__content__item', 'btn', {'btn--disabled': p.disabled}, {'btn--active': p.active});
              return <button onClick={() => this.handleClick(p)} className={classes} disabled={p.disabled} key={index}>{p.label}</button>
            })
          }
        </div>
      </div>
    );
  }
}
