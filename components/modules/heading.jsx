import React from 'react';
import { Link } from 'react-router';

export default class Heading extends React.Component {
  render() {
    this.tagName = 'h' + (this.props.level || 3);
    var children = this.props.children;
    var className = "heading " + (this.props.className || '');
    if (this.props.to) 
      children = <Link to={this.props.to}>{this.props.children}</Link>;
    return <this.tagName className={className}>{children}</this.tagName>;
  }
}
