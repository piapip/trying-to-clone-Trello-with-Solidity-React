import React, { Component } from 'react';

import JobQuery from '../components/JobQuery';
import JobList from '../components/JobList';
import Footer from '../components/Footer';

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <JobQuery 
          _addJob={this.props._addJob}/>
        <JobList 
          myJobs={this.props.myJobs}
          _grantPermission={this.props._grantPermission}
          // _revokePermission={this.props._revokePermission}
          _addCheckList={this.props._addCheckList}
          _finishCheckList={this.props._finishCheckList}
          _unfinishCheckList={this.props._unfinishCheckList}
          _addTask={this.props._addTask}
          _finishTask={this.props._finishTask}
          _unfinishTask={this.props._unfinishTask}/>
        <Footer 
          account = {this.props.account}
          balance = {this.props.balance}/>
      </div>  
    );
  }
}

export default HomeScreen;