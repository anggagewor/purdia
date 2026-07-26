<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  BaseButton,
  BaseBadge,
  BaseInput,
  BaseModal,
  BaseSelect,
  BaseAvatar,
  BasePagination,
} from '@purdia/ui'
import {
  Search,
  Plus,
  Minus,
  Trash2,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Percent,
  Tag,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Ticket,
  Pause,
  Play,
  Clock,
  MapPin,
  Bell,
} from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'
import { usePosStore, type QrOrder } from '@/stores/pos'

interface VariantOption {
  label: string
  value: string
  extraPrice: number
}

interface ProductVariant {
  name: string
  required: boolean
  options: VariantOption[]
}

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  variants?: ProductVariant[]
}

interface SelectedVariant {
  name: string
  option: VariantOption
}

interface CartItem {
  product: Product
  qty: number
  discount: number
  discountType: 'nominal' | 'percent'
  selectedVariants: SelectedVariant[]
}

const products: Product[] = [
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

const categories = ['All', 'Beverages', 'Food', 'Snacks']
const activeCategory = ref('All')
const searchQuery = ref('')
const cart = ref<CartItem[]>([])

// Favorites
const favorites = ref<Set<number>>(new Set())

function toggleFavorite(productId: number) {
  if (favorites.value.has(productId)) {
    favorites.value.delete(productId)
  } else {
    favorites.value.add(productId)
  }
}

function isFavorite(productId: number) {
  return favorites.value.has(productId)
}

const favoriteProducts = computed(() => products.filter((p) => favorites.value.has(p.id)))

// Pagination
const currentPage = ref(1)
const perPage = 8

const filteredProducts = computed(() => {
  let list = products
  if (activeCategory.value !== 'All') {
    list = list.filter((p) => p.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(q))
  }
  return list
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

// Reset page when filter changes
function setCategory(cat: string) {
  activeCategory.value = cat
  currentPage.value = 1
}

// Customer
const customerType = ref<string | number>('walkin')
const customerName = ref('')
const memberSearch = ref<string | number>('')

const customerTypeOptions: SelectOption[] = [
  { label: 'Walk-in', value: 'walkin' },
  { label: 'Member', value: 'member' },
]

// Discount global
const globalDiscount = ref(0)
const globalDiscountType = ref<'nominal' | 'percent'>('percent')

// Voucher / Promo Code
interface Voucher {
  code: string
  description: string
  discountType: 'percent' | 'nominal'
  discountValue: number
  minPurchase: number
  maxDiscount?: number // max potongan untuk type percent
}

const availableVouchers: Voucher[] = [
  {
    code: 'HEMAT10',
    description: 'Diskon 10%',
    discountType: 'percent',
    discountValue: 10,
    minPurchase: 50000,
    maxDiscount: 20000,
  },
  {
    code: 'MAKAN20K',
    description: 'Potongan Rp 20.000',
    discountType: 'nominal',
    discountValue: 20000,
    minPurchase: 80000,
  },
  {
    code: 'NEWUSER',
    description: 'Diskon 15% New User',
    discountType: 'percent',
    discountValue: 15,
    minPurchase: 30000,
    maxDiscount: 25000,
  },
  {
    code: 'JUMAT50',
    description: 'Potongan Rp 50.000',
    discountType: 'nominal',
    discountValue: 50000,
    minPurchase: 150000,
  },
  {
    code: 'KOPI5K',
    description: 'Potongan Rp 5.000',
    discountType: 'nominal',
    discountValue: 5000,
    minPurchase: 20000,
  },
]

const voucherCode = ref('')
const appliedVoucher = ref<Voucher | null>(null)
const voucherError = ref('')

function applyVoucher() {
  voucherError.value = ''

  if (!voucherCode.value.trim()) {
    voucherError.value = 'Masukkan kode voucher'
    return
  }

  const code = voucherCode.value.trim().toUpperCase()
  const voucher = availableVouchers.find((v) => v.code === code)

  if (!voucher) {
    voucherError.value = 'Kode voucher tidak ditemukan'
    return
  }

  if (subtotal.value < voucher.minPurchase) {
    voucherError.value = `Minimum belanja ${formatRp(voucher.minPurchase)}`
    return
  }

  appliedVoucher.value = voucher
  voucherCode.value = ''
}

function removeVoucher() {
  appliedVoucher.value = null
  voucherError.value = ''
}

const voucherDiscountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  const afterGlobalDiscount = subtotal.value - globalDiscountAmount.value
  if (appliedVoucher.value.discountType === 'percent') {
    const raw = (afterGlobalDiscount * appliedVoucher.value.discountValue) / 100
    return appliedVoucher.value.maxDiscount ? Math.min(raw, appliedVoucher.value.maxDiscount) : raw
  }
  return Math.min(appliedVoucher.value.discountValue, afterGlobalDiscount)
})

// Payment
const showPayment = ref(false)
const paymentMethod = ref<string | number>('cash')
const cashReceived = ref<number>(0)
const cardNumber = ref('')
const cardIssuer = ref<string | number>('')
const ewalletIssuer = ref<string | number>('')
const ewalletPhone = ref('')

const paymentOptions: SelectOption[] = [
  { label: 'Cash', value: 'cash' },
  { label: 'Debit Card', value: 'debit' },
  { label: 'Credit Card', value: 'credit' },
  { label: 'E-Wallet (QRIS)', value: 'ewallet' },
  { label: 'Bank Transfer', value: 'transfer' },
]

const cardIssuerOptions: SelectOption[] = [
  { label: 'BCA', value: 'bca' },
  { label: 'BRI', value: 'bri' },
  { label: 'BNI', value: 'bni' },
  { label: 'Mandiri', value: 'mandiri' },
  { label: 'CIMB Niaga', value: 'cimb' },
  { label: 'Visa', value: 'visa' },
  { label: 'Mastercard', value: 'mastercard' },
  { label: 'JCB', value: 'jcb' },
]

const ewalletIssuerOptions: SelectOption[] = [
  { label: 'GoPay', value: 'gopay' },
  { label: 'OVO', value: 'ovo' },
  { label: 'DANA', value: 'dana' },
  { label: 'ShopeePay', value: 'shopeepay' },
  { label: 'LinkAja', value: 'linkaja' },
  { label: 'QRIS', value: 'qris' },
]

const memberOptions: SelectOption[] = [
  { label: 'Budi Santoso - M001', value: 'M001' },
  { label: 'Siti Rahayu - M002', value: 'M002' },
  { label: 'Ahmad Fauzi - M003', value: 'M003' },
  { label: 'Lisa Permata - M004', value: 'M004' },
]

// Variant picker
const showVariantPicker = ref(false)
const variantProduct = ref<Product | null>(null)
const variantSelections = ref<Record<string, VariantOption>>({})

function addToCart(product: Product) {
  if (product.variants && product.variants.length > 0) {
    // Show variant picker modal
    variantProduct.value = product
    variantSelections.value = {}
    // Pre-select first option for each variant
    for (const variant of product.variants) {
      if (variant.options[0]) {
        variantSelections.value[variant.name] = variant.options[0]
      }
    }
    showVariantPicker.value = true
  } else {
    // No variants — add directly
    addToCartDirect(product, [])
  }
}

function addToCartDirect(product: Product, selectedVariants: SelectedVariant[]) {
  // Check if same product with same variant combo already exists in cart
  const variantKey = selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|')
  const existing = cart.value.find((c) => {
    if (c.product.id !== product.id) return false
    const existingKey = c.selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|')
    return existingKey === variantKey
  })

  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ product, qty: 1, discount: 0, discountType: 'percent', selectedVariants })
  }
}

function confirmVariant() {
  if (!variantProduct.value) return

  // Check required variants are selected
  const product = variantProduct.value
  if (product.variants) {
    for (const variant of product.variants) {
      if (variant.required && !variantSelections.value[variant.name]) return
    }
  }

  const selected: SelectedVariant[] = Object.entries(variantSelections.value).map(
    ([name, option]) => ({ name, option }),
  )

  addToCartDirect(product, selected)
  showVariantPicker.value = false
  variantProduct.value = null
}

function selectVariantOption(variantName: string, option: VariantOption) {
  variantSelections.value[variantName] = option
}

function isVariantSelected(variantName: string, option: VariantOption) {
  return variantSelections.value[variantName]?.value === option.value
}

const variantExtraTotal = computed(() => {
  return Object.values(variantSelections.value).reduce((sum, opt) => sum + opt.extraPrice, 0)
})

function getCartItemVariantExtra(item: CartItem) {
  return item.selectedVariants.reduce((sum, v) => sum + v.option.extraPrice, 0)
}

function updateQty(idx: number, delta: number) {
  const item = cart.value[idx]
  if (!item) return
  item.qty += delta
  if (item.qty <= 0) cart.value.splice(idx, 1)
}

function removeItem(idx: number) {
  cart.value.splice(idx, 1)
}

function getItemTotal(item: CartItem) {
  const unitPrice = item.product.price + getCartItemVariantExtra(item)
  const base = unitPrice * item.qty
  if (item.discount <= 0) return base
  if (item.discountType === 'percent') return base - (base * item.discount) / 100
  return base - item.discount
}

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + getItemTotal(item), 0))

const globalDiscountAmount = computed(() => {
  if (globalDiscount.value <= 0) return 0
  if (globalDiscountType.value === 'percent') return (subtotal.value * globalDiscount.value) / 100
  return globalDiscount.value
})

const grandTotal = computed(() =>
  Math.max(0, subtotal.value - globalDiscountAmount.value - voucherDiscountAmount.value),
)
const change = computed(() => Math.max(0, cashReceived.value - grandTotal.value))

function openPayment() {
  if (cart.value.length === 0) return
  cashReceived.value = grandTotal.value
  showPayment.value = true
}

function completeTransaction() {
  cart.value = []
  globalDiscount.value = 0
  appliedVoucher.value = null
  voucherCode.value = ''
  voucherError.value = ''
  customerType.value = 'walkin'
  customerName.value = ''
  memberSearch.value = ''
  cardNumber.value = ''
  cardIssuer.value = ''
  ewalletIssuer.value = ''
  ewalletPhone.value = ''
  showPayment.value = false
}

// ---------------------------------------------------------------------------
// Hold Order & Table/Tab System
// ---------------------------------------------------------------------------

interface HeldOrder {
  id: string
  items: CartItem[]
  customerType: string | number
  memberSearch: string | number
  globalDiscount: number
  globalDiscountType: 'nominal' | 'percent'
  appliedVoucher: Voucher | null
  table: string | null // null = takeaway / no table
  label: string // customer name or order label
  createdAt: number
  subtotal: number
}

const heldOrders = ref<HeldOrder[]>([])
const showHeldOrders = ref(false)
const showHoldDialog = ref(false)
const holdLabel = ref('')
const holdTable = ref<string | null>(null)

// Table setup
const tables: { id: string; name: string }[] = [
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

function getOccupiedTables() {
  return new Set(heldOrders.value.filter((o) => o.table).map((o) => o.table))
}

function isTableOccupied(tableId: string) {
  return getOccupiedTables().has(tableId)
}

function getTableOrder(tableId: string) {
  return heldOrders.value.find((o) => o.table === tableId)
}

function openHoldDialog() {
  if (cart.value.length === 0) return
  holdLabel.value = ''
  holdTable.value = null
  showHoldDialog.value = true
}

function generateOrderId() {
  return 'ORD-' + Date.now().toString(36).toUpperCase()
}

function holdOrder() {
  if (cart.value.length === 0) return

  // If assigning to a table that already has an order, merge items
  if (holdTable.value) {
    const existingOrder = getTableOrder(holdTable.value)
    if (existingOrder) {
      // Merge: add current cart items to existing order
      for (const item of cart.value) {
        const variantKey = item.selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|')
        const existing = existingOrder.items.find((c) => {
          if (c.product.id !== item.product.id) return false
          return (
            c.selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|') === variantKey
          )
        })
        if (existing) {
          existing.qty += item.qty
        } else {
          existingOrder.items.push({ ...item })
        }
      }
      // Recalculate subtotal
      existingOrder.subtotal = existingOrder.items.reduce((sum, i) => {
        const extra = i.selectedVariants.reduce((s, v) => s + v.option.extraPrice, 0)
        return sum + (i.product.price + extra) * i.qty
      }, 0)
      resetCart()
      showHoldDialog.value = false
      return
    }
  }

  // Create new held order
  const order: HeldOrder = {
    id: generateOrderId(),
    items: [...cart.value],
    customerType: customerType.value,
    memberSearch: memberSearch.value,
    globalDiscount: globalDiscount.value,
    globalDiscountType: globalDiscountType.value,
    appliedVoucher: appliedVoucher.value,
    table: holdTable.value,
    label:
      holdLabel.value ||
      (holdTable.value ? (tables.find((t) => t.id === holdTable.value)?.name ?? '') : 'Order'),
    createdAt: Date.now(),
    subtotal: subtotal.value,
  }

  heldOrders.value.push(order)
  resetCart()
  showHoldDialog.value = false
}

function recallOrder(orderId: string) {
  const idx = heldOrders.value.findIndex((o) => o.id === orderId)
  if (idx === -1) return

  const order = heldOrders.value[idx]!

  // If current cart has items, ask to hold first? For now, replace.
  cart.value = [...order.items]
  customerType.value = order.customerType
  memberSearch.value = order.memberSearch
  globalDiscount.value = order.globalDiscount
  globalDiscountType.value = order.globalDiscountType
  appliedVoucher.value = order.appliedVoucher
  voucherCode.value = ''
  voucherError.value = ''

  // Remove from held orders
  heldOrders.value.splice(idx, 1)
  showHeldOrders.value = false
}

function addItemsToTable(tableId: string) {
  // Set up hold dialog pre-filled with this table
  if (cart.value.length === 0) return
  holdLabel.value = ''
  holdTable.value = tableId
  // Directly hold (merge) without showing dialog
  holdOrder()
}

function voidOrder(orderId: string) {
  const idx = heldOrders.value.findIndex((o) => o.id === orderId)
  if (idx !== -1) {
    heldOrders.value.splice(idx, 1)
  }
}

function resetCart() {
  cart.value = []
  globalDiscount.value = 0
  globalDiscountType.value = 'percent'
  appliedVoucher.value = null
  voucherCode.value = ''
  voucherError.value = ''
  customerType.value = 'walkin'
  customerName.value = ''
  memberSearch.value = ''
}

function getTimeSince(timestamp: number) {
  const diff = Math.floor((Date.now() - timestamp) / 60000)
  if (diff < 1) return 'Baru saja'
  if (diff < 60) return `${diff} menit lalu`
  const hours = Math.floor(diff / 60)
  return `${hours} jam lalu`
}

const heldOrdersCount = computed(() => heldOrders.value.length)

// ---------------------------------------------------------------------------
// QR Orders Integration
// ---------------------------------------------------------------------------

const posStore = usePosStore()
const showQrOrders = ref(false)

// Simulate an incoming QR order after 3 seconds for demo
let demoTriggered = false
setTimeout(() => {
  if (!demoTriggered) {
    demoTriggered = true
    posStore.simulateIncomingOrder()
  }
}, 3000)

function acceptQrOrder(order: QrOrder) {
  posStore.acceptOrder(order.id)

  // Convert QR order items to held order (assign to table)
  const heldOrder: HeldOrder = {
    id: order.id,
    items: order.items.map((item) => ({
      product: item.product,
      qty: item.qty,
      discount: 0,
      discountType: 'percent' as const,
      selectedVariants: item.selectedVariants,
    })),
    customerType: 'walkin',
    memberSearch: '',
    globalDiscount: 0,
    globalDiscountType: 'percent',
    appliedVoucher: null,
    table: order.tableId,
    label: `${order.customerName} (QR)`,
    createdAt: order.createdAt,
    subtotal: order.subtotal,
  }

  // Merge if table already has an order
  const existingOrder = getTableOrder(order.tableId)
  if (existingOrder) {
    for (const item of heldOrder.items) {
      const variantKey = item.selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|')
      const existing = existingOrder.items.find((c) => {
        if (c.product.id !== item.product.id) return false
        return c.selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|') === variantKey
      })
      if (existing) {
        existing.qty += item.qty
      } else {
        existingOrder.items.push({ ...item })
      }
    }
    existingOrder.subtotal = existingOrder.items.reduce((sum, i) => {
      const extra = i.selectedVariants.reduce((s, v) => s + v.option.extraPrice, 0)
      return sum + (i.product.price + extra) * i.qty
    }, 0)
  } else {
    heldOrders.value.push(heldOrder)
  }
}

function rejectQrOrder(order: QrOrder) {
  posStore.rejectOrder(order.id)
}

function openQrOrders() {
  showQrOrders.value = true
  posStore.clearUnread()
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

// Numpad
const cashInput = ref<HTMLInputElement | null>(null)
const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'backspace'] as const

// Active numpad field — determines which input the numpad binds to
type NumpadField = 'cash' | 'card' | 'phone'
const activeNumpadField = ref<NumpadField>('cash')

// Auto-set active field based on payment method
watch(
  () => paymentMethod.value,
  (method) => {
    if (method === 'cash') activeNumpadField.value = 'cash'
    else if (method === 'debit' || method === 'credit') activeNumpadField.value = 'card'
    else if (method === 'ewallet') activeNumpadField.value = 'phone'
  },
  { immediate: true },
)

const quickAmounts = computed(() => {
  const total = grandTotal.value
  const amounts = new Set<number>()
  const roundUp = (n: number, step: number) => Math.ceil(n / step) * step
  amounts.add(total)
  amounts.add(roundUp(total, 10000))
  amounts.add(roundUp(total, 50000))
  amounts.add(roundUp(total, 100000))
  return [...amounts]
    .filter((a) => a >= total)
    .sort((a, b) => a - b)
    .slice(0, 4)
})

function handleNumpad(key: string) {
  if (activeNumpadField.value === 'cash') {
    const current = String(cashReceived.value || '')
    if (key === 'backspace') {
      const next = current.slice(0, -1)
      cashReceived.value = Number(next) || 0
    } else {
      cashReceived.value = Number(current + key) || 0
    }
  } else if (activeNumpadField.value === 'card') {
    if (key === 'backspace') {
      cardNumber.value = cardNumber.value.slice(0, -1)
    } else {
      // Auto-format card number with spaces every 4 digits
      const raw = cardNumber.value.replace(/\s/g, '')
      if (raw.length < 16) {
        const newRaw = raw + key
        cardNumber.value = newRaw.replace(/(\d{4})(?=\d)/g, '$1 ')
      }
    }
  } else if (activeNumpadField.value === 'phone') {
    if (key === 'backspace') {
      ewalletPhone.value = ewalletPhone.value.slice(0, -1)
    } else {
      if (ewalletPhone.value.length < 15) {
        ewalletPhone.value += key
      }
    }
  }
}

function getNumpadKeyClass(key: string) {
  if (key === 'backspace') {
    return 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
  }
  return 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
}

const numpadLabel = computed(() => {
  if (activeNumpadField.value === 'cash') return 'Cash Amount'
  if (activeNumpadField.value === 'card') return 'Card Number'
  return 'Phone Number'
})
</script>

<template>
  <div class="flex h-full min-h-0 gap-4">
    <!-- Left: Products -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- Search + Categories -->
      <div class="shrink-0 space-y-3 mb-4">
        <div class="flex items-center gap-2">
          <BaseInput
            v-model="searchQuery"
            type="text"
            placeholder="Search product..."
            size="sm"
            :icon="Search"
            @update:model-value="currentPage = 1"
          />
          <!-- QR Orders notification -->
          <button
            class="relative flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            @click="openQrOrders"
          >
            <Bell class="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span
              v-if="posStore.unreadCount > 0"
              class="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center animate-pulse"
            >
              {{ posStore.unreadCount }}
            </span>
          </button>
        </div>
        <div class="flex gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer"
            :class="
              activeCategory === cat
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            "
            @click="setCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Favorites Row -->
      <div v-if="favoriteProducts.length > 0" class="shrink-0 mb-3">
        <div class="flex items-center gap-2 mb-2">
          <Star class="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Favorites</span>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="product in favoriteProducts"
            :key="'fav-' + product.id"
            class="shrink-0 w-28 bg-amber-50 border border-amber-200 rounded-lg p-2 text-left hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer dark:bg-amber-900/10 dark:border-amber-800 dark:hover:border-amber-500"
            @click="addToCart(product)"
          >
            <p class="text-[0.6875rem] font-medium text-gray-800 truncate dark:text-gray-200">
              {{ product.name }}
            </p>
            <p class="text-[0.625rem] font-bold text-primary-600 mt-0.5 dark:text-primary-400">
              {{ formatRp(product.price) }}
            </p>
          </button>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative bg-white border border-gray-200 rounded-lg p-3 text-left hover:border-primary-300 hover:shadow-sm transition-all dark:bg-gray-800 dark:border-gray-700 dark:hover:border-primary-500"
          >
            <!-- Favorite toggle -->
            <button
              class="absolute top-2 right-2 p-0.5 cursor-pointer z-10"
              @click.stop="toggleFavorite(product.id)"
              :aria-label="isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'"
            >
              <Star
                class="w-4 h-4 transition-colors"
                :class="
                  isFavorite(product.id)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-gray-300 hover:text-amber-400 dark:text-gray-600 dark:hover:text-amber-400'
                "
              />
            </button>
            <!-- Clickable area -->
            <button class="w-full text-left cursor-pointer" @click="addToCart(product)">
              <div
                class="w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-2xl mb-2 dark:bg-gray-700"
              >
                {{
                  product.category === 'Beverages'
                    ? '☕'
                    : product.category === 'Food'
                      ? '🍽️'
                      : '🍟'
                }}
              </div>
              <p class="text-sm font-medium text-gray-800 truncate dark:text-gray-200">
                {{ product.name }}
              </p>
              <div class="flex items-center justify-between mt-1">
                <span class="text-sm font-bold text-primary-600 dark:text-primary-400">{{
                  formatRp(product.price)
                }}</span>
                <span
                  v-if="product.variants?.length"
                  class="text-[0.625rem] text-amber-500 dark:text-amber-400"
                  >✦ opsi</span
                >
                <span v-else class="text-[0.625rem] text-gray-400 dark:text-gray-500"
                  >stk: {{ product.stock }}</span
                >
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="shrink-0 pt-3">
        <BasePagination
          v-model:current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredProducts.length"
          :per-page="perPage"
          variant="minimal"
          size="sm"
        />
      </div>
    </div>

    <!-- Right: Cart -->
    <div
      class="w-96 shrink-0 bg-white border border-gray-200 rounded-xl flex flex-col min-h-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <!-- Cart Header -->
      <div class="px-4 py-3 border-b border-gray-100 shrink-0 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Current Order</h3>
          <button
            class="relative flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 cursor-pointer transition-colors dark:text-gray-400 dark:hover:text-primary-400"
            @click="showHeldOrders = true"
          >
            <Clock class="w-3.5 h-3.5" />
            <span>Held Orders</span>
            <span
              v-if="heldOrdersCount > 0"
              class="absolute -top-1.5 -right-2.5 w-4 h-4 bg-amber-500 text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center"
            >
              {{ heldOrdersCount }}
            </span>
          </button>
        </div>
        <!-- Customer Type -->
        <BaseSelect
          v-model="customerType"
          :options="customerTypeOptions"
          :searchable="false"
          :clearable="false"
          size="sm"
          placeholder="Customer type"
        />
        <div v-if="customerType === 'member'" class="mt-2">
          <BaseSelect
            v-model="memberSearch"
            :options="memberOptions"
            placeholder="Search member..."
            size="sm"
          />
        </div>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto px-4 py-2">
        <div
          v-if="cart.length === 0"
          class="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600"
        >
          <Tag class="w-12 h-12 mb-2" />
          <p class="text-sm">Cart is empty</p>
        </div>
        <div v-else class="space-y-1">
          <div
            v-for="(item, idx) in cart"
            :key="item.product.id"
            class="py-2 border-b border-gray-50 dark:border-gray-700"
          >
            <div class="flex items-start gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate dark:text-gray-200">
                  {{ item.product.name }}
                </p>
                <p
                  v-if="item.selectedVariants.length > 0"
                  class="text-[0.625rem] text-primary-600 dark:text-primary-400 truncate"
                >
                  {{ item.selectedVariants.map((v) => v.option.label).join(', ') }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatRp(item.product.price + getCartItemVariantExtra(item)) }} x
                  {{ item.qty }}
                </p>
              </div>
              <div class="flex items-center gap-1">
                <button
                  class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  @click="updateQty(idx, -1)"
                >
                  <Minus class="w-3 h-3" />
                </button>
                <span class="w-6 text-center text-sm font-medium dark:text-gray-200">{{
                  item.qty
                }}</span>
                <button
                  class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  @click="updateQty(idx, 1)"
                >
                  <Plus class="w-3 h-3" />
                </button>
              </div>
              <div class="text-right shrink-0 w-20">
                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ formatRp(getItemTotal(item)) }}
                </p>
                <button
                  class="text-gray-300 hover:text-red-500 cursor-pointer dark:text-gray-600 dark:hover:text-red-400"
                  @click="removeItem(idx)"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <!-- Inline discount -->
            <div class="flex items-center gap-1.5 mt-1.5">
              <Percent class="w-3 h-3 text-gray-400 shrink-0 dark:text-gray-500" />
              <BaseInput
                v-model.number="item.discount"
                type="number"
                size="sm"
                placeholder="Disc"
                class="w-16"
              />
              <button
                class="text-[0.625rem] px-1.5 py-0.5 rounded font-medium cursor-pointer transition-colors"
                :class="
                  item.discountType === 'percent'
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                "
                @click="item.discountType = 'percent'"
              >
                %
              </button>
              <button
                class="text-[0.625rem] px-1.5 py-0.5 rounded font-medium cursor-pointer transition-colors"
                :class="
                  item.discountType === 'nominal'
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                "
                @click="item.discountType = 'nominal'"
              >
                Rp
              </button>
              <span
                v-if="item.discount > 0"
                class="text-[0.625rem] text-amber-600 dark:text-amber-400 ml-auto"
              >
                -{{
                  item.discountType === 'percent' ? `${item.discount}%` : formatRp(item.discount)
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <div class="shrink-0 border-t border-gray-100 px-4 py-3 space-y-2 dark:border-gray-700">
        <div class="flex items-center gap-2">
          <Tag class="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <BaseInput
            v-model.number="globalDiscount"
            type="number"
            size="sm"
            placeholder="Discount"
            class="flex-1 w-20"
          />
          <BaseSelect
            v-model="globalDiscountType"
            :options="[
              { label: '%', value: 'percent' },
              { label: 'Rp', value: 'nominal' },
            ]"
            :searchable="false"
            :clearable="false"
            size="sm"
            class="w-20"
          />
        </div>
        <!-- Voucher Code -->
        <div v-if="!appliedVoucher" class="flex items-center gap-2">
          <Ticket class="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <BaseInput
            v-model="voucherCode"
            type="text"
            size="sm"
            placeholder="Kode voucher"
            class="flex-1 uppercase"
            @keyup.enter="applyVoucher"
          />
          <BaseButton variant="primary" size="sm" @click="applyVoucher"> Apply </BaseButton>
        </div>
        <p v-if="voucherError" class="text-[0.625rem] text-red-500 dark:text-red-400 pl-6">
          {{ voucherError }}
        </p>
        <!-- Applied voucher -->
        <div
          v-if="appliedVoucher"
          class="flex items-center gap-2 px-2 py-1.5 bg-emerald-50 rounded-md dark:bg-emerald-900/20"
        >
          <Ticket class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              {{ appliedVoucher.code }}
            </p>
            <p class="text-[0.625rem] text-emerald-600 dark:text-emerald-400">
              {{ appliedVoucher.description }}
            </p>
          </div>
          <button
            class="text-gray-400 hover:text-red-500 cursor-pointer dark:text-gray-500 dark:hover:text-red-400"
            @click="removeVoucher"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Subtotal</span>
            <span>{{ formatRp(subtotal) }}</span>
          </div>
          <div
            v-if="globalDiscountAmount > 0"
            class="flex justify-between text-amber-600 dark:text-amber-400"
          >
            <span>Discount</span>
            <span>-{{ formatRp(globalDiscountAmount) }}</span>
          </div>
          <div
            v-if="voucherDiscountAmount > 0"
            class="flex justify-between text-emerald-600 dark:text-emerald-400"
          >
            <span>Voucher ({{ appliedVoucher?.code }})</span>
            <span>-{{ formatRp(voucherDiscountAmount) }}</span>
          </div>
          <div
            class="flex justify-between text-lg font-bold text-gray-900 pt-1 border-t border-gray-100 dark:text-gray-100 dark:border-gray-700"
          >
            <span>Total</span>
            <span>{{ formatRp(grandTotal) }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <BaseButton
            variant="outline"
            class="flex-1"
            :disabled="cart.length === 0"
            @click="openHoldDialog"
          >
            <Pause class="w-4 h-4" /> Hold
          </BaseButton>
          <BaseButton class="flex-[2]" :disabled="cart.length === 0" @click="openPayment">
            <CreditCard class="w-4 h-4" /> Pay {{ formatRp(grandTotal) }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <BaseModal v-model="showPayment" title="Payment" size="lg">
      <div class="flex gap-6">
        <!-- Left: Payment Form -->
        <div class="flex-1 space-y-4 min-w-0">
          <div class="text-center py-2">
            <p class="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ formatRp(grandTotal) }}
            </p>
          </div>
          <BaseSelect
            v-model="paymentMethod"
            label="Payment Method"
            :options="paymentOptions"
            :searchable="false"
          />
          <div v-if="paymentMethod === 'cash'">
            <BaseInput
              ref="cashInput"
              v-model.number="cashReceived"
              type="number"
              label="Cash Received"
              @focus="activeNumpadField = 'cash'"
            />
            <div
              v-if="change > 0"
              class="mt-2 p-2 bg-emerald-50 rounded-md text-center dark:bg-emerald-900/20"
            >
              <p class="text-xs text-emerald-600 dark:text-emerald-400">Change</p>
              <p class="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {{ formatRp(change) }}
              </p>
            </div>
          </div>
          <div v-if="paymentMethod === 'debit' || paymentMethod === 'credit'" class="space-y-3">
            <BaseSelect
              v-model="cardIssuer"
              label="Card Issuer"
              :options="cardIssuerOptions"
              placeholder="Select bank / issuer..."
            />
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-1 dark:text-gray-300"
                >Card Number</label
              >
              <input
                v-model="cardNumber"
                type="text"
                placeholder="**** **** **** ****"
                maxlength="19"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900/30"
                @focus="activeNumpadField = 'card'"
              />
            </div>
          </div>
          <div v-if="paymentMethod === 'ewallet'" class="space-y-3">
            <BaseSelect
              v-model="ewalletIssuer"
              label="E-Wallet"
              :options="ewalletIssuerOptions"
              placeholder="Select e-wallet..."
            />
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-1 dark:text-gray-300"
                >Phone Number</label
              >
              <input
                v-model="ewalletPhone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900/30"
                @focus="activeNumpadField = 'phone'"
              />
            </div>
          </div>
        </div>

        <!-- Right: Numpad (always visible) -->
        <div
          class="w-56 shrink-0 bg-gray-50 rounded-xl p-3 flex flex-col gap-2 dark:bg-gray-900/50"
        >
          <p class="text-xs font-medium text-gray-500 text-center mb-1 dark:text-gray-400">
            {{ numpadLabel }}
          </p>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="key in numpadKeys"
              :key="key"
              class="h-11 rounded-lg font-semibold text-lg transition-all cursor-pointer select-none active:scale-95"
              :class="getNumpadKeyClass(key)"
              @click="handleNumpad(key)"
            >
              {{ key === 'backspace' ? '⌫' : key }}
            </button>
          </div>
          <!-- Quick amounts for cash only -->
          <div v-if="paymentMethod === 'cash'" class="flex flex-wrap gap-1.5 mt-2">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              class="flex-1 min-w-[calc(50%-0.25rem)] px-2 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors cursor-pointer text-center dark:border-gray-600 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:border-primary-500 dark:hover:text-primary-300"
              @click="cashReceived = amount"
            >
              {{ formatRp(amount) }}
            </button>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showPayment = false">Cancel</BaseButton>
        <BaseButton variant="success" size="sm" @click="completeTransaction">Complete</BaseButton>
      </template>
    </BaseModal>

    <!-- Variant Picker Modal -->
    <BaseModal
      v-model="showVariantPicker"
      :title="variantProduct?.name ?? 'Select Options'"
      size="md"
    >
      <div v-if="variantProduct" class="space-y-4">
        <!-- Product info -->
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-900/50">
          <div
            class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-2xl dark:bg-gray-700"
          >
            {{
              variantProduct.category === 'Beverages'
                ? '☕'
                : variantProduct.category === 'Food'
                  ? '🍽️'
                  : '🍟'
            }}
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-gray-100">{{ variantProduct.name }}</p>
            <p class="text-sm text-primary-600 dark:text-primary-400">
              {{ formatRp(variantProduct.price) }}
              <span v-if="variantExtraTotal > 0" class="text-gray-500 dark:text-gray-400">
                + {{ formatRp(variantExtraTotal) }}
              </span>
            </p>
          </div>
          <div class="ml-auto text-right">
            <p class="text-lg font-bold text-gray-900 dark:text-gray-100">
              {{ formatRp(variantProduct.price + variantExtraTotal) }}
            </p>
          </div>
        </div>

        <!-- Variant options -->
        <div v-for="variant in variantProduct.variants" :key="variant.name" class="space-y-2">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ variant.name }}</p>
            <BaseBadge v-if="variant.required" variant="danger" size="sm">Wajib</BaseBadge>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in variant.options"
              :key="option.value"
              class="px-3 py-1.5 text-sm rounded-lg border transition-all cursor-pointer"
              :class="
                isVariantSelected(variant.name, option)
                  ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-500'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-800'
              "
              @click="selectVariantOption(variant.name, option)"
            >
              {{ option.label }}
              <span v-if="option.extraPrice > 0" class="text-xs opacity-70 ml-1">
                +{{ formatRp(option.extraPrice) }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showVariantPicker = false">Batal</BaseButton>
        <BaseButton variant="primary" size="sm" @click="confirmVariant">
          <Plus class="w-4 h-4" /> Tambah ke Keranjang
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Hold Order Dialog -->
    <BaseModal v-model="showHoldDialog" title="Hold Order" size="sm">
      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Simpan order ini untuk dilanjutkan nanti.
        </p>
        <!-- Label -->
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-1 dark:text-gray-300"
            >Label / Nama Customer</label
          >
          <input
            v-model="holdLabel"
            type="text"
            placeholder="Opsional (contoh: Pak Budi, Takeaway #3)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900/30"
          />
        </div>
        <!-- Table selector -->
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-1.5 dark:text-gray-300">
            Assign ke Meja <span class="text-gray-400 font-normal">(opsional)</span>
          </label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="table in tables"
              :key="table.id"
              class="relative px-2 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center"
              :class="
                holdTable === table.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-500'
                  : isTableOccupied(table.id)
                    ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-800'
              "
              @click="holdTable = holdTable === table.id ? null : table.id"
            >
              <MapPin
                v-if="isTableOccupied(table.id) && holdTable !== table.id"
                class="w-3 h-3 mx-auto mb-0.5 text-amber-500 dark:text-amber-400"
              />
              <span>{{ table.name.replace('Meja ', '') }}</span>
            </button>
          </div>
          <p
            v-if="holdTable && isTableOccupied(holdTable)"
            class="text-[0.625rem] text-amber-600 mt-1.5 dark:text-amber-400"
          >
            Meja ini sudah ada order — item akan digabung.
          </p>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showHoldDialog = false">Batal</BaseButton>
        <BaseButton variant="primary" size="sm" @click="holdOrder">
          <Pause class="w-4 h-4" /> Hold Order
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Held Orders Panel -->
    <BaseModal v-model="showHeldOrders" title="Held Orders" size="lg">
      <div v-if="heldOrders.length === 0" class="py-8 text-center">
        <Clock class="w-12 h-12 text-gray-300 mx-auto mb-2 dark:text-gray-600" />
        <p class="text-sm text-gray-500 dark:text-gray-400">Belum ada order yang di-hold</p>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="order in heldOrders"
          :key="order.id"
          class="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600"
        >
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ order.label || order.id }}
                </p>
                <BaseBadge v-if="order.table" variant="info" size="sm">
                  <MapPin class="w-3 h-3" /> {{ tables.find((t) => t.id === order.table)?.name }}
                </BaseBadge>
              </div>
              <p class="text-xs text-gray-400 dark:text-gray-500">
                {{ order.id }} · {{ getTimeSince(order.createdAt) }}
              </p>
            </div>
            <p class="text-sm font-bold text-gray-900 dark:text-gray-100">
              {{ formatRp(order.subtotal) }}
            </p>
          </div>
          <!-- Items preview -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="(item, i) in order.items.slice(0, 4)"
              :key="i"
              class="text-[0.625rem] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            >
              {{ item.qty }}x {{ item.product.name }}
            </span>
            <span
              v-if="order.items.length > 4"
              class="text-[0.625rem] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            >
              +{{ order.items.length - 4 }} lainnya
            </span>
          </div>
          <!-- Actions -->
          <div class="flex gap-2">
            <BaseButton variant="primary" size="sm" class="flex-1" @click="recallOrder(order.id)">
              <Play class="w-3.5 h-3.5" /> Lanjutkan
            </BaseButton>
            <BaseButton variant="danger" size="sm" @click="voidOrder(order.id)">
              <Trash2 class="w-3.5 h-3.5" /> Void
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseModal>

    <!-- QR Orders Panel -->
    <BaseModal v-model="showQrOrders" title="QR Orders" size="lg">
      <div v-if="posStore.allOrders.length === 0" class="py-8 text-center">
        <Bell class="w-12 h-12 text-gray-300 mx-auto mb-2 dark:text-gray-600" />
        <p class="text-sm text-gray-500 dark:text-gray-400">Belum ada order dari QR</p>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="order in posStore.allOrders"
          :key="order.id"
          class="border rounded-lg p-3 transition-colors"
          :class="
            order.status === 'pending'
              ? 'border-amber-300 bg-amber-50/50 dark:border-amber-600 dark:bg-amber-900/10'
              : order.status === 'accepted'
                ? 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-700 dark:bg-emerald-900/10'
                : 'border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/20'
          "
        >
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ order.customerName }}
                </p>
                <BaseBadge
                  :variant="
                    order.status === 'pending'
                      ? 'warning'
                      : order.status === 'accepted'
                        ? 'success'
                        : 'danger'
                  "
                  size="sm"
                >
                  {{
                    order.status === 'pending'
                      ? 'Pending'
                      : order.status === 'accepted'
                        ? 'Accepted'
                        : 'Rejected'
                  }}
                </BaseBadge>
              </div>
              <p class="text-xs text-gray-400 dark:text-gray-500">
                {{ order.id }} · {{ tables.find((t) => t.id === order.tableId)?.name }} ·
                {{ getTimeSince(order.createdAt) }}
              </p>
            </div>
            <p class="text-sm font-bold text-gray-900 dark:text-gray-100">
              {{ formatRp(order.subtotal) }}
            </p>
          </div>
          <!-- Items -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="(item, i) in order.items.slice(0, 5)"
              :key="i"
              class="text-[0.625rem] px-1.5 py-0.5 bg-white/80 border border-gray-100 rounded text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              {{ item.qty }}x {{ item.product.name }}
              <template v-if="item.selectedVariants.length > 0">
                ({{ item.selectedVariants.map((v) => v.option.label).join(', ') }})
              </template>
            </span>
            <span
              v-if="order.items.length > 5"
              class="text-[0.625rem] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            >
              +{{ order.items.length - 5 }} lainnya
            </span>
          </div>
          <!-- Actions for pending -->
          <div v-if="order.status === 'pending'" class="flex gap-2">
            <BaseButton variant="success" size="sm" class="flex-1" @click="acceptQrOrder(order)">
              Accept & Masukkan ke Meja
            </BaseButton>
            <BaseButton variant="danger" size="sm" @click="rejectQrOrder(order)">
              Reject
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
