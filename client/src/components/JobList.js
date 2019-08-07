import React, { Component } from 'react';
import {
  UncontrolledCollapse, Card, CardHeader, CardBody, CardText, Button, Spinner, Progress,
  InputGroup, InputGroupAddon, Input
} from 'reactstrap';

import ChecklistList from './ChecklistList';
import ChecklistQuery from './ChecklistQuery';
import OwnerList from './OwnerList';

class JobList extends Component {

  state = {
    newOwner: '',
    newOwnerName: ''
  }

  inputAddress = (event) => {
    this.setState({ newOwner: event.target.value })
  }

  inputName = (event) => {
    this.setState({ newOwnerName: event.target.value })
  }

  _grantPermission = (event) => {
    if (this.state.newOwner || this.state.newOwner !== '' || this.state.newOwnerName || this.state.newOwnerName !== '') 
      this.props._grantPermission(this.state.newOwner, this.state.newOwnerName, event.target.value);
  }

  render() {
    const printAllJobs =
      (this.props.myJobs) ? (
        this.props.myJobs.map((job) => {
          console.log(job.info[4])
          const showAllSharedOwners =
            (job.info[4].length > 0) ? (
              <div>
                <OwnerList
                  jobId={job.id}
                  ownersAddress={job.info[4]}
                  sharedOwners={job.sharedOwners}
                  /*_revokePermission={this.props._revokePermission}*/ />
              </div>
            ) : "";
          const showProgress =
            (job.info[2] > 0) ? (
              <CardText>{job.info[3]}/{job.info[2]}</CardText>
            ) : (
                <CardText>0/0</CardText>
              );
          const showCheckLists =
            (job.info[2] > 0) ? (
              <div>
                <ChecklistList
                  jobId={job.id}
                  checkLists={job.checkLists}
                  _finishCheckList={this.props._finishCheckList}
                  _unfinishCheckList={this.props._unfinishCheckList}
                  _addTask={this.props._addTask}
                  _finishTask={this.props._finishTask}
                  _unfinishTask={this.props._unfinishTask} />
              </div>
            ) : "";
          return (
            <div key={job.id}>
              <Card>
                <CardHeader><Progress value={100 * job.info[3] / job.info[2]} /></CardHeader>
                <CardBody>
                  <div className="clearfix">
                    <CardText className="float-left">
                      {job.info[0]}
                    </CardText>
                    {showAllSharedOwners}
                  </div>
                  {showProgress}
                  <InputGroup>
                    <Button id={"toggle" + job.id} outline>Show detail</Button>
                    <Input onChange={this.inputAddress} placeholder="Your friend's address" />
                    <Input onChange={this.inputName} placeholder="And your friend's name" />
                    <InputGroupAddon addonType="append"><Button value={job.id} onClick={this._grantPermission}>Grant Permission</Button></InputGroupAddon>
                  </InputGroup>
                  <UncontrolledCollapse toggler={"toggle" + job.id}>
                    <ChecklistQuery
                      jobId={job.id}
                      _addCheckList={this.props._addCheckList} />
                    {showCheckLists}
                  </UncontrolledCollapse>
                </CardBody>
              </Card>
            </div>
          )
        })
      ) : (
          <Spinner color="primary" />
        );

    return (
      <div>
        {printAllJobs}
      </div>
    );
  }
}

export default JobList;