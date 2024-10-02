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
          component: () =>
            import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'reset-password',
          name: 'resetPassword',
          component: () =>
            import('../views/auth/ResetPasswordView.vue')
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
        },
        {
          path: '/items',
          name: 'items',
          component: () => import('../views/items/ItemsView.vue')
        },
        {
          path: '/blog',
          name: 'blog',
          component: () => import('../views/blog/BlogView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/about/AboutView.vue')
        },
        {
          path: '/services',
          name: 'services',
          component: () =>
            import('../views/services/ServicesView.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../views/contact/ContactView.vue')
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('../layouts/DashboardLayout.vue'),
          children: [
            {
              path: '',
              name: 'Dashboard-Home',
              component: () =>
                import('../views/dashboard/DashboardView.vue')
            },
            {
              path: 'users',
              name: 'Users',
              component: () =>
                import('../views/dashboard/AllUser.vue')
            },
            {
              path: 'items',
              name: 'Items',
              component: () =>
                import('../views/dashboard/AllItems.vue')
            },
            {
              path: 'my-items',
              name: 'My-Items',
              component: () =>
                import('../views/dashboard/MyItems.vue')
            },
            {
              path: 'create-item',
              name: 'Create-Item',
              component: () =>
                import('../views/dashboard/CreateItem.vue')
            },
            {
              path: 'categories',
              name: 'Categories',
              component: () =>
                import('../views/dashboard/CategoriesView.vue')
            },
            {
              path: 'income',
              name: 'Income',
              component: () =>
                import('../views/dashboard/IncomeView.vue')
            },
            {
              path: 'winning-bids',
              name: 'Winning-Bids',
              component: () =>
                import('../views/dashboard/WinningBids.vue')
            },
            {
              path: 'favorites',
              name: 'Favorites',
              component: () =>
                import('../views/dashboard/MyFavorites.vue')
            },
            {
              path: 'profile',
              name: 'Profile',
              component: () =>
                import('../views/dashboard/PersonalProfile.vue')
            }
          ]
        }
      ]
    }
  ]
});

export default router;
