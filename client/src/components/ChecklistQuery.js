import React, { Component } from 'react';
import { Card, CardBody, CardText, Form, Button, Input } from 'reactstrap';

class ChecklistQuery extends Component {

  state = {
    checkListName: ''
  }

  inputType = (event) => {
    this.setState({ checkListName: event.target.value })
  }

  _addCheckList = () => {
    if (this.state.checkListName && this.state.checkListName !== '')
      this.props._addCheckList(this.props.jobId, this.state.checkListName)
  }

  render() {
    return (
      <div>
        <Card>
          <Form>
            <CardBody>
              <CardText><Input onChange={this.inputType} placeholder="CheckList description" /></CardText>
              <Button onClick={this._addCheckList}>Create a new CheckList</Button>
            </CardBody>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ChecklistQuery;