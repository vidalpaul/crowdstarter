pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    // modifier contributor() {
    //     require(msg.sender in approvers);
    //     _;
    // }
    
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false
        });
        
        // a worse way of doing it: Request(description, value, recipient, false);
        
        requests.push(newRequest);
    }
    
    // function approveRequest() contributor {}
    
    function finalizeRequest() public restricted {
        
    }
}