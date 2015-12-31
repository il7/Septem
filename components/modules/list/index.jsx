import React from 'react';

export default class List extends React.Component {
  render() {
    return <ListContainer>{ this.props.children.map((item, idx) => {
      return <ListItem key={idx}>{item}</ListItem> 
    }) }</ListContainer>
  }
}

export class ListContainer extends React.Component {
  render() {
    return <li>{this.props.children}</li>
  }
}

export class ListItem extends React.Component {
  render() {
    return <li>{this.props.children}</li>
  }
}