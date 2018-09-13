<template>
  <div>
    <MySmartContract/>
  </div>
</template>
<script>
// @ is an alias to /src
import MySmartContract from '@/components/MySmartContract.vue'

export default {
  name: 'home',
  beforeCreate () {
    // console.log('registerWeb3 Action dispatched from SmartContract.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    MySmartContract
  }
}
</script>
