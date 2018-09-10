<template>
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
    <div>The stored value is: {{ web3.balance }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    web3 () {
      return this.$store.state.web3
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
