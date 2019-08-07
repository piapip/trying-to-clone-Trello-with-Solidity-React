pragma solidity ^0.5.8;
import "./Job.sol";

contract Bulletin {

  Job[] public jobs;

  function isOwner(uint _jobId) public view returns(bool) {
    for(uint i = 0; i < jobOwnerCount[_jobId]; i++) {
      if(msg.sender == jobToOwner[_jobId][i]) return true;
    }
    return false;}

  modifier onlyOwner(uint _jobId) {
    require(isOwner(_jobId), "It's not yours though.");
    _;}

  modifier trueOwner(uint jobId) {
    require(msg.sender == jobToOwner[jobId][0], "Lolz it's not really yours though.");
    _;}

  mapping(uint => mapping(uint => address)) jobToOwner;
  mapping(uint => uint) jobOwnerCount;
  mapping(address => uint) ownerJobsCount;
  mapping(address => mapping(address => string)) nicknameList;

  event NewJob();
  event NewCheckList();
  event CheckListGone();
  event CheckListDone();
  event CheckListNotDoneNoMore();
  event NewTask();
  event TaskGone();
  event TaskDone();
  event TaskNotDoneNoMore();
  event OwnershipShared();

  function _getJobsByOwner(address _owner) external view returns(uint[] memory){
    uint[] memory result = new uint[](ownerJobsCount[_owner]);
    uint counter = 0;
    for(uint i = 0; i < jobs.length; i++){
      if(isOwner(i)) {
        result[counter] = i;
        counter++;
      }
    }
    return result;}

  function _addJob(string calldata _name) external {
    Job sample = new Job(_name);
    uint id = jobs.push(sample) - 1;
    jobToOwner[id][0] = msg.sender;
    jobOwnerCount[id]++;
    ownerJobsCount[msg.sender]++;
    emit NewJob();}

  function _addTask(uint _jobId, uint _checkListId, string calldata _taskName) external onlyOwner(_jobId) {
    jobs[_jobId]._getCheckList(_checkListId)._addTask(_taskName);
    emit NewTask();}

  function _deleteTask(uint _jobId, uint _checkListId, uint _taskId) external onlyOwner(_jobId) {
    jobs[_jobId]._getCheckList(_checkListId)._deleteTask(_taskId);
    emit TaskGone();}

  function _finishTask (uint _jobId, uint _checkListId, uint _taskId) external onlyOwner(_jobId) {
    jobs[_jobId]._getCheckList(_checkListId)._getTask(_taskId)._finish();
    /*emit TaskDone();*/}

  function _unfinishTask(uint _jobId, uint _checkListId, uint _taskId) external onlyOwner(_jobId){
    jobs[_jobId]._getCheckList(_checkListId)._getTask(_taskId)._unfinish();
    /*emit TaskNotDoneNoMore();*/}

  function _addCheckList(uint _jobId, string calldata _checkListName) external onlyOwner(_jobId) {
    jobs[_jobId]._addCheckList(_checkListName);
    emit NewCheckList();}

  function _deleteCheckList(uint _jobId, uint _checkListId) external onlyOwner(_jobId) {
    jobs[_jobId]._deleteCheckList(_checkListId);
    emit CheckListGone();}

  function _finishCheckList (uint _jobId, uint _checkListId) external onlyOwner(_jobId) {
    jobs[_jobId]._getCheckList(_checkListId)._finish();
    /* emit CheckListDone();*/}

  function _unfinishCheckList (uint _jobId, uint _checkListId) external onlyOwner(_jobId) {
    jobs[_jobId]._getCheckList(_checkListId)._unfinish();
    /*emit CheckListNotDoneNoMore();*/}

  address[] returnValues;
  function _getJobInfo(uint _jobId) external onlyOwner(_jobId) returns (string memory, bool, uint, uint, address[] memory){
      //
      ///
      ////
      //Will have Bug after share permission in later version
      ////
      ///
      //
    (string memory name, bool finish, uint checkListsCount, uint progress) = jobs[_jobId]._getInfo();
    address[] memory sharedOwnersAddress;
    returnValues = sharedOwnersAddress;
    for(uint i = 0; i < jobOwnerCount[_jobId]; i++) {
      returnValues.push(jobToOwner[_jobId][i]);
    }
    return (name, finish, checkListsCount, progress, returnValues);}
      //
      ///
      ////
      //Will have Bug after share permission in later version
      ////
      ///
      //

  function _getCheckListInfo (uint _jobId, uint _checkListId) external view onlyOwner(_jobId) returns (string memory, bool, uint, uint){
    return jobs[_jobId]._getCheckList(_checkListId)._getInfo();}

  function _getTaskInfo (uint _jobId, uint _checkListId, uint _taskId) external view onlyOwner(_jobId) returns (string memory, bool) {
    return jobs[_jobId]._getCheckList(_checkListId)._getTask(_taskId)._getInfo();}

  function _finishJob (uint _jobId) external onlyOwner(_jobId) {
    jobs[_jobId]._finish();}

  function _shareJobOwner (address _newFriend, string memory _newFriendName, uint _jobId) public onlyOwner(_jobId) {
    jobToOwner[_jobId][jobOwnerCount[_jobId]] = _newFriend;
    jobOwnerCount[_jobId]++;
    ownerJobsCount[_newFriend]++;
    for(uint i = 0; i < jobOwnerCount[_jobId]; i++) {
      nicknameList[jobToOwner[_jobId][i]][_newFriend] = _newFriendName;
    }
    emit OwnershipShared();}

  function _getFriendName (address _caller, address _friend) public view returns(string memory) {
    return nicknameList[_caller][_friend];}

  // function _revokeOwner (address _oldFriend, uint _jobId) public trueOwner(_jobId) {
  //   require(_oldFriend != msg.sender, "Better to tell the cops than doing this");
  //   for(uint i = 1; i < jobOwnerCount[_jobId]; i++) {
  //     if(jobToOwner[_jobId][i] == _oldFriend) {
  //       if(i != jobOwnerCount[_jobId]){
  //         for(uint k = i; k < jobOwnerCount[_jobId]-1; k++) {
  //           jobToOwner[_jobId][k] = jobToOwner[_jobId][k+1];
  //         }
  //       } else {
  //         jobToOwner[_jobId][i] = address(0);
  //       }
  //       ownerJobsCount[_oldFriend]--;
  //     }
  //   }}
}