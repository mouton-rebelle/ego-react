import './sass/index.scss';

import createHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import EgoFrontRouter from './containers/EgoFrontRouter';

ReactDOM.render(
  <EgoFrontRouter history={createHistory()} />,
  document.getElementById('root')
);
