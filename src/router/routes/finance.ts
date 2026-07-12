import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/finance/journals',
    name: 'finance-journals',
    component: () => import('@/pages/finance/JournalList.vue'),
  },
  {
    path: '/finance/accounts',
    name: 'finance-accounts',
    component: () => import('@/pages/finance/AccountList.vue'),
  },
  {
    path: '/finance/reports',
    name: 'finance-reports',
    component: () => import('@/pages/finance/FinanceReports.vue'),
  },
]

export default routes
