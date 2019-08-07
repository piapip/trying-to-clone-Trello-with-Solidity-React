import React, { Component } from "react";
import Web3 from "web3";
import { BrowserRouter, Route } from 'react-router-dom';

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Bulletin from "./contracts/Bulletin.json";
import HomeScreen from "./containers/HomeScreen";
// import JobDetailed from "./containers/JobDetailed";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      myContract: [],
      myJobs: []
    }
  }

  componentDidMount = async () => {
    const web3 = await new Web3(Web3.givenProvider);
    let account = await web3.eth.getCoinbase();
    this.setState({ account })

    let balance = web3.utils.fromWei(await web3.eth.getBalance(account))
    this.setState({ balance })

    let networkId = await web3.eth.net.getId();
    let myContract = new web3.eth.Contract(Bulletin.abi, Bulletin.networks[networkId].address)
    await this.setState({ myContract });
    myContract.events.allEvents()
    .on("data", () => {
      window.location.reload()
    })
    this._getJobsByOwner();
    // this._getAllJobs();
  };

  _getJobsByOwner = async () => {
    let jobList = await this.state.myContract.methods._getJobsByOwner(this.state.account).call({ from: this.state.account })
    let myJobs = []
    for (let id of jobList) {
      let job = [];
      job.id = id
      job.info = await this.state.myContract.methods._getJobInfo(id).call({ from: this.state.account })
      //
      ///
      ////
      //Bug after share permission
      ////
      ///
      //
      // console.log(job.info)
      //
      ///
      ////
      //Bug after share permission
      ////
      ///
      //
      if (job.info[2] > 0) {
        job.checkLists = []
        for (let checkListCount = 0; checkListCount < job.info[2]; checkListCount++) {
          let checkList = [];
          checkList.id = checkListCount;
          checkList.info = await this.state.myContract.methods._getCheckListInfo(job.id, checkListCount).call({ from: this.state.account })
          if (checkList.info[2] > 0) {
            checkList.tasks = []
            for (let taskCount = 0; taskCount < checkList.info[2]; taskCount++) {
              let task = [];
              task.id = taskCount;
              task.info = await this.state.myContract.methods._getTaskInfo(job.id, checkList.id, taskCount).call({ from: this.state.account })
              checkList.tasks.push(task);
            }
          }
          job.checkLists.push(checkList);
        }
      }

      if(job.info[4].length > 0) {
        job.sharedOwners = []
        for (let ownerCount = 0; ownerCount < job.info[4].length; ownerCount++) {
          let sharedOwnerAddress = job.info[4][ownerCount];
          let ownerName = await this.state.myContract.methods._getFriendName(this.state.account, sharedOwnerAddress).call({from: this.state.account});
          job.sharedOwners.push(ownerName)
        }
      }
      myJobs.push(job);
    }
    this.setState({ myJobs })
  }

  _addJob = (jobName) => {
    this.state.myContract.methods._addJob(jobName).send({ from: this.state.account })
  }

  _addCheckList = (jobId, checkListName) => {
    this.state.myContract.methods._addCheckList(jobId, checkListName).send({ from: this.state.account })
  }

  _finishCheckList = (jobId, checkListId) => {
    this.state.myContract.methods._finishCheckList(jobId, checkListId).send({ from: this.state.account })
  }

  _unfinishCheckList = (jobId, checkListId) => {
    this.state.myContract.methods._unfinishCheckList(jobId, checkListId).send({ from: this.state.account })
  }

  _addTask = (jobId, checkListId, taskName) => {
    this.state.myContract.methods._addTask(jobId, checkListId, taskName).send({ from: this.state.account })
  }

  _finishTask = (jobId, checkListId, taskId) => {
    this.state.myContract.methods._finishTask(jobId, checkListId, taskId).send({ from: this.state.account })
  }

  _unfinishTask = (jobId, checkListId, taskId) => {
    this.state.myContract.methods._unfinishTask(jobId, checkListId, taskId).send({ from: this.state.account })
  }

  _grantPermission = (newOwner, newOwnerName, jobId) => {
    this.state.myContract.methods._shareJobOwner(newOwner, newOwnerName, jobId).send({ from: this.state.account })
  }

  //Bug as shit, don't use it
  // _revokePermission = (friendAddress, jobId) => {
  //   this.state.myContract.methods._revokeOwner(friendAddress, jobId).send({ from: this.state.account })
  // }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path='/'
            render={(props) => {
              return <HomeScreen
                account={this.state.account}
                balance={this.state.balance}
                myJobs={this.state.myJobs}
                _addJob={this._addJob} 
                _grantPermission={this._grantPermission}
                // _revokePermission={this._revokePermission}
                _addCheckList={this._addCheckList}
                _finishCheckList={this._finishCheckList}
                _unfinishCheckList={this._unfinishCheckList}
                _addTask={this._addTask}
                _finishTask={this._finishTask}
                _unfinishTask={this._unfinishTask}/>
            }} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;