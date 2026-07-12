import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/sales/orders',
    name: 'sales-orders',
    component: () => import('@/pages/sales/OrderList.vue'),
  },
  {
    path: '/sales/invoices',
    name: 'sales-invoices',
    component: () => import('@/pages/sales/InvoiceList.vue'),
  },
  {
    path: '/sales/quotations',
    name: 'sales-quotations',
    component: () => import('@/pages/sales/QuotationList.vue'),
  },
]

export default routes
