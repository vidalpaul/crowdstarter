pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) voters;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
   
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });
        
        // a worse way of doing it: Request(description, value, recipient, false);
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint idx) public {
        Request storage request = requests[idx];
        
        require(approvers[msg.sender]);
        require(!request.voters[msg.sender]);
        request.approvalCount++;
        request.voters[msg.sender] = true;
    }
    
    function finalizeRequest(uint idx) public restricted {
        Request storage request = requests[idx];
        
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}