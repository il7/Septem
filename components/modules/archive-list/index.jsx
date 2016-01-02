import React from 'react';
import params from 'query-params';
import Heading from '../heading/index';
import Loader from '../loader/index';
import { ListContainer, ListItem } from '../list/index';

export default class ArchiveList extends React.Component {
  constructor(props) {
    super(props);
    
    var year = this.props.year;
    var range = year ? [parseInt(year, 10) + 1, year] : [];

    this.state = { results: [] };
    this.query = {
      single: false,
      limit: this.props.limit,
      descending: true,
      startkey: range[0],
      endkey: range[1]
    }
  }

  fetchData(start) {
    var url = '/api/' + this.props.type + '?' + params.encode(this.query);
    console.log('called: ' + url);

    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ results: res.results }))
      .catch(err => console.error(err))
  }

  componentWillMount() {
    this.fetchData()
  }

  render() {
    var self = this;

    if (this.state.results.length > 0) {
      return <ListContainer className="rhythm">{ this.state.results.map(function(post) {
        var date = (self.props.dates !== 'false' && post.date) ? <p>
          <small>{formatdate(post.date)}</small>
        </p> : undefined;
        
        var excerpt = post.excerpt ? <p className="textblock textblock-2-lines">
          {post.excerpt.substr(0, 120)}
        </p> : undefined;

        return <ListItem key={post._id}>
          <Heading level="3" to={'/' + post.slug}>{post.title}</Heading>
          {date}
          {excerpt}
        </ListItem>
      }) }</ListContainer> 
    } else {
      var depth = self.props.dates == 'false' ? 1 : 2;
      var limit = self.props.limit || 3;
      return <Loader limit={limit} depth={depth} />;
    }
  }
}


var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatdate(date) {
  date = new Date(date);
  var year = date.getFullYear();
  var month = months[date.getMonth()]
  var day = date.getDate();

  return month + ' ' + day + ', ' + year;
}