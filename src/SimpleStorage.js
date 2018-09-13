import contract from 'truffle-contract'
import SimpleStorage from '../build/contracts/SimpleStorage.json'

const SimpleStorageContract = {
  contract: null,
  instance: null,

  init: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.contract = contract(SimpleStorage)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  set: function (x, acct) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.instance.set(x, { from: acct }).then(tx => {
        resolve(tx)
        console.log(tx)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    }).catch(err => console.log(err))
  },

  get: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.instance.get().then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

export default SimpleStorageContract
