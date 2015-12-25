import React from 'react';
import { Link } from 'react-router';
import Logo from '../modules/logo.jsx';
import Strata from '../modules/strata.jsx';
import Footer from '../modules/footer.jsx';
import Loader from '../modules/loader.jsx';

import PageLayout from '../layouts/page.jsx';

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchData() {
    var url = '/api/?single=true&key=' + this.props.params.name;
    console.log('called: ' + url);

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

  componentWillMount() {
    this.fetchData()
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