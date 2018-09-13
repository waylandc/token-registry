module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    docker_geth: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*',
      gas: 4600000
    }
  }
}
