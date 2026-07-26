<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  usePosStore,
  productCatalog,
  tables,
  type Product,
  type OrderItem,
  type SelectedVariant,
  type ProductVariantOption,
} from '@/stores/pos'

const route = useRoute()
const posStore = usePosStore()

const tableId = computed(() => route.params.tableId as string)
const tableName = computed(() => tables.find((t) => t.id === tableId.value)?.name ?? tableId.value)

// State
const customerName = ref('')
const cart = ref<OrderItem[]>([])
const activeCategory = ref('All')
const searchQuery = ref('')
const orderSubmitted = ref(false)
const submittedOrderId = ref('')

// Variant picker
const showVariantPicker = ref(false)
const variantProduct = ref<Product | null>(null)
const variantSelections = ref<Record<string, ProductVariantOption>>({})
const itemNotes = ref('')

const categories = ['All', 'Beverages', 'Food', 'Snacks']

const filteredProducts = computed(() => {
  let list = productCatalog
  if (activeCategory.value !== 'All') {
    list = list.filter((p) => p.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(q))
  }
  return list
})

function addToCart(product: Product) {
  if (product.variants && product.variants.length > 0) {
    variantProduct.value = product
    variantSelections.value = {}
    itemNotes.value = ''
    for (const variant of product.variants) {
      if (variant.options[0]) {
        variantSelections.value[variant.name] = variant.options[0]
      }
    }
    showVariantPicker.value = true
  } else {
    addToCartDirect(product, [], '')
  }
}

function addToCartDirect(product: Product, selectedVariants: SelectedVariant[], notes: string) {
  const variantKey = selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|')
  const existing = cart.value.find((c) => {
    if (c.product.id !== product.id) return false
    return c.selectedVariants.map((v) => `${v.name}:${v.option.value}`).join('|') === variantKey
  })

  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ product, qty: 1, selectedVariants, notes: notes || undefined })
  }
}

function confirmVariant() {
  if (!variantProduct.value) return
  const product = variantProduct.value
  if (product.variants) {
    for (const variant of product.variants) {
      if (variant.required && !variantSelections.value[variant.name]) return
    }
  }
  const selected: SelectedVariant[] = Object.entries(variantSelections.value).map(
    ([name, option]) => ({ name, option }),
  )
  addToCartDirect(product, selected, itemNotes.value)
  showVariantPicker.value = false
  variantProduct.value = null
}

function selectVariantOption(variantName: string, option: ProductVariantOption) {
  variantSelections.value[variantName] = option
}

function isVariantSelected(variantName: string, option: ProductVariantOption) {
  return variantSelections.value[variantName]?.value === option.value
}

const variantExtraTotal = computed(() => {
  return Object.values(variantSelections.value).reduce((sum, opt) => sum + opt.extraPrice, 0)
})

function updateQty(idx: number, delta: number) {
  const item = cart.value[idx]
  if (!item) return
  item.qty += delta
  if (item.qty <= 0) cart.value.splice(idx, 1)
}

function removeItem(idx: number) {
  cart.value.splice(idx, 1)
}

function getItemExtra(item: OrderItem) {
  return item.selectedVariants.reduce((s, v) => s + v.option.extraPrice, 0)
}

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + (item.product.price + getItemExtra(item)) * item.qty
  }, 0)
})

const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))

function submitOrder() {
  if (cart.value.length === 0) return
  const order = posStore.submitOrder(
    tableId.value,
    [...cart.value],
    customerName.value || 'Customer',
  )
  submittedOrderId.value = order.id
  orderSubmitted.value = true
  cart.value = []
}

function orderAgain() {
  orderSubmitted.value = false
  submittedOrderId.value = ''
}

function scrollToCart() {
  document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' })
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div class="max-w-lg mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold text-gray-900">Purdia</h1>
          <p class="text-xs text-gray-500">{{ tableName }} · Self Order</p>
        </div>
        <div v-if="!orderSubmitted" class="relative">
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-full cursor-pointer"
            @click="scrollToCart"
          >
            🛒 {{ cartCount }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success state -->
    <div v-if="orderSubmitted" class="max-w-lg mx-auto px-4 py-12 text-center">
      <div
        class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <span class="text-4xl">✅</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900 mb-2">Pesanan Diterima!</h2>
      <p class="text-sm text-gray-600 mb-1">Order ID: {{ submittedOrderId }}</p>
      <p class="text-sm text-gray-500 mb-6">
        Pesananmu sedang diproses. Silakan tunggu di {{ tableName }}.
      </p>
      <button
        class="px-6 py-2.5 bg-primary-500 text-white font-medium rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
        @click="orderAgain"
      >
        Pesan Lagi
      </button>
    </div>

    <!-- Menu -->
    <div v-else class="max-w-lg mx-auto px-4 py-4 space-y-4">
      <!-- Search -->
      <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
        <span class="text-gray-400">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari menu..."
          class="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400"
        />
      </div>

      <!-- Categories -->
      <div class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors cursor-pointer"
          :class="
            activeCategory === cat
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          "
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Product grid -->
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm active:scale-[0.98] transition-transform"
        >
          <button class="w-full text-left p-3 cursor-pointer" @click="addToCart(product)">
            <div
              class="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-2"
            >
              {{
                product.category === 'Beverages' ? '☕' : product.category === 'Food' ? '🍽️' : '🍟'
              }}
            </div>
            <p class="text-sm font-medium text-gray-800 truncate">{{ product.name }}</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-sm font-bold text-primary-600">{{ formatRp(product.price) }}</span>
              <span v-if="product.variants?.length" class="text-[0.6rem] text-amber-500"
                >✦ opsi</span
              >
            </div>
          </button>
        </div>
      </div>

      <!-- Cart Section -->
      <div id="cart-section" class="pt-4">
        <div
          v-if="cart.length > 0"
          class="bg-white rounded-xl border border-gray-200 p-4 space-y-3"
        >
          <h3 class="font-semibold text-gray-900">Pesananmu</h3>

          <!-- Customer name -->
          <input
            v-model="customerName"
            type="text"
            placeholder="Nama kamu (opsional)"
            class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500"
          />

          <!-- Cart items -->
          <div class="divide-y divide-gray-100">
            <div v-for="(item, idx) in cart" :key="idx" class="py-2">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800">{{ item.product.name }}</p>
                  <p
                    v-if="item.selectedVariants.length > 0"
                    class="text-[0.65rem] text-primary-600"
                  >
                    {{ item.selectedVariants.map((v) => v.option.label).join(', ') }}
                  </p>
                  <p v-if="item.notes" class="text-[0.625rem] text-gray-400 italic">
                    📝 {{ item.notes }}
                  </p>
                </div>
                <p class="text-sm font-semibold text-gray-900 shrink-0">
                  {{ formatRp((item.product.price + getItemExtra(item)) * item.qty) }}
                </p>
              </div>
              <div class="flex items-center gap-2 mt-1.5">
                <button
                  class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer active:bg-gray-100"
                  @click="updateQty(idx, -1)"
                >
                  −
                </button>
                <span class="text-sm font-medium w-5 text-center">{{ item.qty }}</span>
                <button
                  class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer active:bg-gray-100"
                  @click="updateQty(idx, 1)"
                >
                  +
                </button>
                <button
                  class="ml-auto text-xs text-red-400 cursor-pointer"
                  @click="removeItem(idx)"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <!-- Total & submit -->
          <div class="border-t border-gray-100 pt-3 space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total</span>
              <span class="text-lg font-bold text-gray-900">{{ formatRp(subtotal) }}</span>
            </div>
            <button
              class="w-full py-3 bg-primary-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-primary-600 active:scale-[0.98] transition-all"
              @click="submitOrder"
            >
              Kirim Pesanan ({{ cartCount }} item)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Variant Picker (bottom sheet style) -->
    <Teleport to="body">
      <Transition name="sheet">
        <div
          v-if="showVariantPicker"
          class="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          @click.self="showVariantPicker = false"
        >
          <div class="bg-white rounded-t-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <!-- Sheet header -->
            <div
              class="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0"
            >
              <h3 class="font-semibold text-gray-900">{{ variantProduct?.name }}</h3>
              <button
                class="text-gray-400 text-xl cursor-pointer"
                @click="showVariantPicker = false"
              >
                &times;
              </button>
            </div>

            <!-- Sheet content -->
            <div class="px-4 py-4 overflow-y-auto flex-1 space-y-4">
              <!-- Price -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Harga</span>
                <span class="font-bold text-gray-900">
                  {{ formatRp((variantProduct?.price ?? 0) + variantExtraTotal) }}
                </span>
              </div>

              <!-- Variants -->
              <div
                v-for="variant in variantProduct?.variants"
                :key="variant.name"
                class="space-y-2"
              >
                <div class="flex items-center gap-2">
                  <p class="text-sm font-medium text-gray-700">{{ variant.name }}</p>
                  <span
                    v-if="variant.required"
                    class="text-[0.6rem] px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full font-medium"
                    >Wajib</span
                  >
                </div>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in variant.options"
                    :key="option.value"
                    class="px-3 py-1.5 text-sm rounded-lg border transition-all cursor-pointer"
                    :class="
                      isVariantSelected(variant.name, option)
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 text-gray-600 active:bg-gray-50'
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

              <!-- Notes -->
              <div>
                <p class="text-sm font-medium text-gray-700 mb-1">Catatan</p>
                <input
                  v-model="itemNotes"
                  type="text"
                  placeholder="Contoh: kurang manis, tanpa es"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <!-- Sheet footer -->
            <div class="px-4 py-3 border-t border-gray-100 shrink-0">
              <button
                class="w-full py-2.5 bg-primary-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-primary-600 active:scale-[0.98] transition-all"
                @click="confirmVariant"
              >
                Tambah — {{ formatRp((variantProduct?.price ?? 0) + variantExtraTotal) }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 200ms ease;
}
.sheet-enter-active > div,
.sheet-leave-active > div {
  transition: transform 200ms ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from > div,
.sheet-leave-to > div {
  transform: translateY(100%);
}
</style>
