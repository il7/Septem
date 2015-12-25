import React from 'react';
import params from 'query-params';
import Heading from '../heading/index';
import Loader from '../loader/index';

export default class ArchiveList extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props)
    
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
    var results;

    if (this.state.results.length > 0) {
      results = this.state.results.map(function(post) {
        var excerpt;
        var date;

        if (post.excerpt) {
          excerpt = <p className="textblock textblock-2-lines">
            {post.excerpt.substr(0, 120)}
          </p>;
        }

        if (self.props.dates !== 'false' && post.date) {
          date = <p><small>{formatdate(post.date)}</small></p>
        }

        return <li key={post._id}>
          <Heading level="3" to={'/' + post.slug}>{post.title}</Heading>
          {date}
          {excerpt}
        </li>
      }); 
    } else {
      var depth = self.props.dates == 'false' ? 1 : 2;
      results = <li><Loader limit={self.props.limit || 3} depth={depth} /></li>;
    }

    return (<ul className="rhythm">{results}</ul>)
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