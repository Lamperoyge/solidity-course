//specify solidity version
pragma solidity ^0.4.17;

contract Inbox {
    string public message; // defines new variable message type string public accessible

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
