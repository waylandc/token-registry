<template v-if='web3Setup.length > 0'>
  <div class='mywallet'>
    <p>Metamask: {{ web3.isInjected }}</p>
    <p>Network: {{ web3.networkId }}</p>
    <p>Network Name: {{ networkName[web3.networkId] }}</p>
    <p>Account: {{ web3.coinbase }}</p>
    <p>Balance: {{ web3.balance }}</p>
  </div>
</template>

<script>
import { NETWORKS } from '../util/constants/networks'

export default {
  name: 'MyWallet',
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  methods: {
    networkName (id) {
      return NETWORKS[id]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
