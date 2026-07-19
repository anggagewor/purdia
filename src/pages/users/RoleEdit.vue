<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

// Dummy data - "fetched" based on ID
const rolesData: Record<number, { name: string; description: string; permissions: string[] }> = {
  1: {
    name: 'Super Admin',
    description: 'Full access to all resources',
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
    permissions: ['content.read', 'media.read', 'reports.read'],
  },
  5: {
    name: 'Moderator',
    description: 'Moderate user content',
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

const formName = ref(roleData.name)
const formDescription = ref(roleData.description)

const permissionGroups = [
  {
    group: 'Users',
    permissions: [
      { key: 'users.create', label: 'Create Users' },
      { key: 'users.read', label: 'View Users' },
      { key: 'users.update', label: 'Edit Users' },
      { key: 'users.delete', label: 'Delete Users' },
    ],
  },
  {
    group: 'Roles',
    permissions: [
      { key: 'roles.create', label: 'Create Roles' },
      { key: 'roles.read', label: 'View Roles' },
      { key: 'roles.update', label: 'Edit Roles' },
      { key: 'roles.delete', label: 'Delete Roles' },
    ],
  },
  {
    group: 'Content',
    permissions: [
      { key: 'content.create', label: 'Create Content' },
      { key: 'content.read', label: 'View Content' },
      { key: 'content.update', label: 'Edit Content' },
      { key: 'content.delete', label: 'Delete Content' },
      { key: 'content.publish', label: 'Publish Content' },
    ],
  },
  {
    group: 'Media',
    permissions: [
      { key: 'media.upload', label: 'Upload Media' },
      { key: 'media.read', label: 'View Media' },
      { key: 'media.delete', label: 'Delete Media' },
    ],
  },
  {
    group: 'Reports',
    permissions: [
      { key: 'reports.read', label: 'View Reports' },
      { key: 'reports.export', label: 'Export Reports' },
    ],
  },
  {
    group: 'Settings',
    permissions: [
      { key: 'settings.manage', label: 'Manage Settings' },
      { key: 'settings.backup', label: 'Backup & Restore' },
    ],
  },
]

const selectedPermissions = ref<Set<string>>(new Set(roleData.permissions))

function togglePermission(key: string) {
  if (selectedPermissions.value.has(key)) {
    selectedPermissions.value.delete(key)
  } else {
    selectedPermissions.value.add(key)
  }
}

function toggleGroup(group: (typeof permissionGroups)[number]) {
  const allSelected = group.permissions.every((p) => selectedPermissions.value.has(p.key))
  if (allSelected) {
    group.permissions.forEach((p) => selectedPermissions.value.delete(p.key))
  } else {
    group.permissions.forEach((p) => selectedPermissions.value.add(p.key))
  }
}

function isGroupAllSelected(group: (typeof permissionGroups)[number]) {
  return group.permissions.every((p) => selectedPermissions.value.has(p.key))
}

function isGroupPartial(group: (typeof permissionGroups)[number]) {
  const some = group.permissions.some((p) => selectedPermissions.value.has(p.key))
  const all = group.permissions.every((p) => selectedPermissions.value.has(p.key))
  return some && !all
}

function handleSave() {
  router.push('/users/roles')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/users/roles')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Edit Role</h1>
        <p class="text-gray-500 mt-1">Update role "{{ formName }}" and its permissions.</p>
      </div>
    </div>

    <!-- Role Info -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Role Information</h4></template>
      <div class="space-y-4">
        <BaseInput v-model="formName" label="Role Name" placeholder="e.g. Content Manager" />
        <BaseInput
          v-model="formDescription"
          label="Description"
          placeholder="Brief description of this role..."
        />
      </div>
    </BaseCard>

    <!-- Permissions -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h4 class="font-semibold">Permissions</h4>
          <span class="text-xs text-gray-500">{{ selectedPermissions.size }} selected</span>
        </div>
      </template>
      <div class="space-y-6">
        <div v-for="group in permissionGroups" :key="group.group">
          <label class="flex items-center gap-3 cursor-pointer mb-3 pb-2 border-b border-gray-100">
            <span
              class="w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              :class="
                isGroupAllSelected(group)
                  ? 'bg-primary-500 border-primary-500'
                  : isGroupPartial(group)
                    ? 'border-primary-500 bg-primary-100'
                    : 'border-gray-300'
              "
              @click="toggleGroup(group)"
            >
              <svg
                v-if="isGroupAllSelected(group)"
                class="w-3 h-3 text-white"
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
              <svg
                v-else-if="isGroupPartial(group)"
                class="w-2.5 h-0.5"
                viewBox="0 0 10 2"
                fill="none"
              >
                <path d="M1 1h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <span class="font-semibold text-sm text-gray-900" @click="toggleGroup(group)">{{
              group.group
            }}</span>
            <span class="text-xs text-gray-400 ml-auto"
              >{{ group.permissions.filter((p) => selectedPermissions.has(p.key)).length }}/{{
                group.permissions.length
              }}</span
            >
          </label>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
            <label
              v-for="perm in group.permissions"
              :key="perm.key"
              class="flex items-center gap-2.5 py-1.5 px-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span
                class="w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 transition-colors"
                :class="
                  selectedPermissions.has(perm.key)
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300'
                "
                @click.prevent="togglePermission(perm.key)"
              >
                <svg
                  v-if="selectedPermissions.has(perm.key)"
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
              <span class="text-sm text-gray-700" @click.prevent="togglePermission(perm.key)">{{
                perm.label
              }}</span>
            </label>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Actions -->
    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/users/roles')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
