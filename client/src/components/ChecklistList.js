import React, { Component } from 'react';
import { Progress, UncontrolledCollapse, Card, CardHeader, CardBody, CardText, Button } from 'reactstrap';

import TaskList from './TaskList';
import TaskQuery from './TaskQuery';

class ChecklistList extends Component {

  _finish = (event) => {
    this.props._finishCheckList(this.props.jobId, event.target.value);
  }

  _unfinish = (event) => {
    this.props._unfinishCheckList(this.props.jobId, event.target.value);
  }

  render() {
    const printAllCheckLists =
      this.props.checkLists.map(checkList => {
        const showName =
          (checkList.info[1]) ? (
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" 
                id={`defaultCheckListChecked${checkList.id}`} value={checkList.id} onChange={this._unfinish} checked/>
              <label className="custom-control-label" htmlFor={`defaultCheckListChecked${checkList.id}`}>
                <CardText>{checkList.info[0]}</CardText>
              </label>
            </div>
          ) : (
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" 
                id={`defaultCheckListUnchecked${checkList.id}`} value={checkList.id} onChange={this._finish}/>
              <label className="custom-control-label" htmlFor={`defaultCheckListUnchecked${checkList.id}`}>
                <CardText>{checkList.info[0]}</CardText>
              </label>
            </div>
            );
        const showProgress =
          (checkList.info[2] > 0) ? (
            <CardText>{checkList.info[3]}/{checkList.info[2]}</CardText>
          ) : (
              <CardText>0/0</CardText>
            );
        const showTasks =
          (checkList.info[2] > 0) ? (
            <div>
              <TaskList
                jobId={this.props.jobId}
                checkListId={checkList.id}
                tasks={checkList.tasks}
                _finishTask={this.props._finishTask}
                _unfinishTask={this.props._unfinishTask} />
            </div>
          ) : "";
        return (
          <div key={checkList.id}>
            <Card>
              <CardHeader><Progress value={100 * checkList.info[3] / checkList.info[2]} /></CardHeader>
              <CardBody>
                {showName}
                {showProgress}
                <Button id={"toggle" + checkList.id + "cl"}>Show detail</Button>
                <UncontrolledCollapse toggler={"toggle" + checkList.id + "cl"}>
                  <TaskQuery
                    jobId={this.props.jobId}
                    checkListId={checkList.id}
                    _addTask={this.props._addTask} />
                  {showTasks}
                </UncontrolledCollapse>
              </CardBody>
            </Card>
          </div>
        )
      })
    return (
      <div>
        {printAllCheckLists}
      </div>
    );
  }
}

export default ChecklistList;