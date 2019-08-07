pragma solidity ^0.5.8;
import "./Task.sol";

contract CheckList {

  string name;
  bool finish;
  event NewTask();
  event CheckListDone();

  Task[] tasks;
  uint tasksCount;

  constructor(string memory _name) public {
    name = _name;
    finish = false;}

  function _changeName(string calldata _name) external {
    name = _name;}

  function _finish() external {
    for(uint i = 0; i < tasksCount; i++) tasks[i]._finish();
    finish = true;
    emit CheckListDone();}

  function _unfinish() external {
    finish = false;}

  function _getInfo() public view returns (string memory, bool, uint, uint) {
    uint progress = _countFinishedTask();
    return (name, finish, tasksCount, progress);}

  function _addTask(string calldata _name) external {
    tasks.push(new Task(_name));
    tasksCount++;
    if(finish)finish = false;
      emit NewTask();}

  function _deleteTask(uint _taskId) external {
    for (uint i = _taskId; i < tasksCount-1; i++) {
      tasks[i] = tasks[i+1];
    }
    tasksCount--;}

  function _getTask (uint _taskId) public view returns (Task){
    require(_taskId < tasksCount, "Task must exists");
    return tasks[_taskId];}

  function _countFinishedTask() public view returns (uint){
    uint result;
    for(uint i = 0; i < tasks.length; i++){
      (,bool finished) = tasks[i]._getInfo();
        if(finished == true) result++;
    }
    return result;}
}