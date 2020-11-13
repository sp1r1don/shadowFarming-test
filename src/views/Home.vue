<template lang="pug">
  div
    template(v-if="pools")
      space-swap-item(
        v-for="pool in pools"
        :key="pool.poolAddress"
        :item="pool"
      )
      button(
        v-if="!userRegistered"
        @click="registerUser"
      ) Start farming
      template(v-else)
        p Your rewards: {{ this.addressInfo.totalPendingRewards }}
        button(
          @click="withdraw"
        ) Withdraw
    p(v-else) Loading...
</template>

<script>
import SpaceSwapItem from '@/components/SpaceSwapItem.vue';

export default {
  name: 'Home',
  components: { SpaceSwapItem },
  data() {
    return {
      pools: null,
      currentBlockNumber: 0,
      tokensPerYear: 0,
      uniMilkPool: '0x6e0f9F805C98De9F74753D8173629d64A6928896',
      milkPriceInETH: 0,
      userRegistered: false,
      userAddress: null,
      withdrawOptions: null,
      addressInfo: null,
      currentEventBlock: null,
      subscription: null,
    };
  },
  async created() {
    await this.init();
    this.subscription = this.$web3.eth
      .subscribe('newBlockHeaders')
      .on('data', this.newBlockHandler);
  },
  beforeDestroy() {
    this.subscription.unsubscribe();
  },
  methods: {
    newBlockHandler(event, error) {
      if (!error) {
        if (!this.currentEventBlock) {
          this.currentEventBlock = event.number;
        }
        if (this.$BN(event.number).minus(this.currentEventBlock).gt(2)) {
          this.currentEventBlock = event.number;
          this.$root.$emit('update');
          this.init();
        }
      } else {
        console.error(error);
      }
    },
    async init() {
      // get MILK Price
      await this.getMilkPriceInETH();
      // get user address
      [this.userAddress] = await this.$web3.eth.getAccounts();
      // get main params
      const addressInfoResp = await this.$api.application.getAddressInfo(this.userAddress);
      this.addressInfo = addressInfoResp.data;
      // get tokens per year amount
      this.tokensPerYear = await this.$shadowStaking
        .getYearTokensAmount(this.addressInfo.currentBlockNumber);
      // get pools history
      const poolsHistoryResp = await this.$api.application.getPoolsHistory();
      // convert to "map", where key = pool address
      const poolsHistoryMap = {};
      poolsHistoryResp.data.forEach((pool) => {
        poolsHistoryMap[pool.poolAddress] = pool;
      });
      // get pools
      const pools = await this.$api.application.getPools();
      // prepare pools
      this.pools = pools.data.pools.map((pool) => {
        const { totalWeight } = pools.data;
        const { totalLpSupply } = poolsHistoryMap[pool.address];
        const { tokensPerYear, milkPriceInETH } = this;
        return {
          ...pool,
          totalLpSupply,
          tokensPerYear,
          milkPriceInETH,
          totalWeight,
        };
      });
      const resp = await this.$shadowStaking.getLastBlock(this.userAddress);
      if (resp > 0) this.userRegistered = true;
    },
    async getMilkPriceInETH() {
      const reserves = await this.$uniswap.getReserves(this.uniMilkPool);
      this.milkPriceInETH = this.$BN(reserves.reserve0).div(reserves.reserve1);
    },
    async registerUser() {
      await this.$shadowStaking.registerUser(this.userAddress);
      await this.$api.application.insertAddress(this.userAddress);
    },
    async withdraw() {
      const insertAddress = await this.$api.application.insertAddress(this.userAddress);
      this.withdrawOptions = insertAddress.data;
      await this.$shadowStaking.withdraw(this.userAddress, this.withdrawOptions);
    },
  },
};
</script>
