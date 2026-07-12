import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/purchasing/orders',
    name: 'purchasing-orders',
    component: () => import('@/pages/purchasing/PurchaseOrderList.vue'),
  },
  {
    path: '/purchasing/suppliers',
    name: 'purchasing-suppliers',
    component: () => import('@/pages/purchasing/SupplierList.vue'),
  },
  {
    path: '/purchasing/goods-receive',
    name: 'purchasing-goods-receive',
    component: () => import('@/pages/purchasing/GoodsReceiveList.vue'),
  },
]

export default routes
