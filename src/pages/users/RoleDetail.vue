<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { ArrowLeft, Edit, Shield, Users, Calendar } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const rolesData: Record<
  number,
  { name: string; description: string; users: number; created: string; permissions: string[] }
> = {
  1: {
    name: 'Super Admin',
    description: 'Full access to all resources',
    users: 2,
    created: '2024-01-01',
    permissions: [
      'users.create',
      'users.read',
      'users.update',
      'users.delete',
      'roles.create',
      'roles.read',
      'roles.update',
      'roles.delete',
      'content.create',
      'content.read',
      'content.update',
      'content.delete',
      'content.publish',
      'media.upload',
      'media.read',
      'media.delete',
      'reports.read',
      'reports.export',
      'settings.manage',
      'settings.backup',
    ],
  },
  2: {
    name: 'Admin',
    description: 'Manage users and content',
    users: 3,
    created: '2024-01-01',
    permissions: [
      'users.create',
      'users.read',
      'users.update',
      'roles.read',
      'content.create',
      'content.read',
      'content.update',
      'content.delete',
      'media.upload',
      'media.read',
      'reports.read',
    ],
  },
  3: {
    name: 'Editor',
    description: 'Create and edit content',
    users: 5,
    created: '2024-02-15',
    permissions: [
      'content.create',
      'content.read',
      'content.update',
      'content.publish',
      'media.upload',
      'media.read',
    ],
  },
  4: {
    name: 'Viewer',
    description: 'Read-only access',
    users: 12,
    created: '2024-03-10',
    permissions: ['content.read', 'media.read', 'reports.read'],
  },
  5: {
    name: 'Moderator',
    description: 'Moderate user content',
    users: 4,
    created: '2024-05-20',
    permissions: [
      'users.read',
      'content.read',
      'content.update',
      'content.delete',
      'media.read',
      'reports.read',
    ],
  },
}

const roleId = Number(route.params.id)
const roleData = (rolesData[roleId] ?? rolesData[1])!

const permissionGroups = [
  { group: 'Users', permissions: ['users.create', 'users.read', 'users.update', 'users.delete'] },
  { group: 'Roles', permissions: ['roles.create', 'roles.read', 'roles.update', 'roles.delete'] },
  {
    group: 'Content',
    permissions: [
      'content.create',
      'content.read',
      'content.update',
      'content.delete',
      'content.publish',
    ],
  },
  { group: 'Media', permissions: ['media.upload', 'media.read', 'media.delete'] },
  { group: 'Reports', permissions: ['reports.read', 'reports.export'] },
  { group: 'Settings', permissions: ['settings.manage', 'settings.backup'] },
]

function getGroupPermissions(group: (typeof permissionGroups)[number]) {
  return group.permissions.map((p) => ({
    key: p,
    label: p.split('.')[1]!.charAt(0).toUpperCase() + p.split('.')[1]!.slice(1),
    active: roleData.permissions.includes(p),
  }))
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/users/roles')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ roleData.name }}</h1>
          <p class="text-gray-500 mt-1">{{ roleData.description }}</p>
        </div>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        :icon="Edit"
        @click="router.push(`/users/roles/${roleId}/edit`)"
        >Edit Role</BaseButton
      >
    </div>

    <!-- Role Info -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Overview</h4></template>
      <div class="grid grid-cols-3 gap-6">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center">
            <Shield class="w-4 h-4 text-primary-500" />
          </div>
          <div>
            <p class="text-xs text-gray-500">Permissions</p>
            <p class="text-sm font-semibold text-gray-900">{{ roleData.permissions.length }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Users class="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p class="text-xs text-gray-500">Users</p>
            <p class="text-sm font-semibold text-gray-900">{{ roleData.users }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
            <Calendar class="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p class="text-xs text-gray-500">Created</p>
            <p class="text-sm font-semibold text-gray-900">{{ roleData.created }}</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Permissions (read-only checkboxes) -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h4 class="font-semibold">Assigned Permissions</h4>
          <span class="text-xs text-gray-500">{{ roleData.permissions.length }} permissions</span>
        </div>
      </template>
      <div class="space-y-6">
        <div v-for="group in permissionGroups" :key="group.group">
          <h5 class="font-semibold text-sm text-gray-900 mb-3 pb-2 border-b border-gray-100">
            {{ group.group }}
          </h5>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
            <div
              v-for="perm in getGroupPermissions(group)"
              :key="perm.key"
              class="flex items-center gap-2.5 py-1.5 px-2 rounded-md"
              :class="perm.active ? '' : 'opacity-40'"
            >
              <span
                class="w-4 h-4 border-2 rounded flex items-center justify-center shrink-0"
                :class="perm.active ? 'bg-primary-500 border-primary-500' : 'border-gray-300'"
              >
                <svg
                  v-if="perm.active"
                  class="w-2.5 h-2.5 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="text-sm" :class="perm.active ? 'text-gray-700' : 'text-gray-400'">{{
                perm.label
              }}</span>
              <BaseBadge v-if="perm.active" variant="success" size="sm" class="ml-auto"
                >✓</BaseBadge
              >
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
