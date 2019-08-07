import React, { Component } from 'react';

import Footer from "../components/Footer";

class JobDetailed extends Component {
  render() {
    return (
      <div>
        <Footer 
          account={this.props.account}
          balance={this.props.balance}/>
      </div>
    );
  }
}

export default JobDetailed;