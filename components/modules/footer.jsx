import React from 'react';

import { Link } from 'react-router';
import Strata from '../modules/strata.jsx';

export default class Footer extends React.Component {
  render() {
    return (
      <Strata type="footer" layout="footer">
        <nav className="small"><ul className="list rhythm-small">
          <li><Link to="/articles" className="t-articles">Articles</Link></li>
          <li><Link to="/open-source" className="t-open-source">Open Source Projects</Link></li>
          <li><Link to="/contribute" className="t-contribute">Contribute</Link></li>
        </ul></nav>

        <div className="small">&copy; Copyright 2015</div>
      </Strata>
    );
  }
}