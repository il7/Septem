import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import history from './history.js';

import ArchiveFactory from './factories/archive.jsx';

import App from './app.jsx';
import Page from './modules/page.jsx';
import Home from './pages/home.jsx';
import Error from './pages/error.jsx';

const ArticlesArchive = ArchiveFactory({ title: 'Articles', type: 'articles' })
const OpenSourceArchive = ArchiveFactory({ title: 'Open Source', type: 'open-source' });

export default <Router history={ history }>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="articles" component={ArticlesArchive} />
    <Route path="open-source" component={OpenSourceArchive} />
    <Route path="error" component={Error}/>
    <Route path=":name" component={Page} />
  </Route>
</Router>