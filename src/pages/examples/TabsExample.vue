<script setup lang="ts">
import { ref } from 'vue'
import { BaseTabs, TabPanel, BaseCard } from '@purdia/ui'
import { Home, User, Settings, Bell, Mail, Shield, CreditCard, FileText } from '@lucide/vue'
import type { TabItem } from '@purdia/ui'

const activeDefault = ref('home')
const activePills = ref('profile')
const activeUnderline = ref('notifications')
const activeBordered = ref('general')
const activeBottom = ref('tab1')
const activeLeft = ref('account')
const activeRight = ref('billing')
const activeFull = ref('overview')
const activeIconOnly = ref('home')
const activeDisabled = ref('active')
const activeCardHead = ref('details')
const activeCardBody = ref('info')
const activeSm = ref('one')
const activeLg = ref('one')

const basicTabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const notifTabs: TabItem[] = [
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'messages', label: 'Messages', icon: Mail },
  { key: 'security', label: 'Security', icon: Shield },
]

const borderedTabs: TabItem[] = [
  { key: 'general', label: 'General' },
  { key: 'advanced', label: 'Advanced' },
  { key: 'integrations', label: 'Integrations' },
]

const bottomTabs: TabItem[] = [
  { key: 'tab1', label: 'Overview' },
  { key: 'tab2', label: 'Activity' },
  { key: 'tab3', label: 'Stats' },
]

const verticalTabs: TabItem[] = [
  { key: 'account', label: 'Account', icon: User },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'notifications', label: 'Notifications', icon: Bell },
]

const rightTabs: TabItem[] = [
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'invoices', label: 'Invoices', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const fullWidthTabs: TabItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'reports', label: 'Reports' },
  { key: 'export', label: 'Export' },
]

const disabledTabs: TabItem[] = [
  { key: 'active', label: 'Active Tab' },
  { key: 'disabled', label: 'Disabled', disabled: true },
  { key: 'another', label: 'Another Tab' },
]

const cardHeadTabs: TabItem[] = [
  { key: 'details', label: 'Details' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'faq', label: 'FAQ' },
]

const cardBodyTabs: TabItem[] = [
  { key: 'info', label: 'Info', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'users', label: 'Users', icon: User },
]

const sizeTabs: TabItem[] = [
  { key: 'one', label: 'Tab One' },
  { key: 'two', label: 'Tab Two' },
  { key: 'three', label: 'Tab Three' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Tabs</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Tab component dengan berbagai variant, placement, size, dan kombinasi layout.
      </p>
    </div>

    <!-- Default -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Default (top, underline border)</h4></template>
      <BaseTabs v-model="activeDefault" :tabs="basicTabs" variant="default">
        <TabPanel name="home">
          <p class="text-sm text-gray-600">
            Welcome to the Home tab. This is the default variant with a bottom border indicator.
          </p>
        </TabPanel>
        <TabPanel name="profile">
          <p class="text-sm text-gray-600">
            This is the Profile tab content. Manage your personal details here.
          </p>
        </TabPanel>
        <TabPanel name="settings">
          <p class="text-sm text-gray-600">Settings tab. Configure your preferences and options.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Pills -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Pills</h4></template>
      <BaseTabs v-model="activePills" :tabs="basicTabs" variant="pills">
        <TabPanel name="home">
          <p class="text-sm text-gray-600">
            Home content — pills variant uses rounded filled background for active state.
          </p>
        </TabPanel>
        <TabPanel name="profile">
          <p class="text-sm text-gray-600">Profile content with pills navigation style.</p>
        </TabPanel>
        <TabPanel name="settings">
          <p class="text-sm text-gray-600">Settings content with pills.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Underline -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Underline (minimal)</h4></template>
      <BaseTabs v-model="activeUnderline" :tabs="notifTabs" variant="underline">
        <TabPanel name="notifications">
          <p class="text-sm text-gray-600">
            You have 3 unread notifications. Underline variant — no surrounding border, just a
            bottom line.
          </p>
        </TabPanel>
        <TabPanel name="messages">
          <p class="text-sm text-gray-600">2 new messages in your inbox.</p>
        </TabPanel>
        <TabPanel name="security">
          <p class="text-sm text-gray-600">Your security settings are up to date.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Bordered -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Bordered (classic tab look)</h4></template>
      <BaseTabs v-model="activeBordered" :tabs="borderedTabs" variant="bordered">
        <TabPanel name="general">
          <p class="text-sm text-gray-600">
            General settings — bordered variant gives a classic browser-tab appearance.
          </p>
        </TabPanel>
        <TabPanel name="advanced">
          <p class="text-sm text-gray-600">Advanced configuration options.</p>
        </TabPanel>
        <TabPanel name="integrations">
          <p class="text-sm text-gray-600">Connect third-party integrations here.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Bottom placement -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Placement: Bottom</h4></template>
      <BaseTabs v-model="activeBottom" :tabs="bottomTabs" variant="default" placement="bottom">
        <TabPanel name="tab1">
          <p class="text-sm text-gray-600 mb-4">Overview content — tab navigation at the bottom.</p>
        </TabPanel>
        <TabPanel name="tab2">
          <p class="text-sm text-gray-600 mb-4">Activity log content.</p>
        </TabPanel>
        <TabPanel name="tab3">
          <p class="text-sm text-gray-600 mb-4">Statistics content area.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Left placement -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Placement: Left (vertical)</h4></template>
      <BaseTabs v-model="activeLeft" :tabs="verticalTabs" variant="default" placement="left">
        <TabPanel name="account">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Account Settings</h5>
            <p class="text-sm text-gray-600">
              Manage your account details, name, and email address.
            </p>
          </div>
        </TabPanel>
        <TabPanel name="security">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Security</h5>
            <p class="text-sm text-gray-600">Update password, 2FA, and login sessions.</p>
          </div>
        </TabPanel>
        <TabPanel name="billing">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Billing</h5>
            <p class="text-sm text-gray-600">Manage payment methods and subscription plans.</p>
          </div>
        </TabPanel>
        <TabPanel name="notifications">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Notifications</h5>
            <p class="text-sm text-gray-600">Choose which notifications you want to receive.</p>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Right placement -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Placement: Right (vertical)</h4></template>
      <BaseTabs v-model="activeRight" :tabs="rightTabs" variant="pills" placement="right">
        <TabPanel name="billing">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Billing Overview</h5>
            <p class="text-sm text-gray-600">
              Current plan: Pro ($29/month). Next billing date: Aug 1, 2025.
            </p>
          </div>
        </TabPanel>
        <TabPanel name="invoices">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Invoices</h5>
            <p class="text-sm text-gray-600">Download previous invoices and receipts.</p>
          </div>
        </TabPanel>
        <TabPanel name="settings">
          <div class="space-y-2">
            <h5 class="font-medium text-gray-900">Payment Settings</h5>
            <p class="text-sm text-gray-600">Update your payment method or billing address.</p>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Full Width -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Full Width</h4></template>
      <BaseTabs v-model="activeFull" :tabs="fullWidthTabs" variant="default" :full-width="true">
        <TabPanel name="overview">
          <p class="text-sm text-gray-600">
            Full width tabs — each tab expands equally to fill the container.
          </p>
        </TabPanel>
        <TabPanel name="analytics">
          <p class="text-sm text-gray-600">Analytics tab content.</p>
        </TabPanel>
        <TabPanel name="reports">
          <p class="text-sm text-gray-600">Reports tab content.</p>
        </TabPanel>
        <TabPanel name="export">
          <p class="text-sm text-gray-600">Export data from here.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-2">Small</p>
          <BaseTabs v-model="activeSm" :tabs="sizeTabs" variant="pills" size="sm">
            <TabPanel name="one"
              ><p class="text-sm text-gray-600">Small size tab content.</p></TabPanel
            >
            <TabPanel name="two"><p class="text-sm text-gray-600">Tab two.</p></TabPanel>
            <TabPanel name="three"><p class="text-sm text-gray-600">Tab three.</p></TabPanel>
          </BaseTabs>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Large</p>
          <BaseTabs v-model="activeLg" :tabs="sizeTabs" variant="pills" size="lg">
            <TabPanel name="one"
              ><p class="text-sm text-gray-600">Large size tab content.</p></TabPanel
            >
            <TabPanel name="two"><p class="text-sm text-gray-600">Tab two.</p></TabPanel>
            <TabPanel name="three"><p class="text-sm text-gray-600">Tab three.</p></TabPanel>
          </BaseTabs>
        </div>
      </div>
    </BaseCard>

    <!-- Disabled -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled Tab</h4></template>
      <BaseTabs v-model="activeDisabled" :tabs="disabledTabs" variant="default">
        <TabPanel name="active">
          <p class="text-sm text-gray-600">
            This tab is active. The "Disabled" tab cannot be selected.
          </p>
        </TabPanel>
        <TabPanel name="another">
          <p class="text-sm text-gray-600">Another available tab.</p>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Tab in Card Header -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Tab as Card Header</h4></template>
      <p class="text-sm text-gray-500 mb-4">Tabs langsung di header card sebagai navigasi utama.</p>
      <div class="border border-gray-200 rounded-xl overflow-hidden">
        <div class="px-4 pt-3 bg-gray-50 border-b border-gray-200">
          <BaseTabs v-model="activeCardHead" :tabs="cardHeadTabs" variant="underline" size="sm">
            <template />
          </BaseTabs>
        </div>
        <div class="p-4">
          <div v-if="activeCardHead === 'details'">
            <h5 class="font-medium text-gray-900 mb-1">Product Details</h5>
            <p class="text-sm text-gray-600">
              Complete product information and specifications are displayed here.
            </p>
          </div>
          <div v-else-if="activeCardHead === 'reviews'">
            <h5 class="font-medium text-gray-900 mb-1">Customer Reviews</h5>
            <p class="text-sm text-gray-600">4.8 out of 5 stars based on 128 reviews.</p>
          </div>
          <div v-else>
            <h5 class="font-medium text-gray-900 mb-1">Frequently Asked Questions</h5>
            <p class="text-sm text-gray-600">Common questions about this product.</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Tab inside Card Body -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Tab inside Card Body</h4></template>
      <BaseTabs v-model="activeCardBody" :tabs="cardBodyTabs" variant="pills" size="sm">
        <TabPanel name="info">
          <div class="bg-gray-50 rounded-lg p-4">
            <h5 class="font-medium text-sm text-gray-900 mb-2">Information</h5>
            <p class="text-sm text-gray-600">
              This demonstrates tabs rendered inside a card body. Useful for switching between
              different content sections within the same card.
            </p>
          </div>
        </TabPanel>
        <TabPanel name="settings">
          <div class="bg-gray-50 rounded-lg p-4">
            <h5 class="font-medium text-sm text-gray-900 mb-2">Settings</h5>
            <p class="text-sm text-gray-600">Configuration options displayed within the card.</p>
          </div>
        </TabPanel>
        <TabPanel name="users">
          <div class="bg-gray-50 rounded-lg p-4">
            <h5 class="font-medium text-sm text-gray-900 mb-2">Users</h5>
            <p class="text-sm text-gray-600">User list content within the tab panel.</p>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseTabs, TabPanel } from '@purdia/ui'
import type { TabItem } from '@purdia/ui'

const active = ref('home')

const tabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'disabled', label: 'Disabled', disabled: true },
]
&lt;/script&gt;

&lt;template&gt;
  &lt;BaseTabs
    v-model="active"
    :tabs="tabs"
    variant="pills"
    placement="left"
    size="md"
    :full-width="false"
  &gt;
    &lt;TabPanel name="home"&gt;Home content&lt;/TabPanel&gt;
    &lt;TabPanel name="profile"&gt;Profile content&lt;/TabPanel&gt;
  &lt;/BaseTabs&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>

    <!-- Props -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Default</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">modelValue</code>
              </td>
              <td class="py-2 pr-4">string</td>
              <td class="py-2 pr-4">first tab key</td>
              <td class="py-2">Active tab key</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">tabs</code>
              </td>
              <td class="py-2 pr-4">TabItem[]</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Tab definitions</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">'default' | 'pills' | 'underline' | 'bordered'</td>
              <td class="py-2 pr-4">'default'</td>
              <td class="py-2">Visual style</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">placement</code>
              </td>
              <td class="py-2 pr-4">'top' | 'bottom' | 'left' | 'right'</td>
              <td class="py-2 pr-4">'top'</td>
              <td class="py-2">Tab position</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">size</code>
              </td>
              <td class="py-2 pr-4">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4">'md'</td>
              <td class="py-2">Tab button size</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">fullWidth</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Stretch tabs to fill width</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
