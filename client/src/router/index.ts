import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'reset-password',
          name: 'resetPassword',
          component: () => import('../views/auth/ResetPasswordView.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/RootLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/home/HomeView.vue')
        }
      ]
    }
  ]
});

export default router;
