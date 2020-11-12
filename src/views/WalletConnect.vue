<template lang="pug">
  .content.wallet-connect
    h1 {{ $web3 ? 'Connect wallet' : 'Upload wallet' }}
    button(v-if="$web3" @click="walletConnect") Connect
</template>

<script>
export default {
  name: 'WalletConnect',
  methods: {
    walletConnect() {
      this.$web3.currentProvider.enable();
    },
  },
};
</script>

<style lang="stylus">
.wallet-connect
  width 100%
  h1
    text-align center
</style>
