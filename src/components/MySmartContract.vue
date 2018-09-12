<template v-if='web3Setup.length > 0'>
  <div class='hello'>
    <h1>Welcome to Your Vue.js Solidity Smart Contract App</h1>
    <h1>Good to Go!</h1>
    <p>Your Truffle Box is installed and ready.</p>
    <h2>Smart Contract Example</h2>
    <p>
      If your contracts compiled and migrated successfully, below will show
      a stored value of 42 (by default).
    </p>
    <p>
      Try changing the value stored on <strong>line 37</strong> of App.js.
    </p>
    <div>The stored value is: {{ x }}</div>
  </div>
</template>

<script>
import SimpleStorageContract from '../SimpleStorage'

export default {
  name: 'MySmartContract',
  data () {
    return {
      x: undefined
    }
  },
  beforeCreate: function () {
    console.log(this.$store.state.web3)
    SimpleStorageContract.init().then(() => {
      SimpleStorageContract.set(42, this.$store.state.web3.coinbase).then(() => {
        this.getVal()
      })
    })
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  methods: {
    getVal () {
      SimpleStorageContract.get().then(val => {
        this.x = val
      })
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
