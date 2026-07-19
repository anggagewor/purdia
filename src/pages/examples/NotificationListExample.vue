<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@purdia/ui'
import { Bell, CheckCircle, AlertCircle, Info, X } from '@lucide/vue'

const notifications = ref([
  {
    id: 1,
    icon: 'success',
    title: 'Deployment successful',
    desc: 'v2.1.0 deployed to production',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    icon: 'error',
    title: 'Build failed',
    desc: 'Pipeline #342 failed on stage test',
    time: '15 min ago',
    read: false,
  },
  {
    id: 3,
    icon: 'info',
    title: 'New team member',
    desc: 'Alice joined the project',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 4,
    icon: 'success',
    title: 'Invoice paid',
    desc: 'Invoice #1042 has been paid',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 5,
    icon: 'info',
    title: 'System update',
    desc: 'Scheduled maintenance tonight',
    time: '5 hours ago',
    read: true,
  },
])

function markAllRead() {
  notifications.value.forEach((n) => (n.read = true))
}

function dismiss(id: number) {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}

const unreadCount = () => notifications.value.filter((n) => !n.read).length
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Notification List</h1>
      <p class="text-gray-500 mt-1">Notification feed with read/unread states and actions.</p>
    </div>

    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Notifications</h4>
          <div class="flex items-center gap-3">
            <span
              v-if="unreadCount() > 0"
              class="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full"
            >
              {{ unreadCount() }} new
            </span>
            <button class="text-xs text-gray-500 hover:text-gray-700" @click="markAllRead">
              Mark all read
            </button>
          </div>
        </div>
      </template>
      <div class="divide-y divide-gray-100 -mx-4">
        <div
          v-for="item in notifications"
          :key="item.id"
          class="flex items-start gap-3 px-4 py-3 transition-colors"
          :class="!item.read ? 'bg-blue-50/50' : ''"
        >
          <div class="shrink-0 mt-0.5">
            <CheckCircle v-if="item.icon === 'success'" class="w-5 h-5 text-green-500" />
            <AlertCircle v-else-if="item.icon === 'error'" class="w-5 h-5 text-red-500" />
            <Info v-else class="w-5 h-5 text-blue-500" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-sm font-medium text-gray-900 truncate">{{ item.title }}</p>
              <div v-if="!item.read" class="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"></div>
            </div>
            <p class="text-xs text-gray-500 mt-0.5">{{ item.desc }}</p>
            <p class="text-[10px] text-gray-400 mt-1">{{ item.time }}</p>
          </div>
          <button
            class="shrink-0 p-1 text-gray-300 hover:text-gray-500 rounded"
            @click="dismiss(item.id)"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Icons & Bell Header</h4></template>
      <div class="max-w-sm border border-gray-200 rounded-lg overflow-hidden">
        <div
          class="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200"
        >
          <div class="flex items-center gap-2">
            <Bell class="w-4 h-4 text-gray-600" />
            <span class="text-sm font-semibold text-gray-900">Notifications</span>
          </div>
          <span class="text-[10px] font-medium text-white bg-red-500 px-1.5 py-0.5 rounded-full"
            >2</span
          >
        </div>
        <div class="divide-y divide-gray-100">
          <div class="flex items-start gap-3 px-4 py-3 bg-blue-50/40">
            <CheckCircle class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p class="text-xs font-medium text-gray-900">Task completed</p>
              <p class="text-[10px] text-gray-400">Just now</p>
            </div>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 bg-blue-50/40">
            <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p class="text-xs font-medium text-gray-900">Error detected</p>
              <p class="text-[10px] text-gray-400">5 min ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 px-4 py-3">
            <Info class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p class="text-xs font-medium text-gray-600">Update available</p>
              <p class="text-[10px] text-gray-400">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;div v-for="item in notifications" :class="!item.read ? 'bg-blue-50/50' : ''"&gt;
  &lt;CheckCircle v-if="item.icon === 'success'" class="text-green-500" /&gt;
  &lt;div&gt;
    &lt;p class="font-medium"&gt;{{ item.title }}&lt;/p&gt;
    &lt;p class="text-xs text-gray-500"&gt;{{ item.desc }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
