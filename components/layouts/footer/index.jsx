import React from 'react';

import { Link } from 'react-router';
import Strata from '../../modules/strata/index';
import { ListContainer, ListItem } from '../../modules/list/index';

export default class Footer extends React.Component {
  render() {
    return <Strata type="footer" layout="footer">
      <nav className="small">
        <ListContainer className="list rhythm-small">
          <ListItem><Link to="/articles" className="t-articles">Articles</Link></ListItem>
          <ListItem><Link to="/open-source" className="t-open-source">Open Source Projects</Link></ListItem>
          <ListItem><Link to="/contribute" className="t-contribute">Contribute</Link></ListItem>
        </List>
      </nav>

      <div className="small">&copy; Copyright 2015</div>
    </Strata>
  }
}