import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import App from './app';
import Home from './pages/home/index';
import Error from './pages/error/index';
import Page from './pages/page/index';

export const Routes = <Route path="/" component={App}>
  <IndexRoute component={Home} />
  <Route path="error" component={Error}/>
  <Route path=":name" component={Page} />
</Route>

export default <Router><Routes /></Router>