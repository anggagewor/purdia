import { ref, computed, type Directive } from 'vue'

/**
 * @purdia RBAC — Role-Based Access Control (Mock)
 *
 * Lightweight permission system for UI enforcement.
 * In production, permissions would come from your auth API.
 */

export interface Role {
  name: string
  label: string
  permissions: string[]
}

// Mock roles with permissions
export const roles: Role[] = [
  {
    name: 'admin',
    label: 'Administrator',
    permissions: [
      'users.view', 'users.create', 'users.edit', 'users.delete',
      'invoices.view', 'invoices.create', 'invoices.edit', 'invoices.delete',
      'reports.view', 'reports.export',
      'settings.view', 'settings.edit',
      'roles.view', 'roles.manage',
    ],
  },
  {
    name: 'manager',
    label: 'Manager',
    permissions: [
      'users.view', 'users.create', 'users.edit',
      'invoices.view', 'invoices.create', 'invoices.edit',
      'reports.view', 'reports.export',
      'settings.view',
    ],
  },
  {
    name: 'editor',
    label: 'Editor',
    permissions: [
      'users.view',
      'invoices.view', 'invoices.create', 'invoices.edit',
      'reports.view',
    ],
  },
  {
    name: 'viewer',
    label: 'Viewer',
    permissions: [
      'users.view',
      'invoices.view',
      'reports.view',
    ],
  },
]

// Current user's role (reactive)
const currentRole = ref<string>(localStorage.getItem('mock_role') || 'admin')

export function useRbac() {
  const role = computed({
    get: () => currentRole.value,
    set: (val: string) => {
      currentRole.value = val
      localStorage.setItem('mock_role', val)
    },
  })

  const currentPermissions = computed(() => {
    const r = roles.find((r) => r.name === currentRole.value)
    return r?.permissions || []
  })

  const currentRoleInfo = computed(() => roles.find((r) => r.name === currentRole.value))

  function hasPermission(permission: string): boolean {
    return currentPermissions.value.includes(permission)
  }

  function hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((p) => currentPermissions.value.includes(p))
  }

  function hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((p) => currentPermissions.value.includes(p))
  }

  function setRole(roleName: string) {
    role.value = roleName
  }

  return {
    role,
    roles,
    currentPermissions,
    currentRoleInfo,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    setRole,
  }
}

/**
 * v-permission directive
 *
 * Usage:
 *   v-permission="'users.create'"           — single permission
 *   v-permission="['users.edit', 'users.delete']"  — any of these
 *
 * The element is hidden (display:none) if the user lacks permission.
 */
export const vPermission: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    checkPermission(el, binding.value)
  },
  updated(el, binding) {
    checkPermission(el, binding.value)
  },
}

function checkPermission(el: HTMLElement, value: string | string[]) {
  const { hasPermission, hasAnyPermission } = useRbac()

  let allowed = false
  if (Array.isArray(value)) {
    allowed = hasAnyPermission(value)
  } else {
    allowed = hasPermission(value)
  }

  el.style.display = allowed ? '' : 'none'
}
