import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import history from './history';

import App from './app';
import Page from './pages/page/index';
import Home from './pages/home/index';
import Error from './pages/error/index';

export default <Router history={ history }>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="error" component={Error}/>
    <Route path=":name" component={Page} />
  </Route>
</Router>