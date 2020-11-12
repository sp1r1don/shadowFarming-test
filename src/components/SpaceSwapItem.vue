<template lang="pug">
  .space-swap-item
    .space-swap-item__icon
      img(src="@/assets/images/item-1.svg")
    .space-swap-item__param
      span APY:
      span {{ apy.toFixed(2) }}%
    .space-swap-item__param
      span Your balance:
      span {{ this.$BN(userBalance).div(this.$BN(10).pow(18)) }} LP
    .space-swap-item__param
      span Total locked
      span {{ totalLockedValue.toFixed(2) }} LP
</template>

<script>
export default {
  name: 'SpaceSwapItem',
  props: {
    item: {
      type: Object,
      default() {
        return {
          name: 'name',
          APY: 'APY',
        };
      },
    },
  },
  data() {
    return {
      poolPriceInETH: 0,
      userBalance: 0,
      lPTotalSupply: 0,
    };
  },
  computed: {
    totalLockedValue() {
      return this.$BN(this.item.totalLpSupply).div(this.$BN(10).pow(18));
    },
    poolLockedPrice() {
      return this.$BN(this.item.totalLpSupply)
        .div(this.lPTotalSupply)
        .times(this.poolPriceInETH);
    },
    apy() {
      return this.$BN(this.item.tokensPerYear)
        .times(this.item.weight)
        .times(this.item.milkPriceInETH)
        .times(100)
        .div(this.poolLockedPrice)
        .div(this.item.totalWeight);
    },
  },
  created() {
    this.init();
    this.$root.$on('update', this.init);
  },
  beforeDestroy() {
    this.$root.$off('update', this.init);
  },
  methods: {
    async init() {
      await this.getTotalSupply();
      await this.getPoolPriceInETH();
      await this.getUserBalance();
    },
    async getTotalSupply() {
      this.lPTotalSupply = await this.$uniswap.getTotalSupply(this.item.address);
    },
    async getPoolPriceInETH() {
      const reserves = await this.$uniswap.getReserves(this.item.address);
      this.poolPriceInETH = this.$BN(reserves.reserve0).times(2).div(this.$BN(10).pow(18));
    },
    async getUserBalance() {
      const account = await this.$web3.eth.getAccounts();
      this.userBalance = await this.$uniswap.getBalanceOf(account[0], this.item.address);
    },
  },
};
</script>

<style lang="stylus">
.space-swap-item
  width 20rem
  border 1px solid black
  padding 2rem
  border-radius 1rem
  &__icon
    width 100%
    img
      width 100%
  &__name
    text-transform uppercase
    text-align center
  &__param
    display flex
    justify-content space-between
    margin-bottom .6rem
</style>
