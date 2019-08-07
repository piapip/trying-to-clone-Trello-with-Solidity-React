import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

class TaskList extends Component {

  _finish = (event) => {
    this.props._finishTask(this.props.jobId, this.props.checkListId, event.target.value);
  }

  _unfinish = (event) => {
    this.props._unfinishTask(this.props.jobId, this.props.checkListId, event.target.value);
  }

  render() {
    const printAllTasks =
      this.props.tasks.map(task => {
        // console.log(task.info)
        const showName =
          (task.info[1] === true) ? (
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" 
                id={`defaultTaskChecked${task.id}`} value={task.id} onChange={this._unfinish} checked/>
              <label className="custom-control-label" htmlFor={`defaultTaskChecked${task.id}`} >
                <CardText>{task.info[0]}</CardText>
              </label>
            </div>
          ) : (
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" 
                  id={`defaultTaskUnchecked${task.id}`} value={task.id} onChange={this._finish} />
                <label className="custom-control-label" htmlFor={`defaultTaskUnchecked${task.id}`}>
                  <CardText>{task.info[0]}</CardText>
                </label>
              </div>
            );
        return (
          <div key={task.id}>
            <Card>
              <CardBody>
                {showName}
              </CardBody>
            </Card>
          </div>
        )
      });
    return (
      <div>
        {printAllTasks}
      </div>
    );
  }
}

export default TaskList;