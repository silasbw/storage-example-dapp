pragma solidity ^0.4.21;

contract Storage {
  address owner;
  uint data;

  function Storage() public {
    owner = msg.sender;
  }

  function set(uint value) public {
    if (msg.sender != owner) return;
    data = value;
  }

  function get() public constant returns (uint) {
    return data;
  }
}
