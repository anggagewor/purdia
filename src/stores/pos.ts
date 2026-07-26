import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductVariantOption {
  label: string
  value: string
  extraPrice: number
}

export interface ProductVariant {
  name: string
  required: boolean
  options: ProductVariantOption[]
}

export interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  variants?: ProductVariant[]
}

export interface SelectedVariant {
  name: string
  option: ProductVariantOption
}

export interface OrderItem {
  product: Product
  qty: number
  selectedVariants: SelectedVariant[]
  notes?: string
}

export interface QrOrder {
  id: string
  tableId: string
  items: OrderItem[]
  customerName: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: number
  subtotal: number
}

// ---------------------------------------------------------------------------
// Shared product catalog (used by both public menu and POS terminal)
// ---------------------------------------------------------------------------

export const productCatalog: Product[] = [
  {
    id: 1,
    name: 'Kopi Susu Gula Aren',
    price: 25000,
    category: 'Beverages',
    stock: 50,
    variants: [
      {
        name: 'Size',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Large', value: 'large', extraPrice: 5000 },
          { label: 'Extra Large', value: 'xl', extraPrice: 10000 },
        ],
      },
      {
        name: 'Sugar Level',
        required: true,
        options: [
          { label: 'Normal', value: 'normal', extraPrice: 0 },
          { label: 'Less Sugar', value: 'less', extraPrice: 0 },
          { label: 'No Sugar', value: 'none', extraPrice: 0 },
          { label: 'Extra Sugar', value: 'extra', extraPrice: 0 },
        ],
      },
      {
        name: 'Ice Level',
        required: false,
        options: [
          { label: 'Normal Ice', value: 'normal', extraPrice: 0 },
          { label: 'Less Ice', value: 'less', extraPrice: 0 },
          { label: 'No Ice', value: 'none', extraPrice: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Americano',
    price: 22000,
    category: 'Beverages',
    stock: 40,
    variants: [
      {
        name: 'Size',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Large', value: 'large', extraPrice: 5000 },
          { label: 'Extra Large', value: 'xl', extraPrice: 10000 },
        ],
      },
      {
        name: 'Temperature',
        required: true,
        options: [
          { label: 'Iced', value: 'iced', extraPrice: 0 },
          { label: 'Hot', value: 'hot', extraPrice: 0 },
        ],
      },
      {
        name: 'Extra Shot',
        required: false,
        options: [
          { label: 'No Extra', value: 'none', extraPrice: 0 },
          { label: '+1 Shot', value: '1shot', extraPrice: 5000 },
          { label: '+2 Shots', value: '2shots', extraPrice: 10000 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: 28000,
    category: 'Beverages',
    stock: 35,
    variants: [
      {
        name: 'Size',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Large', value: 'large', extraPrice: 5000 },
        ],
      },
      {
        name: 'Temperature',
        required: true,
        options: [
          { label: 'Iced', value: 'iced', extraPrice: 0 },
          { label: 'Hot', value: 'hot', extraPrice: 0 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Es Teh Manis',
    price: 10000,
    category: 'Beverages',
    stock: 100,
    variants: [
      {
        name: 'Size',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Large', value: 'large', extraPrice: 3000 },
        ],
      },
      {
        name: 'Sugar Level',
        required: false,
        options: [
          { label: 'Normal', value: 'normal', extraPrice: 0 },
          { label: 'Less Sugar', value: 'less', extraPrice: 0 },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Nasi Goreng Spesial',
    price: 30000,
    category: 'Food',
    stock: 25,
    variants: [
      {
        name: 'Spice Level',
        required: true,
        options: [
          { label: 'Mild', value: 'mild', extraPrice: 0 },
          { label: 'Medium', value: 'medium', extraPrice: 0 },
          { label: 'Hot', value: 'hot', extraPrice: 0 },
          { label: 'Extra Hot', value: 'extra-hot', extraPrice: 0 },
        ],
      },
      {
        name: 'Add-on',
        required: false,
        options: [
          { label: 'No Add-on', value: 'none', extraPrice: 0 },
          { label: '+Telur Ceplok', value: 'egg', extraPrice: 4000 },
          { label: '+Ayam', value: 'chicken', extraPrice: 8000 },
          { label: '+Kerupuk', value: 'kerupuk', extraPrice: 2000 },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Mie Ayam Bakso',
    price: 20000,
    category: 'Food',
    stock: 30,
    variants: [
      {
        name: 'Portion',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Jumbo', value: 'jumbo', extraPrice: 7000 },
        ],
      },
      {
        name: 'Add-on',
        required: false,
        options: [
          { label: 'No Add-on', value: 'none', extraPrice: 0 },
          { label: '+Bakso Extra', value: 'bakso', extraPrice: 5000 },
          { label: '+Pangsit Goreng', value: 'pangsit', extraPrice: 4000 },
        ],
      },
    ],
  },
  { id: 7, name: 'Roti Bakar Coklat', price: 18000, category: 'Food', stock: 20 },
  {
    id: 8,
    name: 'French Fries',
    price: 15000,
    category: 'Snacks',
    stock: 40,
    variants: [
      {
        name: 'Size',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Large', value: 'large', extraPrice: 5000 },
        ],
      },
      {
        name: 'Sauce',
        required: false,
        options: [
          { label: 'Ketchup', value: 'ketchup', extraPrice: 0 },
          { label: 'Mayo', value: 'mayo', extraPrice: 0 },
          { label: 'BBQ', value: 'bbq', extraPrice: 2000 },
          { label: 'Cheese', value: 'cheese', extraPrice: 3000 },
        ],
      },
    ],
  },
  { id: 9, name: 'Dimsum Ayam', price: 25000, category: 'Snacks', stock: 30 },
  { id: 10, name: 'Mineral Water', price: 5000, category: 'Beverages', stock: 200 },
  {
    id: 11,
    name: 'Juice Alpukat',
    price: 20000,
    category: 'Beverages',
    stock: 25,
    variants: [
      {
        name: 'Size',
        required: true,
        options: [
          { label: 'Regular', value: 'regular', extraPrice: 0 },
          { label: 'Large', value: 'large', extraPrice: 5000 },
        ],
      },
      {
        name: 'Topping',
        required: false,
        options: [
          { label: 'No Topping', value: 'none', extraPrice: 0 },
          { label: '+Chocolate', value: 'choco', extraPrice: 3000 },
          { label: '+Oreo', value: 'oreo', extraPrice: 4000 },
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Chicken Wings',
    price: 28000,
    category: 'Snacks',
    stock: 18,
    variants: [
      {
        name: 'Flavor',
        required: true,
        options: [
          { label: 'Original', value: 'original', extraPrice: 0 },
          { label: 'Spicy', value: 'spicy', extraPrice: 0 },
          { label: 'BBQ', value: 'bbq', extraPrice: 2000 },
          { label: 'Honey Garlic', value: 'honey-garlic', extraPrice: 3000 },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Table definitions
// ---------------------------------------------------------------------------

export interface TableDef {
  id: string
  name: string
}

export const tables: TableDef[] = [
  { id: 'T1', name: 'Meja 1' },
  { id: 'T2', name: 'Meja 2' },
  { id: 'T3', name: 'Meja 3' },
  { id: 'T4', name: 'Meja 4' },
  { id: 'T5', name: 'Meja 5' },
  { id: 'T6', name: 'Meja 6' },
  { id: 'T7', name: 'Meja 7' },
  { id: 'T8', name: 'Meja 8' },
  { id: 'T9', name: 'Meja 9' },
  { id: 'T10', name: 'Meja 10' },
  { id: 'T11', name: 'Meja 11' },
  { id: 'T12', name: 'Meja 12' },
]

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const usePosStore = defineStore('pos', () => {
  // QR Orders — incoming orders from customer self-order
  const qrOrders = ref<QrOrder[]>([])
  const unreadCount = ref(0)

  const pendingOrders = computed(() => qrOrders.value.filter((o) => o.status === 'pending'))
  const allOrders = computed(() => [...qrOrders.value].sort((a, b) => b.createdAt - a.createdAt))

  function generateOrderId() {
    return (
      'QR-' +
      Date.now().toString(36).toUpperCase() +
      '-' +
      Math.random().toString(36).slice(2, 5).toUpperCase()
    )
  }

  function calculateSubtotal(items: OrderItem[]) {
    return items.reduce((sum, item) => {
      const extra = item.selectedVariants.reduce((s, v) => s + v.option.extraPrice, 0)
      return sum + (item.product.price + extra) * item.qty
    }, 0)
  }

  /**
   * Submit order from public QR page.
   * In real app this would be an API call.
   */
  function submitOrder(tableId: string, items: OrderItem[], customerName: string): QrOrder {
    const order: QrOrder = {
      id: generateOrderId(),
      tableId,
      items,
      customerName,
      status: 'pending',
      createdAt: Date.now(),
      subtotal: calculateSubtotal(items),
    }
    qrOrders.value.push(order)
    unreadCount.value++
    return order
  }

  function acceptOrder(orderId: string) {
    const order = qrOrders.value.find((o) => o.id === orderId)
    if (order) order.status = 'accepted'
  }

  function rejectOrder(orderId: string) {
    const order = qrOrders.value.find((o) => o.id === orderId)
    if (order) order.status = 'rejected'
  }

  function clearUnread() {
    unreadCount.value = 0
  }

  // ---------------------------------------------------------------------------
  // Demo: simulate incoming QR order after a delay
  // ---------------------------------------------------------------------------

  function simulateIncomingOrder() {
    const demoItems: OrderItem[] = [
      {
        product: productCatalog[1]!, // Americano
        qty: 2,
        selectedVariants: [
          { name: 'Size', option: { label: 'Large', value: 'large', extraPrice: 5000 } },
          { name: 'Temperature', option: { label: 'Iced', value: 'iced', extraPrice: 0 } },
        ],
      },
      {
        product: productCatalog[4]!, // Nasi Goreng Spesial
        qty: 1,
        selectedVariants: [
          { name: 'Spice Level', option: { label: 'Medium', value: 'medium', extraPrice: 0 } },
          { name: 'Add-on', option: { label: '+Telur Ceplok', value: 'egg', extraPrice: 4000 } },
        ],
      },
      {
        product: productCatalog[7]!, // French Fries
        qty: 1,
        selectedVariants: [
          { name: 'Size', option: { label: 'Regular', value: 'regular', extraPrice: 0 } },
          { name: 'Sauce', option: { label: 'Cheese', value: 'cheese', extraPrice: 3000 } },
        ],
      },
    ]

    submitOrder('T3', demoItems, 'Rina (QR Order)')
  }

  return {
    qrOrders,
    unreadCount,
    pendingOrders,
    allOrders,
    submitOrder,
    acceptOrder,
    rejectOrder,
    clearUnread,
    simulateIncomingOrder,
    calculateSubtotal,
  }
})
