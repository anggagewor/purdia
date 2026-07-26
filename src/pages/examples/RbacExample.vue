<script setup lang="ts">
import { computed } from 'vue'
import {
  Shield,
  ShieldCheck,
  ShieldX,
  Users,
  FileText,
  BarChart3,
  Settings,
  Key,
  Eye,
  Plus,
  Edit3,
  Trash2,
  Download,
  Lock,
} from '@lucide/vue'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { useRbac, vPermission, roles } from '@/lib/rbac'

const { role, currentPermissions, currentRoleInfo, hasPermission, setRole } = useRbac()

// Permission groups for visualization
const permissionGroups = [
  {
    name: 'Users',
    icon: Users,
    permissions: [
      { key: 'users.view', label: 'View Users', icon: Eye },
      { key: 'users.create', label: 'Create Users', icon: Plus },
      { key: 'users.edit', label: 'Edit Users', icon: Edit3 },
      { key: 'users.delete', label: 'Delete Users', icon: Trash2 },
    ],
  },
  {
    name: 'Invoices',
    icon: FileText,
    permissions: [
      { key: 'invoices.view', label: 'View Invoices', icon: Eye },
      { key: 'invoices.create', label: 'Create Invoices', icon: Plus },
      { key: 'invoices.edit', label: 'Edit Invoices', icon: Edit3 },
      { key: 'invoices.delete', label: 'Delete Invoices', icon: Trash2 },
    ],
  },
  {
    name: 'Reports',
    icon: BarChart3,
    permissions: [
      { key: 'reports.view', label: 'View Reports', icon: Eye },
      { key: 'reports.export', label: 'Export Reports', icon: Download },
    ],
  },
  {
    name: 'Settings',
    icon: Settings,
    permissions: [
      { key: 'settings.view', label: 'View Settings', icon: Eye },
      { key: 'settings.edit', label: 'Edit Settings', icon: Edit3 },
    ],
  },
  {
    name: 'Roles',
    icon: Key,
    permissions: [
      { key: 'roles.view', label: 'View Roles', icon: Eye },
      { key: 'roles.manage', label: 'Manage Roles', icon: Shield },
    ],
  },
]

function getRoleColor(roleName: string): 'danger' | 'warning' | 'info' | 'success' {
  const map: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
    admin: 'danger',
    manager: 'warning',
    editor: 'info',
    viewer: 'success',
  }
  return map[roleName] || 'info'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Role-Based Access Control (RBAC)
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Mock permission system with
        <code class="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">v-permission</code>
        directive and
        <code class="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">useRbac()</code>
        composable.
      </p>
    </div>

    <!-- Role switcher -->
    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <Shield class="w-4 h-4 text-primary-600" />
          <h3 class="font-semibold text-gray-900 dark:text-white">Switch Role</h3>
        </div>
      </template>

      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Change your role to see how the UI adapts. Elements below will show/hide based on
        permissions.
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <button
          v-for="r in roles"
          :key="r.name"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all"
          :class="
            role === r.name
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          "
          @click="setRole(r.name)"
        >
          <Shield class="w-4 h-4" :class="role === r.name ? 'text-primary-600' : 'text-gray-400'" />
          <span
            class="text-sm font-medium"
            :class="
              role === r.name
                ? 'text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300'
            "
          >
            {{ r.label }}
          </span>
          <BaseBadge :variant="getRoleColor(r.name)" size="sm">
            {{ r.permissions.length }}
          </BaseBadge>
        </button>
      </div>

      <div
        class="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-600 dark:text-gray-300"
      >
        Current: <strong>{{ currentRoleInfo?.label }}</strong> —
        {{ currentPermissions.length }} permissions
      </div>
    </BaseCard>

    <!-- Live demo: v-permission directive -->
    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <Lock class="w-4 h-4 text-primary-600" />
          <h3 class="font-semibold text-gray-900 dark:text-white">
            Live Demo — v-permission Directive
          </h3>
        </div>
      </template>

      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        These buttons use
        <code class="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">v-permission</code
        >. Switch roles above to see them appear/disappear.
      </p>

      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <BaseButton v-permission="'users.view'" variant="outline" size="sm">
            <template #icon-left><Eye class="w-4 h-4" /></template>
            View Users
          </BaseButton>
          <BaseButton v-permission="'users.create'" variant="primary" size="sm">
            <template #icon-left><Plus class="w-4 h-4" /></template>
            Add User
          </BaseButton>
          <BaseButton v-permission="'users.edit'" variant="secondary" size="sm">
            <template #icon-left><Edit3 class="w-4 h-4" /></template>
            Edit User
          </BaseButton>
          <BaseButton v-permission="'users.delete'" variant="danger" size="sm">
            <template #icon-left><Trash2 class="w-4 h-4" /></template>
            Delete User
          </BaseButton>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <BaseButton v-permission="'invoices.create'" variant="primary" size="sm">
            <template #icon-left><Plus class="w-4 h-4" /></template>
            Create Invoice
          </BaseButton>
          <BaseButton v-permission="'reports.export'" variant="outline" size="sm">
            <template #icon-left><Download class="w-4 h-4" /></template>
            Export Report
          </BaseButton>
          <BaseButton v-permission="'settings.edit'" variant="outline" size="sm">
            <template #icon-left><Settings class="w-4 h-4" /></template>
            Edit Settings
          </BaseButton>
          <BaseButton v-permission="'roles.manage'" variant="warning" size="sm">
            <template #icon-left><Key class="w-4 h-4" /></template>
            Manage Roles
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Permission matrix -->
    <BaseCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Permission Matrix</h3>
      </template>

      <div class="space-y-6">
        <div v-for="group in permissionGroups" :key="group.name">
          <div class="flex items-center gap-2 mb-3">
            <component :is="group.icon" class="w-4 h-4 text-gray-500" />
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ group.name }}</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div
              v-for="perm in group.permissions"
              :key="perm.key"
              class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
              :class="
                hasPermission(perm.key)
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-50'
              "
            >
              <ShieldCheck v-if="hasPermission(perm.key)" class="w-4 h-4 text-green-500 shrink-0" />
              <ShieldX v-else class="w-4 h-4 text-gray-400 shrink-0" />
              <span
                class="text-xs"
                :class="
                  hasPermission(perm.key)
                    ? 'text-green-700 dark:text-green-300 font-medium'
                    : 'text-gray-400 dark:text-gray-500'
                "
              >
                {{ perm.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Usage code -->
    <BaseCard>
      <template #header>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Usage</h3>
      </template>
      <pre
        class="p-4 rounded-lg bg-gray-900 text-gray-100 text-sm overflow-x-auto font-mono leading-relaxed"
      ><code>&lt;script setup&gt;
import { useRbac, vPermission } from '@/lib/rbac'

const { hasPermission, role, setRole } = useRbac()
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Directive: hide element if no permission --&gt;
  &lt;button v-permission="'users.create'"&gt;Add User&lt;/button&gt;

  &lt;!-- Directive: any of these permissions --&gt;
  &lt;button v-permission="['users.edit', 'users.delete']"&gt;Manage&lt;/button&gt;

  &lt;!-- Composable: conditional rendering --&gt;
  &lt;div v-if="hasPermission('reports.export')"&gt;Export&lt;/div&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>
  </div>
</template>
