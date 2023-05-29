import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/HomeIndex.vue';
import LoginPage from '../pages/Login/LoginIndex.vue';
import FinancesPage from '../pages/Finances/FinancesPage.vue'
import Company from '../pages/Company/CompanyPage.vue'
import CalendarPage from '../pages/Calendar/CalendarPage.vue'
import RegisterPage from '../pages/register/RegisterPage'
import auth from './Auth';

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
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/finances',
      name: 'finances',
      component: FinancesPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
