import React from 'react';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    var blocks = [];
    for (var i = 0; i < +this.props.limit; i++) blocks.push(i);
    
    var lines = [];
    for (var i = 0; i < +this.props.depth; i++) lines.push(i);

    this.state = { blocks: blocks, lines: lines };
  }
  render() {
    var self = this;
    return <div>{ self.state.blocks.map(function(block) { 
      return <div className="loader" key={block}>
        <div className="loader-line loader-line-header"><div /></div>
        { self.state.lines.map(function(line) { 
          return <div key={line} className="loader-line"><div /></div>
        }) }
      </div>
    }) }</div>;
  }
}