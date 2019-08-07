import React, { Component } from 'react';
import { Card, CardBody, CardText, Form, Button, Input } from 'reactstrap';

class JobQuery extends Component {
  state = {
    jobName: ''
  }

  inputType = (event) => {
    this.setState({ jobName: event.target.value })
  }

  _addJob = () => {
    if (this.state.jobName || this.state.jobName !== '')
      this.props._addJob(this.state.jobName)
  }

  render() {
    return (
      <div>
        <Card>
          <Form>
            <CardBody>
              <CardText><Input onChange={this.inputType} placeholder="Job description" /></CardText>
              <Button onClick={this._addJob}> Create a new Job</Button>
            </CardBody>
          </Form>
        </Card>
      </div>
    );
  }
}

export default JobQuery;