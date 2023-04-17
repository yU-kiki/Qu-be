import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import MyNFTs from './views/MyNFTs.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyHome',
      component: Home,
    },
    {
      path: '/my-nfts/:walletAddress',
      name: 'MyNFTs',
      component: MyNFTs,
      props: true,
    },
  ],
});

export default router;