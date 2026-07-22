<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseCard,
  BaseButton,
  BaseBadge,
  BaseAvatar,
  DropdownButton,
  BaseTabs,
  TabPanel,
} from '@purdia/ui'
import {
  Plus,
  MoreHorizontal,
  Download,
  Filter,
  RefreshCw,
  Settings,
  Edit,
  Trash2,
  Search,
  Bell,
  Star,
  ArrowRight,
  TrendingUp,
  ExternalLink,
} from '@lucide/vue'
import type { DropdownItem } from '@purdia/ui'
import type { TabItem } from '@purdia/ui'

const cardActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

const activeTab = ref('overview')
const tabs: TabItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'details', label: 'Details' },
  { key: 'activity', label: 'Activity' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Card</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Container component dengan header, body, dan footer slots. Banyak variasi header layout.
      </p>
    </div>

    <!-- Variants -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseCard variant="default">
          <template #header><h5 class="font-semibold">Default</h5></template>
          Border + subtle shadow. General purpose.
          <template #footer><span class="text-xs text-gray-500">Footer slot</span></template>
        </BaseCard>
        <BaseCard variant="bordered">
          <template #header><h5 class="font-semibold">Bordered</h5></template>
          Only border, no shadow.
        </BaseCard>
        <BaseCard variant="elevated">
          <template #header><h5 class="font-semibold">Elevated</h5></template>
          Larger shadow, no border.
        </BaseCard>
        <BaseCard variant="flat">
          <template #header><h5 class="font-semibold">Flat</h5></template>
          Gray background, minimal.
        </BaseCard>
      </div>
    </BaseCard>

    <!-- HEADER VARIATIONS -->
    <h2 class="text-lg font-bold text-gray-900 pt-4">Header Variations</h2>

    <!-- Simple Title -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Simple Title</h4></template>
      <p class="text-sm text-gray-600">Basic card with just a title in the header.</p>
    </BaseCard>

    <!-- Title + Subtitle -->
    <BaseCard>
      <template #header>
        <div>
          <h4 class="font-semibold">Title with Subtitle</h4>
          <p class="text-xs text-gray-500 mt-0.5">
            Supporting text that describes the card content
          </p>
        </div>
      </template>
      <p class="text-sm text-gray-600">Header with title and a secondary description line.</p>
    </BaseCard>

    <!-- Title + Badge -->
    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <h4 class="font-semibold">Orders</h4>
          <BaseBadge variant="success" size="sm" :dot="true">Live</BaseBadge>
          <BaseBadge variant="primary" size="sm">24 new</BaseBadge>
        </div>
      </template>
      <p class="text-sm text-gray-600">
        Header with badges next to the title for status or counts.
      </p>
    </BaseCard>

    <!-- Title + Single Button -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Team Members</h4>
          <BaseButton size="sm" :icon="Plus">Add Member</BaseButton>
        </div>
      </template>
      <p class="text-sm text-gray-600">Header with an action button on the right side.</p>
    </BaseCard>

    <!-- Title + Multiple Buttons -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Reports</h4>
          <div class="flex items-center gap-2">
            <BaseButton variant="outline" size="sm" :icon="Filter">Filter</BaseButton>
            <BaseButton variant="outline" size="sm" :icon="Download">Export</BaseButton>
            <BaseButton size="sm" :icon="Plus">New Report</BaseButton>
          </div>
        </div>
      </template>
      <p class="text-sm text-gray-600">Header with multiple action buttons grouped on the right.</p>
    </BaseCard>

    <!-- Title + Dropdown -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Project Settings</h4>
          <DropdownButton
            :items="cardActions"
            variant="ghost"
            size="sm"
            :icon="MoreHorizontal"
            align="right"
          />
        </div>
      </template>
      <p class="text-sm text-gray-600">Header with a dropdown menu (more actions) button.</p>
    </BaseCard>

    <!-- Title + Search -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full gap-4">
          <h4 class="font-semibold shrink-0">Transactions</h4>
          <div
            class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 max-w-xs flex-1"
          >
            <Search class="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search transactions..."
              class="border-none outline-none bg-transparent text-sm flex-1 placeholder:text-gray-400"
            />
          </div>
        </div>
      </template>
      <p class="text-sm text-gray-600">Header with an inline search field.</p>
    </BaseCard>

    <!-- Title + Icon -->
    <BaseCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500"
          >
            <Bell class="w-5 h-5" />
          </div>
          <div>
            <h4 class="font-semibold">Notifications</h4>
            <p class="text-xs text-gray-500">3 unread messages</p>
          </div>
        </div>
      </template>
      <p class="text-sm text-gray-600">Header with an icon box and title/subtitle stack.</p>
    </BaseCard>

    <!-- Title + Avatar -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <BaseAvatar name="Sarah Johnson" size="sm" />
            <div>
              <h4 class="font-semibold text-sm">Sarah Johnson</h4>
              <p class="text-xs text-gray-500">Product Designer</p>
            </div>
          </div>
          <BaseButton variant="outline" size="sm">Follow</BaseButton>
        </div>
      </template>
      <p class="text-sm text-gray-600">
        Header with avatar, user info, and an action button. Great for profile or user cards.
      </p>
    </BaseCard>

    <!-- Title + Tabs -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Analytics</h4>
          <div class="flex gap-1">
            <button class="px-3 py-1 text-xs font-medium rounded-md bg-primary-500 text-white">
              Day
            </button>
            <button
              class="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:bg-gray-100"
            >
              Week
            </button>
            <button
              class="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:bg-gray-100"
            >
              Month
            </button>
          </div>
        </div>
      </template>
      <p class="text-sm text-gray-600">
        Header with a segmented/pill toggle for filtering or period selection.
      </p>
    </BaseCard>

    <!-- Title + Stat/KPI -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div>
            <p class="text-xs text-gray-500">Total Revenue</p>
            <div class="flex items-center gap-2">
              <h3 class="text-xl font-bold text-gray-900">$45,231</h3>
              <span class="text-xs font-medium text-emerald-600 flex items-center gap-0.5"
                ><TrendingUp class="w-3 h-3" /> +12.5%</span
              >
            </div>
          </div>
          <BaseButton variant="ghost" size="sm" :icon="ExternalLink" />
        </div>
      </template>
      <p class="text-sm text-gray-600">
        Header as a KPI display with value, trend, and a link icon.
      </p>
    </BaseCard>

    <!-- Title + Refresh/Sync -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
            <h4 class="font-semibold">Live Feed</h4>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">Updated 2m ago</span>
            <BaseButton variant="ghost" size="sm" :icon="RefreshCw" />
          </div>
        </div>
      </template>
      <p class="text-sm text-gray-600">
        Header with live indicator, last updated timestamp, and refresh button.
      </p>
    </BaseCard>

    <!-- Full-width Tabs as Header -->
    <BaseCard :padding="false">
      <template #header>
        <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm" :full-width="true">
          <template />
        </BaseTabs>
      </template>
      <div class="p-6">
        <div v-if="activeTab === 'overview'">
          <p class="text-sm text-gray-600">
            Tabs directly in the card header, acting as the primary navigation for this card's
            content.
          </p>
        </div>
        <div v-else-if="activeTab === 'details'">
          <p class="text-sm text-gray-600">
            Details tab content. Each tab replaces the body content.
          </p>
        </div>
        <div v-else>
          <p class="text-sm text-gray-600">Activity feed would go here.</p>
        </div>
      </div>
    </BaseCard>

    <!-- Colored Header -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Colored / Accent Header</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="bg-primary-500 px-6 py-4">
            <h5 class="font-semibold text-white">Primary Header</h5>
            <p class="text-xs text-primary-100 mt-0.5">With colored background</p>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-600">Body content below the colored header.</p>
          </div>
        </div>
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="bg-gradient-to-r from-primary-500 to-violet-500 px-6 py-4">
            <h5 class="font-semibold text-white">Gradient Header</h5>
            <p class="text-xs text-white/70 mt-0.5">Eye-catching gradient</p>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-600">Gradient headers for premium/featured sections.</p>
          </div>
        </div>
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="bg-emerald-50 border-b border-emerald-100 px-6 py-4">
            <div class="flex items-center gap-2">
              <Star class="w-4 h-4 text-emerald-500" />
              <h5 class="font-semibold text-emerald-800">Success State</h5>
            </div>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-600">Subtle colored header for contextual states.</p>
          </div>
        </div>
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="border-b border-gray-100 px-6 py-4 border-l-4 border-l-amber-500">
            <h5 class="font-semibold text-gray-900">Left Accent Border</h5>
            <p class="text-xs text-gray-500 mt-0.5">Left border as color indicator</p>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-600">Accent border for visual categorization.</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Image Header -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Image / Media Header</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="h-32 bg-gradient-to-br from-primary-400 via-violet-400 to-pink-400" />
          <div class="p-4">
            <h5 class="font-semibold text-sm">Gradient Cover</h5>
            <p class="text-xs text-gray-500 mt-1">Image or gradient as card header visual.</p>
          </div>
        </div>
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div
            class="h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center"
          >
            <span class="text-4xl">🎨</span>
          </div>
          <div class="p-4">
            <h5 class="font-semibold text-sm">Icon Cover</h5>
            <p class="text-xs text-gray-500 mt-1">Large icon or emoji as visual header.</p>
          </div>
        </div>
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="h-32 bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
            [Image placeholder]
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <h5 class="font-semibold text-sm">Photo Card</h5>
              <BaseBadge variant="primary" size="sm">New</BaseBadge>
            </div>
            <p class="text-xs text-gray-500 mt-1">For blog posts, products, or media cards.</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Hoverable -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Hoverable</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseCard variant="default" :hoverable="true">
          <p class="text-sm text-gray-600">Hover me! Card lifts and shadow increases.</p>
        </BaseCard>
        <BaseCard variant="bordered" :hoverable="true">
          <p class="text-sm text-gray-600">Good for clickable navigation tiles.</p>
        </BaseCard>
        <BaseCard variant="elevated" :hoverable="true">
          <p class="text-sm text-gray-600">Elevated + hoverable = premium.</p>
        </BaseCard>
      </div>
    </BaseCard>

    <!-- No Padding -->
    <BaseCard>
      <template #header><h4 class="font-semibold">No Padding</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseCard variant="bordered" :padding="false">
          <div
            class="h-32 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold"
          >
            Full bleed (no padding)
          </div>
        </BaseCard>
        <BaseCard variant="bordered">
          <div
            class="h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold"
          >
            With padding (default)
          </div>
        </BaseCard>
      </div>
    </BaseCard>

    <!-- Footer Variations -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Footer Variations</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseCard variant="bordered">
          <template #header><h5 class="font-semibold text-sm">Actions Right</h5></template>
          <p class="text-sm text-gray-600">Footer with buttons aligned to the right.</p>
          <template #footer>
            <div class="flex gap-2 justify-end w-full">
              <BaseButton variant="ghost" size="sm">Cancel</BaseButton>
              <BaseButton size="sm">Save</BaseButton>
            </div>
          </template>
        </BaseCard>
        <BaseCard variant="bordered">
          <template #header><h5 class="font-semibold text-sm">Actions Spread</h5></template>
          <p class="text-sm text-gray-600">Footer with buttons on both sides.</p>
          <template #footer>
            <div class="flex justify-between items-center w-full">
              <BaseButton variant="danger" size="sm" :icon="Trash2">Delete</BaseButton>
              <div class="flex gap-2">
                <BaseButton variant="ghost" size="sm">Cancel</BaseButton>
                <BaseButton size="sm">Update</BaseButton>
              </div>
            </div>
          </template>
        </BaseCard>
        <BaseCard variant="bordered">
          <template #header><h5 class="font-semibold text-sm">Footer Link</h5></template>
          <p class="text-sm text-gray-600">Footer as a "view more" link area.</p>
          <template #footer>
            <div
              class="flex items-center justify-center w-full gap-1 text-primary-600 text-sm font-medium cursor-pointer hover:text-primary-700"
            >
              View All <ArrowRight class="w-4 h-4" />
            </div>
          </template>
        </BaseCard>
        <BaseCard variant="bordered">
          <template #header><h5 class="font-semibold text-sm">Footer Info</h5></template>
          <p class="text-sm text-gray-600">Footer with metadata like timestamp.</p>
          <template #footer>
            <div class="flex items-center justify-between w-full text-xs text-gray-400">
              <span>Last updated: 2 hours ago</span>
              <span>ID: #12345</span>
            </div>
          </template>
        </BaseCard>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Title + Button --&gt;
&lt;BaseCard&gt;
  &lt;template #header&gt;
    &lt;div class="flex items-center justify-between w-full"&gt;
      &lt;h4 class="font-semibold"&gt;Title&lt;/h4&gt;
      &lt;BaseButton size="sm" :icon="Plus"&gt;Add&lt;/BaseButton&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;p&gt;Content&lt;/p&gt;
&lt;/BaseCard&gt;

&lt;!-- Title + Dropdown --&gt;
&lt;BaseCard&gt;
  &lt;template #header&gt;
    &lt;div class="flex items-center justify-between w-full"&gt;
      &lt;h4&gt;Title&lt;/h4&gt;
      &lt;DropdownButton :items="actions" variant="ghost" :icon="MoreHorizontal" /&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/BaseCard&gt;

&lt;!-- Colored Header --&gt;
&lt;div class="border rounded-xl overflow-hidden"&gt;
  &lt;div class="bg-primary-500 px-6 py-4"&gt;
    &lt;h5 class="text-white font-semibold"&gt;Colored&lt;/h5&gt;
  &lt;/div&gt;
  &lt;div class="p-6"&gt;Body&lt;/div&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
