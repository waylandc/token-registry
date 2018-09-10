<template>
  <div class='home'>
    <HelloWorld/>
  </div>
</template>

<script>
// import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
// import truffleContract from 'truffle-contract'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from Home.vue')
    this.$store.dispatch('registerWeb3')
    // const web3 = this.$store.state.web3
    // console.log(web3)

    // const accounts = web3.personal.accounts()

    // // Get the contract instance.
    // const contract = truffleContract(SimpleStorageContract)
    // contract.setProvider(web3.currentProvider)
    // // const instance = contract.deployed()

    // // Stores a given value, 5 by default.
    // contract.set(42, { from: accounts[0] })

    // // Get the value from the contract to prove it worked.
    // const response = contract.get()
    // this.storageValue = response
  },
  // data: function () {
  //   return {
  //     result: ''
  //   }
  // },
  components: {
    HelloWorld
  }
  // computed: {
  //   web3 () {
  //     return this.$store.state.web3
  //   }
  // },
  // created () {
  // }
}
</script>
