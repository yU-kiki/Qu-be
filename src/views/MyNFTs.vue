<template>
  <div>
    <p>Your wallet address: {{ walletAddress }}</p>
    <div v-for="tokenId in result" :key="tokenId">
      {{ tokenId }}
    </div>
    <iframe
      src="https://ipfs.thirdwebcdn.com/ipfs/QmbAgC8YwY36n8H2kuvSWsRisxDZ15QZw3xGZyk9aDvcv7/erc721.html?contract=0x0CffFe714736D0b2E5Beb5cF16E589E4eCBF4b98&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%7D"
      width="600px"
      height="600px"
      style="max-width: 100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>

export default {
  name: "MyNFTs",
  props: {
    walletAddress: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.$store.dispatch("nft/getMetadata", this.walletAddress);
  },
};
</script>

<style>
</style>
