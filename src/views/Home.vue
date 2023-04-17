<template>
  <div>
    <form @submit.prevent="login">
      <label>
        Enter your wallet address:
        <input type="text" v-model="walletAddress" />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  data() {
    return {
      walletAddress: '',
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch('nft/setWalletAddressAction', this.walletAddress);
      this.$router.push({ name: 'MyNFTs' });
    },
  },
};
</script>