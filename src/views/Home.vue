<template>
  <div>
    <MyWallet/>
  </div>
</template>

<script>
// @ is an alias to /src
import MyWallet from '@/components/MyWallet.vue'

export default {
  name: 'home',
  beforeCreate () {
    // console.log('registerWeb3 Action dispatched from Home.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    MyWallet
  }
}
</script>
