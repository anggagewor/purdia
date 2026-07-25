import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('@/pages/PricingPage.vue'),
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('@/pages/LandingPage.vue'),
    meta: { guest: true, public: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/ProfilePage.vue'),
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/pages/CalendarPage.vue'),
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('@/pages/TimelinePage.vue'),
  },
]

export default routes
