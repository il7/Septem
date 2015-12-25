import React from 'react';
import { Link } from 'react-router';

import Logo from '../../modules/logo/index';
import Strata from '../../modules/strata/index';
import Footer from '../footer/index';

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