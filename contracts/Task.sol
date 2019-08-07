pragma solidity ^0.5.8;

contract Task {
  string name;
  bool finish;

  constructor (string memory _name) public {
    name = _name;}

  function _changeName(string calldata _name) external {
    name = _name;}

  function _unfinish() external {
    finish = false;}

  function _finish() external {
    finish = true;}

  function _getInfo() external view returns (string memory, bool) {
    return (name, finish);}
}