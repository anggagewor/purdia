import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/ChatPage.vue'),
  },
]

export default routes
