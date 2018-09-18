// this file isn't needed. it's here b/c windows systems conflict the truffle command
// with the truffle.js file in this directory
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    docker_geth: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 4600000
    }
  }
}
