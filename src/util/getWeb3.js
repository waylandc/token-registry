
import Web3 from 'web3'

/*
* NOTE - THIS DOES NOT WORK WITH THE 1.0.0BETA web3
*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: web3.isConnected(),
      web3 () {
        return web3
      }
    })
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve network ID
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          reject(new Error('Unable to retrieve network ID'))
        } else {
          // Assign the networkId property to our result and resolve promise
          result = Object.assign({}, result, { networkId })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })

export default getWeb3

// import Web3 from 'web3'

// const getWeb3 = () =>
//   new Promise((resolve, reject) => {
//     // Wait for loading completion to avoid race conditions with web3 injection timing.
//     window.addEventListener('load', () => {
//       let web3 = window.web3

//       // Checking if Web3 has been injected by the browser (Mist/MetaMask).
//       const alreadyInjected = typeof web3 !== 'undefined'

//       if (alreadyInjected) {
//         // Use Mist/MetaMask's provider.
//         web3 = new Web3(web3.currentProvider)
//         console.log('Injected web3 detected.')
//         resolve(web3)
//       } else {
//         // Fallback to localhost if no web3 injection. We've configured this to
//         // use the development console's port by default.
//         const provider = new Web3.providers.HttpProvider(
//           'http://127.0.0.1:8545'
//         )
//         web3 = new Web3(provider)
//         console.log('No web3 instance injected, using Local web3.')
//         resolve(web3)
//       }
//     })
//   })

// export default getWeb3
