import React, { Component } from 'react';
import { Card, CardBody, CardText, Form, Button, Input } from 'reactstrap';

class TaskQuery extends Component {
  state = {
    taskName: ''
  }

  inputType = (event) => {
    this.setState({ taskName: event.target.value })
  }

  _addTask = () => {
    if (this.state.taskName && this.state.taskName !== '')
      this.props._addTask(this.props.jobId, this.props.checkListId, this.state.taskName)
  }

  render() {
    return (
      <div>
        <Card>
          <Form>
            <CardBody>
              <CardText><Input onChange={this.inputType} placeholder="Task description" /></CardText>
              <Button onClick={this._addTask}>Create a new Task</Button>
            </CardBody>
          </Form>
        </Card>
      </div>
    );
  }
}

export default TaskQuery;