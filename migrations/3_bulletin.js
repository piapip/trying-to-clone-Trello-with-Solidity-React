var Task = artifacts.require("../contracts/Task.sol");
var CheckList = artifacts.require("../contracts/CheckList.sol");
var Job = artifacts.require("../contracts/Job.sol");
var Bulletin = artifacts.require("../contracts/Bulletin.sol");

module.exports = async(deployer) => {
    await deployer.deploy(Bulletin);
    await deployer.deploy(Job, Bulletin.address);
    await deployer.deploy(CheckList, Bulletin.address);
    deployer.deploy(Task, Bulletin.address);
};
