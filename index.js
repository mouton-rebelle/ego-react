import './sass/index.scss';

import BrowserHistory from 'react-router/lib/BrowserHistory';
import React from 'react';
import EgoFrontRouter from './containers/EgoFrontRouter';

React.render(
  <EgoFrontRouter history={new BrowserHistory()} />,
  document.getElementById('root')
);
