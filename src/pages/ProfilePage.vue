<script setup lang="ts">
import { ref } from 'vue'
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  Mail,
  Camera,
  Edit3,
  Shield,
  Bell,
  Key,
  Smartphone,
  Globe,
  Eye,
  EyeOff,
  Activity,
  FileText,
  MessageSquare,
  Heart,
  GitBranch,
  Check,
} from '@lucide/vue'
import { BaseAvatar, BaseButton, BaseCard, BaseInput, BaseBadge, BaseTabs, BaseCheckbox } from '@purdia/ui'

const activeTab = ref('activity')

const tabs = [
  { key: 'activity', label: 'Activity' },
  { key: 'settings', label: 'Settings' },
  { key: 'security', label: 'Security' },
]

// Profile data
const profile = ref({
  name: 'Angga Setiawan',
  username: '@anggagewor',
  email: 'angga@purdia.dev',
  bio: 'Full-stack developer passionate about Vue.js, TypeScript, and building beautiful user interfaces. Creator of Purdia.',
  location: 'Jakarta, Indonesia',
  website: 'https://purdia.dev',
  joinDate: 'January 2024',
  followers: 1240,
  following: 385,
  projects: 42,
})

// Settings form
const settings = ref({
  displayName: 'Angga Setiawan',
  email: 'angga@purdia.dev',
  bio: 'Full-stack developer passionate about Vue.js, TypeScript, and building beautiful user interfaces.',
  location: 'Jakarta, Indonesia',
  website: 'https://purdia.dev',
  language: 'English',
  timezone: 'Asia/Jakarta (GMT+7)',
})

// Security
const showPassword = ref(false)
const securityForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const twoFactorEnabled = ref(true)

const sessions = [
  { device: 'Chrome on macOS', location: 'Jakarta, ID', time: 'Active now', current: true },
  { device: 'Safari on iPhone', location: 'Jakarta, ID', time: '2 hours ago', current: false },
  { device: 'Firefox on Windows', location: 'Bandung, ID', time: '3 days ago', current: false },
]

// Activity feed
const activities = [
  {
    icon: GitBranch,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    title: 'Pushed 3 commits to feature/dark-mode',
    description: 'Updated component styles for dark mode support',
    time: '2 hours ago',
  },
  {
    icon: MessageSquare,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    title: 'Commented on issue #42',
    description: '"I think we should use CSS variables for theming..."',
    time: '4 hours ago',
  },
  {
    icon: Heart,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    title: 'Starred repository vue-patterns',
    description: 'A curated collection of Vue.js design patterns',
    time: '6 hours ago',
  },
  {
    icon: FileText,
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    title: 'Created pull request #142',
    description: 'Add dark mode support to all components',
    time: '1 day ago',
  },
  {
    icon: Activity,
    color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
    title: 'Deployed v0.8.0 to production',
    description: 'New features: toast notifications, file upload, and more',
    time: '2 days ago',
  },
  {
    icon: Check,
    color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30',
    title: 'Closed issue #38',
    description: 'Fix pagination component infinite loop',
    time: '3 days ago',
  },
]

const notifications = [
  { label: 'Email notifications', description: 'Receive email for important updates', enabled: true },
  { label: 'Push notifications', description: 'Get push notifications on your devices', enabled: true },
  { label: 'Weekly digest', description: 'Summary of activity every week', enabled: false },
  { label: 'Marketing emails', description: 'New features and product updates', enabled: false },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Cover & Avatar -->
    <div class="relative">
      <!-- Cover image -->
      <div
        class="h-48 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-blue-600 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-black/10"></div>
        <button
          class="absolute bottom-3 right-3 p-2 bg-black/30 hover:bg-black/50 text-white rounded-lg backdrop-blur-sm transition-colors"
        >
          <Camera class="w-4 h-4" />
        </button>
      </div>

      <!-- Avatar + Info -->
      <div class="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 px-6">
        <div class="relative">
          <div
            class="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
          >
            <BaseAvatar :name="profile.name" size="xl" class="w-full h-full" />
          </div>
          <button
            class="absolute -bottom-1 -right-1 p-1.5 bg-primary-600 text-white rounded-lg shadow"
          >
            <Camera class="w-3 h-3" />
          </button>
        </div>

        <div class="flex-1 pb-1">
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ profile.name }}</h1>
            <BaseBadge variant="primary" size="sm">Pro</BaseBadge>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ profile.username }}</p>
        </div>

        <BaseButton variant="outline" size="sm">
          <template #icon-left><Edit3 class="w-4 h-4" /></template>
          Edit Profile
        </BaseButton>
      </div>
    </div>

    <!-- Bio & Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 px-0">
      <!-- Left: Bio info -->
      <div class="lg:col-span-1 space-y-4">
        <BaseCard>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">{{ profile.bio }}</p>

          <div class="space-y-2.5">
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin class="w-4 h-4 shrink-0" />
              {{ profile.location }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <LinkIcon class="w-4 h-4 shrink-0" />
              <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">
                {{ profile.website }}
              </a>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Mail class="w-4 h-4 shrink-0" />
              {{ profile.email }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar class="w-4 h-4 shrink-0" />
              Joined {{ profile.joinDate }}
            </div>
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-4 mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-center">
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ profile.followers }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Followers</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ profile.following }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Following</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ profile.projects }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Projects</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Right: Tabs content -->
      <div class="lg:col-span-3">
        <!-- Tab nav -->
        <div class="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px"
            :class="
              activeTab === tab.key
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            "
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Activity tab -->
        <div v-if="activeTab === 'activity'" class="space-y-4">
          <div
            v-for="(item, index) in activities"
            :key="index"
            class="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="item.color">
              <component :is="item.icon" class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.title }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ item.description }}</p>
            </div>
            <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0 mt-0.5">
              {{ item.time }}
            </span>
          </div>
        </div>

        <!-- Settings tab -->
        <div v-if="activeTab === 'settings'" class="space-y-6">
          <BaseCard>
            <template #header>
              <h3 class="font-semibold text-gray-900 dark:text-white">General Information</h3>
            </template>
            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BaseInput v-model="settings.displayName" label="Display Name" />
                <BaseInput v-model="settings.email" label="Email" type="email" />
              </div>
              <BaseInput v-model="settings.bio" label="Bio" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BaseInput v-model="settings.location" label="Location" />
                <BaseInput v-model="settings.website" label="Website" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BaseInput v-model="settings.language" label="Language" />
                <BaseInput v-model="settings.timezone" label="Timezone" />
              </div>
              <div class="flex justify-end">
                <BaseButton variant="primary" size="sm">Save Changes</BaseButton>
              </div>
            </div>
          </BaseCard>

          <!-- Notifications -->
          <BaseCard>
            <template #header>
              <h3 class="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </template>
            <div class="space-y-4">
              <div
                v-for="notif in notifications"
                :key="notif.label"
                class="flex items-center justify-between"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notif.label }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ notif.description }}</p>
                </div>
                <button
                  class="relative w-10 h-5 rounded-full transition-colors"
                  :class="notif.enabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'"
                  @click="notif.enabled = !notif.enabled"
                >
                  <span
                    class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                    :class="notif.enabled ? 'translate-x-5.5' : 'translate-x-0.5'"
                  ></span>
                </button>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Security tab -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <!-- Change password -->
          <BaseCard>
            <template #header>
              <div class="flex items-center gap-2">
                <Key class="w-4 h-4 text-gray-500" />
                <h3 class="font-semibold text-gray-900 dark:text-white">Change Password</h3>
              </div>
            </template>
            <div class="space-y-4 max-w-md">
              <BaseInput
                v-model="securityForm.currentPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Current Password"
                placeholder="Enter current password"
              />
              <BaseInput
                v-model="securityForm.newPassword"
                :type="showPassword ? 'text' : 'password'"
                label="New Password"
                placeholder="Enter new password"
              />
              <BaseInput
                v-model="securityForm.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Confirm Password"
                placeholder="Confirm new password"
              />
              <div class="flex items-center justify-between">
                <BaseCheckbox v-model="showPassword" label="Show passwords" />
                <BaseButton variant="primary" size="sm">Update Password</BaseButton>
              </div>
            </div>
          </BaseCard>

          <!-- 2FA -->
          <BaseCard>
            <template #header>
              <div class="flex items-center gap-2">
                <Smartphone class="w-4 h-4 text-gray-500" />
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h3>
              </div>
            </template>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Two-factor authentication is currently
                  <span :class="twoFactorEnabled ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
                    {{ twoFactorEnabled ? 'enabled' : 'disabled' }}
                  </span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <BaseButton
                :variant="twoFactorEnabled ? 'danger' : 'primary'"
                size="sm"
                @click="twoFactorEnabled = !twoFactorEnabled"
              >
                {{ twoFactorEnabled ? 'Disable' : 'Enable' }}
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Sessions -->
          <BaseCard>
            <template #header>
              <div class="flex items-center gap-2">
                <Globe class="w-4 h-4 text-gray-500" />
                <h3 class="font-semibold text-gray-900 dark:text-white">Active Sessions</h3>
              </div>
            </template>
            <div class="space-y-3">
              <div
                v-for="session in sessions"
                :key="session.device"
                class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <Globe class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ session.device }}
                      <BaseBadge v-if="session.current" variant="success" size="sm" class="ml-2">
                        Current
                      </BaseBadge>
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ session.location }} · {{ session.time }}
                    </p>
                  </div>
                </div>
                <BaseButton v-if="!session.current" variant="ghost" size="sm">Revoke</BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>
