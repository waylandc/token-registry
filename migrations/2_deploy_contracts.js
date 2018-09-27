var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TokenRegistry = artifacts.require("./TokenRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TokenRegistry);
};
