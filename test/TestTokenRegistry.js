const TokenRegistry = artifacts.require('./TokenRegistry.sol')

contract('TokenRegistry', accounts => {
  const firstAcct = accounts[0];
  const secondAcct = accounts[1];

  it('...set owner during creation', async () => {
    const registry = await TokenRegistry.new({from: firstAcct});
    assert.equal(await registry.registryOwner(), firstAcct);
  })

  it('...should register WAYC coin', async () => {
    const registry = await TokenRegistry.new({from: firstAcct});
    await registry.registerToken('WAYC', 'our test token', 'http://localhost', secondAcct, {from: firstAcct});
    let tokenFound = await registry.tokenExists("WAYC");

    assert.equal(tokenFound, true, 'WAYC was not registered');
  })

  it('...should suspend WAYC token', async () => {
    const registry = await TokenRegistry.new();
    await registry.registerToken('WAYC', 'our test token', 'http://localhost', secondAcct, {from: firstAcct});
    await registry.suspendToken('WAYC', 'test token suspension');
    var [abbr, name, url, isSusp, reason, isExist]  = await registry.getToken("WAYC");
    assert.equal(isSusp, true, "Coin should be suspended");
  })

  it('...should unsuspend WAYC token', async () => {
    const registry = await TokenRegistry.new();
    await registry.registerToken('WAYC', 'our test token', 'http://localhost', secondAcct, {from: firstAcct});
    await registry.suspendToken('WAYC', 'test token suspension');
    await registry.unsuspendToken('WAYC', 'unsuspend test token');
    var [abbr, name, url, isSusp, reason, isExist]  = await registry.getToken("WAYC");
    assert.equal(isSusp, false, "Coin shouldn't be suspended");
  })
})


