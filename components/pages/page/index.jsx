import React from 'react';
import { Link } from 'react-router';

import Logo from '../../modules/logo/index';
import Strata from '../../modules/strata/index';
import Loader from '../../modules/loader/index';

import Footer from '../../layouts/footer/index';
import PageLayout from '../../layouts/page/index';

var fetch = fetch || undefined;

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchData() {
    var url = '/api/?single=true&key=' + (this.props.name || this.props.params.name);
    // console.log('called: ' + url);

    if (fetch !== undefined) {
      fetch(url)
        .catch(err => this.props.history.replace('/error'))
        .then(res => res.json())
        .then(res => {
          if (+res.errorCode === 404) {
            this.props.history.replace('/error');
          } else {
            this.setState(res.results) 
          }
        })
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    var contents;
    if (this.state.contents) {
      contents = <main className="rhythm extend-base" dangerouslySetInnerHTML={{ __html: this.state.contents }} />
    } else {
      contents = <Loader limit="1" depth="5" />
    }

    return <PageLayout><Strata>{contents}</Strata></PageLayout>
  }
}