import React from 'react';

import { Link } from 'react-router';
import Strata from '../../modules/strata/index';
import List from '../../modules/list/index';

export default class Footer extends React.Component {
  render() {
    return <Strata type="footer" layout="footer">
      <nav className="small">
        <List className="list rhythm-small">
          <Link to="/articles" className="t-articles">Articles</Link>
          <Link to="/open-source" className="t-open-source">Open Source Projects</Link>
          <Link to="/contribute" className="t-contribute">Contribute</Link>
        </List>
      </nav>

      <div className="small">&copy; Copyright 2015</div>
    </Strata>
  }
}