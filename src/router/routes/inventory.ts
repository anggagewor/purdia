import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // Dashboard
  {
    path: '/inventory',
    name: 'inventory-dashboard',
    component: () => import('@/pages/inventory/InventoryDashboard.vue'),
  },
  // Products
  {
    path: '/inventory/products',
    name: 'inventory-products',
    component: () => import('@/pages/inventory/products/ProductList.vue'),
  },
  {
    path: '/inventory/products/create',
    name: 'inventory-product-create',
    component: () => import('@/pages/inventory/products/ProductCreate.vue'),
  },
  {
    path: '/inventory/products/:id',
    name: 'inventory-product-detail',
    component: () => import('@/pages/inventory/products/ProductDetail.vue'),
  },
  {
    path: '/inventory/products/:id/edit',
    name: 'inventory-product-edit',
    component: () => import('@/pages/inventory/products/ProductEdit.vue'),
  },
  // Stock
  {
    path: '/inventory/stock',
    name: 'inventory-stock',
    component: () => import('@/pages/inventory/StockList.vue'),
  },
  // Stock Movement
  {
    path: '/inventory/movement',
    name: 'inventory-movement',
    component: () => import('@/pages/inventory/MovementList.vue'),
  },
  // Categories
  {
    path: '/inventory/categories',
    name: 'inventory-categories',
    component: () => import('@/pages/inventory/CategoryList.vue'),
  },
  // Brands
  {
    path: '/inventory/brands',
    name: 'inventory-brands',
    component: () => import('@/pages/inventory/BrandList.vue'),
  },
  // Warehouses
  {
    path: '/inventory/warehouses',
    name: 'inventory-warehouses',
    component: () => import('@/pages/inventory/warehouses/WarehouseList.vue'),
  },
  {
    path: '/inventory/warehouses/create',
    name: 'inventory-warehouse-create',
    component: () => import('@/pages/inventory/warehouses/WarehouseCreate.vue'),
  },
  {
    path: '/inventory/warehouses/:id/edit',
    name: 'inventory-warehouse-edit',
    component: () => import('@/pages/inventory/warehouses/WarehouseEdit.vue'),
  },
  // Stock Movements (legacy)
  {
    path: '/inventory/movements',
    name: 'inventory-movements',
    component: () => import('@/pages/inventory/movements/MovementList.vue'),
  },
  {
    path: '/inventory/movements/create',
    name: 'inventory-movement-create',
    component: () => import('@/pages/inventory/movements/MovementCreate.vue'),
  },
  // Purchase
  {
    path: '/inventory/purchases',
    name: 'inventory-purchases',
    component: () => import('@/pages/inventory/purchases/PurchaseList.vue'),
  },
  {
    path: '/inventory/purchases/create',
    name: 'inventory-purchase-create',
    component: () => import('@/pages/inventory/purchases/PurchaseCreate.vue'),
  },
  {
    path: '/inventory/purchases/:id',
    name: 'inventory-purchase-detail',
    component: () => import('@/pages/inventory/purchases/PurchaseDetail.vue'),
  },
  {
    path: '/inventory/purchases/:id/edit',
    name: 'inventory-purchase-edit',
    component: () => import('@/pages/inventory/purchases/PurchaseEdit.vue'),
  },
  // Barcode
  {
    path: '/inventory/barcodes',
    name: 'inventory-barcodes',
    component: () => import('@/pages/inventory/barcodes/BarcodeList.vue'),
  },
  {
    path: '/inventory/barcodes/generate',
    name: 'inventory-barcode-generate',
    component: () => import('@/pages/inventory/barcodes/BarcodeGenerate.vue'),
  },
  {
    path: '/inventory/barcodes/scan',
    name: 'inventory-barcode-scan',
    component: () => import('@/pages/inventory/barcodes/BarcodeScan.vue'),
  },
  // Maintenance
  {
    path: '/inventory/maintenance',
    name: 'inventory-maintenance',
    component: () => import('@/pages/inventory/maintenance/MaintenanceList.vue'),
  },
  {
    path: '/inventory/maintenance/create',
    name: 'inventory-maintenance-create',
    component: () => import('@/pages/inventory/maintenance/MaintenanceCreate.vue'),
  },
  {
    path: '/inventory/maintenance/:id',
    name: 'inventory-maintenance-detail',
    component: () => import('@/pages/inventory/maintenance/MaintenanceDetail.vue'),
  },
  {
    path: '/inventory/maintenance/:id/edit',
    name: 'inventory-maintenance-edit',
    component: () => import('@/pages/inventory/maintenance/MaintenanceEdit.vue'),
  },
  // Quality
  {
    path: '/inventory/quality',
    name: 'inventory-quality',
    component: () => import('@/pages/inventory/quality/QualityList.vue'),
  },
  {
    path: '/inventory/quality/create',
    name: 'inventory-quality-create',
    component: () => import('@/pages/inventory/quality/QualityCreate.vue'),
  },
  {
    path: '/inventory/quality/:id',
    name: 'inventory-quality-detail',
    component: () => import('@/pages/inventory/quality/QualityDetail.vue'),
  },
  {
    path: '/inventory/quality/:id/edit',
    name: 'inventory-quality-edit',
    component: () => import('@/pages/inventory/quality/QualityEdit.vue'),
  },
]

export default routes
