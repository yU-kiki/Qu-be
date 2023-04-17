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
    login() {
      // ログイン処理
      this.$router.push({ name: 'MyNFTs', params: { walletAddress: this.walletAddress } });
    },
  },
};
</script>