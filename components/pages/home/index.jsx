import React from 'react';
import { Link } from 'react-router';

import Logo from '../../modules/logo/index';
import Strata from '../../modules/strata/index';
import Heading from '../../modules/heading/index';
import ArchiveList from '../../modules/archive-list/index';

export default class Page extends React.Component {
  render() {
    return (<div className="l-home">
      <Strata layout="home-header">
        <Link to="/"><Logo /></Link>
        <p>What is IL7? sit amet adipiscing, <Link to="/articles" className="t-articles">Articles</Link> and <Link to="/open-source" className="t-open-source">Open Source Projects</Link> or elit, <Link to="/contribute" className="t-contribute">Contribute</Link> tempor incididunt ut labore.</p>
        <p>What is your position? Amet lacus hendrerit tempus non eget quam. Maecenas in maximus justo. Morbi rhoncus malesuada nisi, eu scelerisque lorem placerat id.</p>
      </Strata>

      <Strata layout="home-articles">
        <Heading level="2" to="/articles" className="strata-heading">Articles</Heading>
        <ArchiveList type="articles" limit="3" />
      </Strata>

      <Strata layout="home-open-source">
        <Heading level="2" to="/open-source" className="strata-heading">Open Source Projects</Heading>
        <ArchiveList type="open-source" limit="5" dates="false" />
      </Strata>

      <Strata layout="home-contribute">
        <Heading level="2" to="/contribute" className="strata-heading">Contribute</Heading>
        <p>How can others contribute? Amet adipiscing, Articles and Open Source Projects or elit.</p>
      </Strata>
    </div>)
  }
}