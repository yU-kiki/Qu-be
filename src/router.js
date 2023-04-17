import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import MyNFTs from './views/MyNFTs.vue';
import MyEdit from './views/Edit.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyHome',
      component: Home,
    },
    {
      path: '/my-nfts',
      name: 'MyNFTs',
      component: MyNFTs,
    },
    {
      path: '/edit',
      name: 'MyEdit',
      component: MyEdit,
    },
  ],
});

export default router;