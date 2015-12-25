import React from 'react';

import { Link } from 'react-router';
import Logo from '../modules/logo.jsx';
import Strata from '../modules/strata.jsx';
import Footer from '../modules/footer.jsx';

export default class PageLayout extends React.Component {
  render() {
    return (<div>
      <Strata type="header">
        <Link to="/"><Logo /></Link>
      </Strata>

      {this.props.children}
      
      <Footer />
    </div>)
  }
}