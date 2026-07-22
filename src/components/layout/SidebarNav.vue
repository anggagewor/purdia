<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Component,
  BarChart3,
  FileText,
  Settings,
  Users,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  RectangleHorizontal,
  CreditCard,
  Tag,
  TextCursorInput,
  ListFilter,
  ToggleLeft,
  CircleUser,
  Table,
  Layers,
  AlertCircle,
  Activity,
  Gauge,
  Bone,
  Shield,
  Key,
  Contact,
  Kanban,
  Calendar,
  Store,
  Monitor,
  Package,
  MapPin,
  Wrench,
  UsersRound,
  Wallet,
  ReceiptText,
  BadgePercent,
  BookOpen,
  Landmark,
  ScrollText,
  BookText,
  FileSpreadsheet,
  Calculator,
  Receipt,
  FilePlus,
  Clock,
  AlertOctagon,
  Upload,
  FormInput,
  PanelTop,
  Navigation,
  Puzzle,
  Handshake,
  Target,
  Building,
  CircleUserRound,
  ActivitySquare,
  BellRing,
  ListTodo,
  FileCheck,
  BarChart2,
  UserCog,
  Building2 as Building2Icon,
  Briefcase,
  ClipboardCheck,
  CalendarDays,
  DollarSign,
  UserPlus,
  Star,
  GraduationCap,
  Laptop,
  FolderOpen,
  Receipt as ReceiptIcon,
  Megaphone,
  CheckCircle,
  CircleDot,
  Loader,
  PanelRight,
  MessageSquare,
  MousePointerClick,
  Hash,
  Sliders,
  Palette,
  GitBranch,
  Command,
  Bell,
  MoreHorizontal,
  Minus,
} from '@lucide/vue'
import type { Component as VueComponent } from 'vue'

interface MenuChild {
  icon: VueComponent
  label: string
  to: string
}

interface MenuCategory {
  icon: VueComponent
  label: string
  children: MenuChild[]
}

interface MenuItem {
  icon: VueComponent
  label: string
  to?: string
  children?: MenuChild[]
  categories?: MenuCategory[]
}

interface Props {
  collapsed: boolean
}

defineProps<Props>()

const route = useRoute()

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  {
    icon: Component,
    label: 'Components',
    categories: [
      {
        icon: FormInput,
        label: 'Form',
        children: [
          { icon: TextCursorInput, label: 'Input', to: '/examples/input' },
          { icon: ListFilter, label: 'Select', to: '/examples/select' },
          { icon: ToggleLeft, label: 'Toggle', to: '/examples/toggle' },
          { icon: Calendar, label: 'Date Picker', to: '/examples/datepicker' },
          { icon: Upload, label: 'File Upload', to: '/examples/file-upload' },
          { icon: FileText, label: 'Editor', to: '/examples/editor' },
          { icon: FileText, label: 'Textarea', to: '/examples/textarea' },
          { icon: CheckCircle, label: 'Checkbox', to: '/examples/checkbox' },
          { icon: CircleDot, label: 'Radio', to: '/examples/radio' },
          { icon: Minus, label: 'Number Input', to: '/examples/number-input' },
          { icon: Sliders, label: 'Slider', to: '/examples/slider' },
          { icon: Star, label: 'Rating', to: '/examples/rating' },
          { icon: Palette, label: 'Color Picker', to: '/examples/color-picker' },
        ],
      },
      {
        icon: PanelTop,
        label: 'Display',
        children: [
          { icon: CreditCard, label: 'Card', to: '/examples/card' },
          { icon: Tag, label: 'Badge', to: '/examples/badge' },
          { icon: CircleUser, label: 'Avatar', to: '/examples/avatar' },
          { icon: Table, label: 'Table', to: '/examples/table' },
          { icon: AlertCircle, label: 'Alert', to: '/examples/alert' },
          { icon: Activity, label: 'Progress', to: '/examples/progress' },
          { icon: Gauge, label: 'Stat Card', to: '/examples/stat-card' },
          { icon: Bone, label: 'Skeleton', to: '/examples/skeleton' },
          { icon: BarChart3, label: 'Charts', to: '/examples/charts' },
          { icon: Tag, label: 'Tag', to: '/examples/tag' },
          { icon: Loader, label: 'Spinner', to: '/examples/spinner' },
          { icon: ChevronDown, label: 'Accordion', to: '/examples/accordion' },
          { icon: Activity, label: 'Timeline', to: '/examples/timeline' },
          { icon: Hash, label: 'Steps', to: '/examples/steps' },
          { icon: AlertCircle, label: 'Empty State', to: '/examples/empty-state' },
          { icon: ChevronRight, label: 'Divider', to: '/examples/divider' },
          { icon: Key, label: 'Kbd', to: '/examples/kbd' },
          { icon: CircleUser, label: 'Avatar Group', to: '/examples/avatar-group' },
          { icon: Bell, label: 'Notifications', to: '/examples/notification-list' },
        ],
      },
      {
        icon: Navigation,
        label: 'Navigation',
        children: [
          { icon: RectangleHorizontal, label: 'Button', to: '/examples/button' },
          { icon: Layers, label: 'Tabs', to: '/examples/tabs' },
          { icon: ChevronRight, label: 'Pagination', to: '/examples/pagination' },
          { icon: ChevronRight, label: 'Breadcrumb', to: '/examples/breadcrumb' },
        ],
      },
      {
        icon: Puzzle,
        label: 'Layout',
        children: [
          { icon: Layers, label: 'Modal', to: '/examples/modal' },
          { icon: LayoutDashboard, label: 'Grid', to: '/examples/grid' },
          { icon: PanelRight, label: 'Drawer', to: '/examples/drawer' },
          { icon: MessageSquare, label: 'Tooltip', to: '/examples/tooltip' },
          { icon: MousePointerClick, label: 'Popover', to: '/examples/popover' },
          { icon: GitBranch, label: 'Tree View', to: '/examples/tree-view' },
          { icon: CalendarDays, label: 'Calendar', to: '/examples/calendar' },
          { icon: Command, label: 'Command Palette', to: '/examples/command-palette' },
          { icon: MoreHorizontal, label: 'Context Menu', to: '/examples/context-menu' },
        ],
      },
    ],
  },
  { icon: BarChart3, label: 'Analytics', to: '/analytics' },
  { icon: Contact, label: 'Clients', to: '/clients' },
  {
    icon: Handshake,
    label: 'CRM',
    children: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/crm' },
      { icon: Target, label: 'Leads', to: '/crm/leads' },
      { icon: Building, label: 'Companies', to: '/crm/companies' },
      { icon: CircleUserRound, label: 'Contacts', to: '/crm/contacts' },
      { icon: Handshake, label: 'Deals', to: '/crm/deals' },
      { icon: ActivitySquare, label: 'Activities', to: '/crm/activities' },
      { icon: BellRing, label: 'Follow Ups', to: '/crm/follow-ups' },
      { icon: ListTodo, label: 'Tasks', to: '/crm/tasks' },
      { icon: FileCheck, label: 'Quotations', to: '/crm/quotations' },
      { icon: Calendar, label: 'Calendar', to: '/crm/calendar' },
      { icon: BarChart2, label: 'Reports', to: '/crm/reports' },
    ],
  },
  {
    icon: UserCog,
    label: 'HRM',
    children: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/hrm' },
      { icon: Users, label: 'Employees', to: '/hrm/employees' },
      { icon: Building2Icon, label: 'Departments', to: '/hrm/departments' },
      { icon: Briefcase, label: 'Positions', to: '/hrm/positions' },
      { icon: ClipboardCheck, label: 'Attendance', to: '/hrm/attendance' },
      { icon: CalendarDays, label: 'Leave', to: '/hrm/leave' },
      { icon: DollarSign, label: 'Payroll', to: '/hrm/payroll' },
      { icon: UserPlus, label: 'Recruitment', to: '/hrm/recruitment' },
      { icon: Star, label: 'Performance', to: '/hrm/performance' },
      { icon: GraduationCap, label: 'Training', to: '/hrm/training' },
      { icon: Laptop, label: 'Assets', to: '/hrm/assets' },
      { icon: FolderOpen, label: 'Documents', to: '/hrm/documents' },
      { icon: ReceiptIcon, label: 'Expenses', to: '/hrm/expenses' },
      { icon: Megaphone, label: 'Announcements', to: '/hrm/announcements' },
      { icon: Calendar, label: 'Calendar', to: '/hrm/calendar' },
      { icon: BarChart2, label: 'Reports', to: '/hrm/reports' },
    ],
  },
  {
    icon: Receipt,
    label: 'Invoices',
    children: [
      { icon: Receipt, label: 'All Invoices', to: '/invoices' },
      { icon: Clock, label: 'Unpaid', to: '/invoices/unpaid' },
      { icon: AlertOctagon, label: 'Overdue', to: '/invoices/overdue' },
      { icon: FilePlus, label: 'Create Invoice', to: '/invoices/create' },
    ],
  },
  { icon: Kanban, label: 'Projects', to: '/projects' },
  {
    icon: Users,
    label: 'User Management',
    children: [
      { icon: Users, label: 'Users', to: '/users' },
      { icon: Shield, label: 'Roles', to: '/users/roles' },
      { icon: Key, label: 'Permissions', to: '/users/permissions' },
    ],
  },
  {
    icon: Package,
    label: 'Inventory',
    children: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/inventory' },
      { icon: Package, label: 'Products', to: '/inventory/products' },
      { icon: MapPin, label: 'Warehouses', to: '/inventory/warehouses' },
      { icon: Activity, label: 'Stock Movements', to: '/inventory/movements' },
      { icon: ShoppingCart, label: 'Purchases', to: '/inventory/purchases' },
      { icon: Tag, label: 'Barcodes', to: '/inventory/barcodes' },
      { icon: Wrench, label: 'Maintenance', to: '/inventory/maintenance' },
      { icon: Shield, label: 'Quality Control', to: '/inventory/quality' },
    ],
  },
  { icon: ShoppingCart, label: 'Orders', to: '/orders' },
  {
    icon: Store,
    label: 'Point of Sales',
    children: [
      { icon: LayoutDashboard, label: 'POS Dashboard', to: '/pos' },
      { icon: Monitor, label: 'POS Terminal', to: '/pos/terminal' },
      { icon: Package, label: 'Stock', to: '/pos/stock' },
      { icon: UsersRound, label: 'Customers', to: '/pos/customers' },
      { icon: Wallet, label: 'Cash Drawer', to: '/pos/cash-drawer' },
      { icon: BadgePercent, label: 'Discounts', to: '/pos/discounts' },
      { icon: ReceiptText, label: 'Reports', to: '/pos/reports' },
    ],
  },
  { icon: FileText, label: 'Reports', to: '/reports' },
  {
    icon: BookOpen,
    label: 'Accounting',
    children: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/accounting' },
      { icon: Landmark, label: 'Chart of Accounts', to: '/accounting/coa' },
      { icon: ScrollText, label: 'Journal Entries', to: '/accounting/journals' },
      { icon: BookText, label: 'General Ledger', to: '/accounting/ledger' },
      { icon: FileSpreadsheet, label: 'Financial Statements', to: '/accounting/statements' },
      { icon: Calculator, label: 'Tax', to: '/accounting/tax' },
    ],
  },
  { icon: Settings, label: 'Settings', to: '/settings' },
]

const openMenus = ref<Set<string>>(new Set())
const popoverMenu = ref<string | null>(null)
const popoverTop = ref(0)
const popoverLeft = ref(0)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

// Auto-open parent menus based on current route
function getOpenMenusForRoute(path: string): Set<string> {
  const set = new Set<string>()
  for (const item of menuItems) {
    if (item.children && item.children.some((child) => path === child.to)) {
      set.add(item.label)
    }
    if (item.categories) {
      for (const cat of item.categories) {
        if (cat.children.some((child) => path === child.to)) {
          set.add(item.label)
          set.add(`${item.label}:${cat.label}`)
        }
      }
    }
  }
  return set
}

// Set initial + watch route changes to keep menus open
openMenus.value = getOpenMenusForRoute(route.path)

watch(
  () => route.path,
  (path) => {
    const needed = getOpenMenusForRoute(path)
    for (const key of needed) {
      openMenus.value.add(key)
    }
  },
)

function toggleMenu(label: string) {
  if (openMenus.value.has(label)) {
    openMenus.value.delete(label)
  } else {
    openMenus.value.add(label)
  }
}

function showPopover(label: string, event: MouseEvent) {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  popoverTop.value = rect.top
  popoverLeft.value = rect.right + 8
  popoverMenu.value = label
}

function hidePopover() {
  hideTimeout = setTimeout(() => {
    popoverMenu.value = null
  }, 100)
}

function keepPopover() {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

function getPopoverItem(): MenuItem | undefined {
  return menuItems.find((m) => m.label === popoverMenu.value)
}

function isActive(to: string) {
  return route.path === to
}

function isParentActive(item: MenuItem) {
  if (item.children) {
    return item.children.some((child) => route.path === child.to)
  }
  if (item.categories) {
    return item.categories.some((cat) => cat.children.some((child) => route.path === child.to))
  }
  return false
}

function isCategoryActive(category: MenuCategory) {
  return category.children.some((child) => route.path === child.to)
}
</script>

<template>
  <aside
    class="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-[width] duration-200 z-50 dark:bg-gray-800 dark:border-gray-700"
    :class="collapsed ? 'w-[4.5rem]' : 'w-64'"
  >
    <div
      class="flex items-center gap-3 px-4 h-14 shrink-0 border-b border-gray-100 overflow-hidden dark:border-gray-700"
    >
      <div
        class="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
      >
        P
      </div>
      <span
        v-if="!collapsed"
        class="font-bold text-lg text-gray-900 whitespace-nowrap dark:text-gray-100"
        >Purdia</span
      >
    </div>

    <nav class="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
      <template v-for="item in menuItems" :key="item.label">
        <!-- Regular link (no children) -->
        <router-link
          v-if="!item.children && !item.categories"
          :to="item.to!"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 text-sm font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline dark:text-gray-400"
          :class="
            isActive(item.to!)
              ? 'bg-primary-50 text-primary-600 hover:bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400'
              : 'hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200'
          "
        >
          <component :is="item.icon" class="w-5 h-5 shrink-0" />
          <span v-if="!collapsed">{{ item.label }}</span>
        </router-link>

        <!-- Dropdown with categories (Components) -->
        <div v-else-if="item.categories" class="relative">
          <button
            class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer"
            :class="
              isParentActive(item)
                ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
            "
            @click="collapsed ? showPopover(item.label, $event) : toggleMenu(item.label)"
            @mouseenter="collapsed ? showPopover(item.label, $event) : undefined"
            @mouseleave="collapsed ? hidePopover() : undefined"
          >
            <component :is="item.icon" class="w-5 h-5 shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">{{ item.label }}</span>
            <ChevronDown
              v-if="!collapsed"
              class="w-4 h-4 shrink-0 transition-transform duration-200"
              :class="openMenus.has(item.label) ? 'rotate-180' : ''"
            />
          </button>

          <!-- Categories expanded (not collapsed) -->
          <div
            v-if="!collapsed"
            class="grid transition-all duration-200"
            :class="
              openMenus.has(item.label)
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            "
          >
            <div class="overflow-hidden">
              <div class="ml-4 pl-3 border-l border-gray-200 mt-1 space-y-1 dark:border-gray-700">
                <!-- Category -->
                <div v-for="category in item.categories" :key="category.label">
                  <button
                    class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer"
                    :class="
                      isCategoryActive(category)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                    "
                    @click="toggleMenu(`${item.label}:${category.label}`)"
                  >
                    <component :is="category.icon" class="w-3.5 h-3.5 shrink-0" />
                    <span class="flex-1 text-left">{{ category.label }}</span>
                    <ChevronDown
                      class="w-3 h-3 shrink-0 transition-transform duration-200"
                      :class="openMenus.has(`${item.label}:${category.label}`) ? 'rotate-180' : ''"
                    />
                  </button>

                  <!-- Category children -->
                  <div
                    class="grid transition-all duration-200"
                    :class="
                      openMenus.has(`${item.label}:${category.label}`)
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    "
                  >
                    <div class="overflow-hidden">
                      <div
                        class="ml-3 pl-2.5 border-l border-gray-100 mt-0.5 space-y-0.5 dark:border-gray-700"
                      >
                        <router-link
                          v-for="child in category.children"
                          :key="child.to"
                          :to="child.to"
                          class="flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
                          :class="
                            isActive(child.to)
                              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                          "
                        >
                          <component :is="child.icon" class="w-3 h-3 shrink-0" />
                          <span>{{ child.label }}</span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dropdown parent (has children, no categories) -->
        <div v-else class="relative">
          <button
            class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer"
            :class="
              isParentActive(item)
                ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
            "
            @click="collapsed ? showPopover(item.label, $event) : toggleMenu(item.label)"
            @mouseenter="collapsed ? showPopover(item.label, $event) : undefined"
            @mouseleave="collapsed ? hidePopover() : undefined"
          >
            <component :is="item.icon" class="w-5 h-5 shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">{{ item.label }}</span>
            <ChevronDown
              v-if="!collapsed"
              class="w-4 h-4 shrink-0 transition-transform duration-200"
              :class="openMenus.has(item.label) ? 'rotate-180' : ''"
            />
          </button>

          <!-- Submenu expanded (not collapsed) -->
          <div
            v-if="!collapsed"
            class="grid transition-all duration-200"
            :class="
              openMenus.has(item.label)
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            "
          >
            <div class="overflow-hidden">
              <div class="ml-4 pl-3 border-l border-gray-200 mt-1 space-y-0.5 dark:border-gray-700">
                <router-link
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
                  :class="
                    isActive(child.to)
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                  "
                >
                  <component :is="child.icon" class="w-3.5 h-3.5 shrink-0" />
                  <span>{{ child.label }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </nav>
  </aside>

  <!-- Popover submenu (teleported to body to escape overflow clipping) -->
  <Teleport to="body">
    <div
      v-if="collapsed && popoverMenu && getPopoverItem()"
      class="fixed z-[9999] min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 dark:bg-gray-800 dark:border-gray-700"
      :style="{ top: popoverTop + 'px', left: popoverLeft + 'px' }"
      @mouseenter="keepPopover()"
      @mouseleave="hidePopover()"
    >
      <div class="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
        <span
          class="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400"
          >{{ getPopoverItem()!.label }}</span
        >
      </div>
      <div class="py-1">
        <!-- Popover for items with categories -->
        <template v-if="getPopoverItem()!.categories">
          <div v-for="category in getPopoverItem()!.categories" :key="category.label" class="mb-1">
            <div
              class="px-3 py-1 text-[0.625rem] font-semibold text-gray-400 uppercase tracking-wider"
            >
              {{ category.label }}
            </div>
            <router-link
              v-for="child in category.children"
              :key="child.to"
              :to="child.to"
              class="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
              :class="
                isActive(child.to)
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              "
              @click="hidePopover()"
            >
              <component :is="child.icon" class="w-3.5 h-3.5 shrink-0" />
              <span>{{ child.label }}</span>
            </router-link>
          </div>
        </template>
        <!-- Popover for items with flat children -->
        <template v-else>
          <router-link
            v-for="child in getPopoverItem()!.children"
            :key="child.to"
            :to="child.to"
            class="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
            :class="
              isActive(child.to)
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
            "
            @click="hidePopover()"
          >
            <component :is="child.icon" class="w-3.5 h-3.5 shrink-0" />
            <span>{{ child.label }}</span>
          </router-link>
        </template>
      </div>
    </div>
  </Teleport>
</template>
