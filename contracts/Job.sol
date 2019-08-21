pragma solidity ^0.5.8;
import "./CheckList.sol";
import "./Task.sol";

contract Job {

  string name;
  bool finish;
  bool close;
  CheckList[] checkLists;
  uint checkListsCount;

  event NewCheckList();
  event JobDone();
  event JobClose();
  event JobOpen();

  constructor(string memory _name) public {
    name = _name;
    finish = false;}

  function _changeName(string calldata _name) external {
    name = _name;}

  function _finish() external {
    for(uint i = 0; i < checkListsCount; i++) checkLists[i]._finish();
    finish = true;
    emit JobDone();}

  function _close() external {
    for(uint i = 0; i < checkListsCount; i++) checkLists[i]._close();
    close = true;
    emit JobClose();}

  function _open() external {
    for(uint i = 0; i < checkListsCount; i++) checkLists[i]._open();
    close = false;
    emit JobOpen();}

  function _countFinishedCheckList() internal view returns (uint) {
    uint result;
    for(uint i = 0; i < checkLists.length;i++) {
      (,bool finished,,,) = checkLists[i]._getInfo();
        if(finished == true) result++;
    }
    return result;}

  function _getInfo() public view returns (string memory, bool, uint, uint, bool) {
    uint progress = _countFinishedCheckList();
    return (name, finish, checkListsCount, progress, close);}

  function _addCheckList(string calldata _name) external {
    CheckList sample = new CheckList(_name);
        checkLists.push(sample);
        checkListsCount++;
        emit NewCheckList();}

  function _deleteCheckList(uint _checkListId) external {
    for (uint i = _checkListId; i < checkListsCount-1; i++) {
      checkLists[i] = checkLists[i+1];
    }
    checkListsCount--;}

  function _getCheckList(uint _checkListId) public view returns (CheckList) {
    require(_checkListId < checkListsCount, "Checklist must exists");
    return checkLists[_checkListId];}
}