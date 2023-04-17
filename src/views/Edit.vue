<template>
  <div>
    <p>Editing NFT for wallet address: {{ walletAddress }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyEdit',
  computed: {
    ...mapGetters('nft', ['walletAddress']),
  },
};
</script>