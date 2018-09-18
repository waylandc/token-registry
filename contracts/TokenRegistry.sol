pragma solidity ^0.4.24; // solhint-disable-line compiler-fixed, compiler-gt-0_4

/*
  This contract acts as the Token Registry for the OAX Platform
  DEX operators can retrieve a list of all tradable tokens by calling the
  contract's tokens() method.
  Owners or admins can addToken() or suspendToken()

  TODO - do we charge a fee to register? If yes, store funds in here 
*/

contract TokenRegistry {
  address private registryOwner;
  // Dynamically sized array of 'TokenData' structs
  TokenData[] public tokens;
  mapping(bytes => TokenData) private tokenMap;

  struct TokenData {
    bytes abbrev; // ticker symbol (not a currency pair, half of a ccy pair)
    bytes name; // name of token
    bytes url;  // website
    address tokenOwner;
    bool isSuspended;  // true if token is suspended from trading
    bytes suspendReason; // explanation of why token has been suspended
    bool isExist; // hack so we can lookup token in map
  }

  constructor() public {
    registryOwner = msg.sender;
  }

  // Kill will kill the contract, removing all remnants from EVM
  // and then send all contract funds to 'registryOwner'
  function kill() public {
    selfdestruct(registryOwner);
  }

  /*
     Add a token to our registry. Only contract owner may invoke this
  */
  function registerToken(bytes _abbrev, bytes _name, bytes _url, address _owner) public {
    require(msg.sender == registryOwner);
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
  }

  /*
     Suspend a token from trading. Only registryOwner or tokenOwners 
     may invoke this.
  */
  function suspendToken(bytes _abbrev, bytes _reason) public {
    // Requirements:
    // 1. token exists in our registry
    // 2. only contract registryOwner or tokenOwner can suspend
    TokenData storage td = tokenMap[_abbrev];
    require(td.isExist && (msg.sender == registryOwner || msg.sender == td.tokenOwner));

    tokenMap[_abbrev].isSuspended = true;
    //TODO - do we want to limit length of this to conserve gas?
    tokenMap[_abbrev].suspendReason = _reason;
  }

}
