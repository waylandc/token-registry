<template v-if='web3Setup.length > 0'>
  <div class='hello'>
    <h1>Welcome to Your Vue.js Solidity Smart Contract App</h1>
    <h1>Good to Go!</h1>
    <p>Your Truffle Box is installed and ready.</p>
    <h2>Smart Contract Example</h2>
    <div>The stored value is: {{ x }} </div>
    <form @submit.prevent="changeValue">
      <label>New Value</label>
      <input
        name="newValue"
        label="Set Value"
        type="text"
        v-model="x"
      />
      <button type="submit">Change Value of Contract</button>
    </form>
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
  created: function () {
    this.getVal()
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  methods: {
    changeValue () {
      this.$store.dispatch('changeValue',
        { newValue: this.x })
    },
    getVal () {
      SimpleStorageContract.init().then(() => {
        SimpleStorageContract.get().then(val => {
          this.x = val
        }).then(val => {
          console.log('finished simpleStorage.get, ' + val)
        })
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
