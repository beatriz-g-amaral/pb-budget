import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/HomeIndex.vue';
import LoginPage from '../pages/Login/LoginIndex.vue';
import FinancesPage from '../pages/Finances/FinancesPage.vue'
import Company from '../pages/Company/CompanyPage.vue'
import CalendarPage from '../pages/Calendar/CalendarPage.vue'

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
      component: FinancesPage,
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage,
    },
  ],
});

export default router;
