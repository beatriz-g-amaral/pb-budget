import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/HomeIndex.vue';
import LoginPage from '../pages/Login/LoginIndex.vue';
import FinancesList from '../pages/Finances/List/FinancesList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/finances',
      name: 'finances',
      component: FinancesList,
    },
  ],
});

export default router;
