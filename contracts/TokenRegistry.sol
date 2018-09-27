pragma solidity ^0.4.24; // solhint-disable-line compiler-fixed, compiler-gt-0_4
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/*
  This contract acts as the Token Registry for the OAX Platform
  DEX operators can retrieve a list of all tradable tokens by calling the
  contract's tokens() method.
  Owners or admins can addToken() or suspendToken()

  TODO - do we charge a fee to register? If yes, store funds in here 
*/

contract TokenRegistry is Ownable {
  address public registryOwner;
  // Dynamically sized array of 'TokenData' structs
  TokenData[] public tokens;
  mapping(string => TokenData) private tokenMap;

  struct TokenData {
    string abbrev; // ticker symbol (not a currency pair, half of a ccy pair)
    string name; // name of token
    string url;  // website
    address tokenOwner;
    bool isSuspended;  // true if token is suspended from trading
    string suspendReason; // explanation of why token has been suspended
    bool isExist; // hack so we can lookup token in map
  }

  event RegisterEvent(address sender, string abbrev);
  event SuspendTokenEvent(address sender, string abbrev, string reason);
  event UnsuspendTokenEvent(address sender, string abbrev, string reason);
  event logEvent(address sender, string _value);

  constructor() public {
    registryOwner = msg.sender;
  }

  // Kill the contract, removing all remnants from EVM
  // and then send all contract funds to 'registryOwner'
  function kill() public onlyOwner {
    selfdestruct(registryOwner);
  }

  /*
     Add a token to our registry. Only contract owner may invoke this
  */
  function registerToken(string _abbrev, string _name, string _url, address _owner) public onlyOwner {
    // require(msg.sender == registryOwner);

    TokenData memory newToken = TokenData({
      abbrev: _abbrev,
      name: _name,
      url: _url,
      isSuspended: false,
      suspendReason: "",
      isExist: true,
      tokenOwner: _owner
    });
    tokens.push(newToken);
    tokenMap[newToken.abbrev] = newToken;

    emit RegisterEvent(msg.sender, _abbrev);
  }

  /*
     Suspend a token from trading. Only registryOwner or tokenOwners 
     may invoke this.
  */
  function suspendToken(string _abbrev, string _reason) public {
    // Requirements:
    // 1. token exists in our registry
    // 2. only contract registryOwner or tokenOwner can suspend
    TokenData storage td = tokenMap[_abbrev];
    require(td.isExist && (msg.sender == registryOwner || msg.sender == td.tokenOwner));

    td.isSuspended = true;
    td.suspendReason = _reason;
    emit SuspendTokenEvent(msg.sender, _abbrev, _reason);
  }

  /*
     Unsuspend a token. Only registryOwner or tokenOwners 
     may invoke this.
  */
  function unsuspendToken(string _abbrev, string _reason) public {
    // Requirements:
    // 1. token exists in our registry
    // 2. only contract registryOwner or tokenOwner can suspend
    TokenData storage td = tokenMap[_abbrev];
    require(td.isExist && td.isSuspended && (msg.sender == registryOwner || msg.sender == td.tokenOwner));

    td.isSuspended = false;
    emit UnsuspendTokenEvent(msg.sender, _abbrev, _reason);
  }

  function getToken(string _abbrev) public view returns (string, string, string, bool, string, bool) {
    TokenData memory t = tokenMap[_abbrev];
    return (t.abbrev, t.name, t.url, t.isSuspended, t.suspendReason, t.isExist);
  }

  function tokenExists(string _abbrev) public view returns (bool) {
    TokenData memory td = tokenMap[_abbrev];
    return td.isExist;
  }

}
