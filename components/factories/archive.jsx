import React from 'react';
import PageLayout from '../layouts/page.jsx';

import { Link } from 'react-router';

import Logo from '../modules/logo.jsx';
import Strata from '../modules/strata.jsx';
import Heading from '../modules/heading.jsx';

import ArchiveList from '../modules/archive-list.jsx';

export default function ArchiveFactory(config) {
  return class Archive extends React.Component {
    render() {
      return (<PageLayout>
        <Strata layout="home-articles">
          <Heading level="1" className="strata-heading">{config.title} Archive</Heading>
          <ArchiveList type={config.type} year={config.year} />
        </Strata>
      </PageLayout>)
    }
  }
}