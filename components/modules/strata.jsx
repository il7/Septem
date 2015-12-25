import React from 'react';
import Header from './heading.jsx';

export default class Strata extends React.Component {
  render() {
    var cname = (this.props.className || '') + ' strata ' + (this.props.layout ? ' l-' + this.props.layout : '');
    this.type = this.props.type || 'div';
    return (
      <this.type className={cname}>
        <div className="wrapper rhythm">
          {this.props.children}
        </div>
      </this.type>
    )
  }
}

