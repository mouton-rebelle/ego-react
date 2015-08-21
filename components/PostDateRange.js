import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import moment from 'moment';
import '../sass/components/postDateRange.scss';

export default class PostDateRange extends Component {

  static propTypes = {
    dates      : PropTypes.array.isRequired
  };

  renderCal(moment)
  {
    return (
       <span className="almn pdr__item">
        <span className="almn__year">{ moment.format('YYYY')}</span>
        <span className="almn__date">{ moment.format('DD')}</span>
        <span className="almn__month">{ moment.format('MMM')}</span>
      </span>
    )
  }

  render() {
    const { dates } = this.props;
    const first     = moment(dates[0]);
    const last      = moment(dates[dates.length - 1]);
    const single    = first.isSame(last, 'day');
    let calendars = [first];
    if (!single)
    {
      calendars.push(last);
    }
    return (
      <div className="pdr">
        { this.renderCal(first) }
        { single ? '' : <span className="pdr__item">↔</span>}
        { single ? '' : this.renderCal(last)}
      </div>
    );
  }
}
