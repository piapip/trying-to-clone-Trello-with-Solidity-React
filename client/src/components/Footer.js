import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const printInfo =
    (this.props.account && this.props.balance) ? (
      <div className='text-center'>
        <p>Your account: {this.props.account}</p>
        <p>Balance: {this.props.balance}</p>
      </div>
    ) : "";
    return (
      <div>
        {printInfo}
      </div>  
    );
  }
}

export default Footer;