pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;
    
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
    
    function createRequest() restricted {}
    
    function approveRequest() {}
    
    function finalizeRequest() restricted {}
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

}