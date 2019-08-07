const CheckList = artifacts.require("../contracts/CheckList.sol");
// const Task = artifacts.require("../contracts/Task.sol");

contract("CheckList", accounts => {
    var checkListInstance;
    it("initiate the checklist properly", async () => {
        checkListInstance = await CheckList.deployed({from : accounts[0]});        
        // await checkListInstance._createCheckList("CheckList 1");
        // await checkListInstance._createCheckList("CheckList 2");
    
        let checkList0 = await checkListInstance.checkLists(0);

        // console.log(await checkListInstance.checkLists(0))
        console.log("adfasf: " + checkList0[0])
        assert.equal(checkList0[0],"CheckList 1", "Wrong name");
        // assert.true(checkList0[1], "Should not be finished yet");
        // assert.equal(checkList0[3], 0, "This task should be emptied");
        // assert.equal(checkList0[4], 0, "Should have no finished task");

        // let checkList1 = await checkListInstance.checkLists(1);
        // assert.equal(checkList1.[0],"CheckList 2", "Wrong name");
        // assert.true(checkList1.[1], "Should not be finished yet");
        // assert.equal(checkList1.[3], 0, "This task should be emptied");
        // assert.equal(checkList1.[4], 0, "Should have no finished task");
    });
});
