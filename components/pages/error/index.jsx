import React from 'react';
import { Link } from 'react-router';

import Logo from '../../modules/logo/index';
import Strata from '../../modules/strata/index';
import Heading from '../../modules/heading/index';
import Footer from '../../layouts/footer/index';

export default class ErrorPage extends React.Component {
  render() {
    return (<div>
      <Strata>
        <Link to="/"><Logo /></Link>    
        <header className="rhythm-small">
          <Heading level="1">Move among</Heading>
          <Heading level="2">Nothing to see here</Heading>
        </header>

        <p>Looks like we&#x27;ve made a mistake and sent you to an empty space, or maybe you&#x27;re trying to uncover superimportant secrets.</p>
        <p>However you ended up at this dusty corner of internets, the <Link to="/" className="t-dark">homepage</Link> will probably get you back on track.  Google is also renowned for it&#x27;s <a href="https://google.com">search tool</a> if you want to explore the vast expanse of the web.</p>
      </Strata>

      <Footer />
    </div>)
  }
}