import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { collection, doc, setDoc } from 'firebase/firestore';
import db from '@/firebase.js';

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
    
    const nftArray = nfts.map((nft) => {
      return {
        name: nft.metadata.name,
        url: nft.metadata.image,
      };
    });

    try {
      const nftDocRef = doc(collection(db, walletAddress), 'nfts');
      await setDoc(nftDocRef, { nftArray });
      console.log('NFTs added successfully');
    } catch (error) {
      console.error('Error adding NFTs: ', error);
    }
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