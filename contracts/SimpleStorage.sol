pragma solidity ^0.4.24; // solhint-disable-line compiler-fixed, compiler-gt-0_4


contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
