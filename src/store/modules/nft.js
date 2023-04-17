import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("mumbai");
// コントラクトアドレス
const contractAddress = "0x0CffFe714736D0b2E5Beb5cF16E589E4eCBF4b98";


const state = {
  walletAddress: '',
}

const getters = {
  walletAddress: (state) => state.walletAddress,
}

const mutations = {
  setWalletAddress(state, walletAddress) {
    state.walletAddress = walletAddress;
  },
}

const actions = {
  async setWalletAddressAction({ commit }, walletAddress) {
    commit('setWalletAddress', walletAddress);
  },
  async getMetadata(_, walletAddress) {
    const contract = await sdk.getContract(contractAddress);
    const nfts = await contract.erc721.getOwned(walletAddress);
    console.log(nfts);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}