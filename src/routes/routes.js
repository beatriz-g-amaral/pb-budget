import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/HomeIndex.vue';
import LoginPage from '../pages/Login/LoginIndex.vue';
import FinancesTable from '../pages/Finances/Table/FinancesTable.vue'

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
      component: FinancesTable,
    },
  ],
});

export default router;
