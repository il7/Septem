import React from 'react';
import Footer from '../modules/footer.jsx';

export default class SimpleLayout extends React.Component {
  render() {
    return (<div>
      {this.props.children}
      <Footer />
    </div>)
  }
}