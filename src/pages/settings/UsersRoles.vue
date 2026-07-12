<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  BaseCard,
  BaseButton,
  BaseTable,
  BaseBadge,
  BaseModal,
  BaseInput,
  BaseSelect,
  BaseTabs,
  TabPanel,
  DropdownButton,
} from '@/components/ui'
import { Plus, Edit, Trash2, Shield, MoreHorizontal, CheckCircle, Users } from '@lucide/vue'
import { rolesApi, permissionsApi, usersApi } from '@/lib/api'
import type { Role, Permission } from '@/lib/api'
import type { TenantUser, UserCreatePayload, UserUpdatePayload } from '@/lib/api'
import type { TableColumn } from '@/components/ui/BaseTable.vue'
import type { TabItem } from '@/components/ui/BaseTabs.vue'
import type { DropdownItem } from '@/components/ui/DropdownButton.vue'
import { useToast } from '@/composables'

const toast = useToast()
const activeTab = ref('users')
const tenantId = 1 // TODO: from tenant store

const tabs: TabItem[] = [
  { key: 'users', label: 'Users' },
  { key: 'roles', label: 'Roles' },
  { key: 'permissions', label: 'Permissions' },
]

// ---------------------------------------------------------------------------
// USERS
// ---------------------------------------------------------------------------

const users = ref<TenantUser[]>([])
const usersLoading = ref(false)
const showUserModal = ref(false)
const showDeleteUserModal = ref(false)
const userEditMode = ref(false)
const userForm = ref({
  id: 0,
  name: '',
  email: '',
  password: '',
  role_id: '' as string | number,
  branch_ids: [] as number[],
})
const userToDelete = ref<TenantUser | null>(null)
const userSaving = ref(false)
const userError = ref('')

const userColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const userActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Remove', icon: Trash2, value: 'delete', danger: true },
]

async function fetchUsers() {
  usersLoading.value = true
  try {
    const res = await usersApi.list(tenantId)
    users.value = res.data
  } catch {
    toast.error('Gagal memuat users.')
  } finally {
    usersLoading.value = false
  }
}

function openCreateUser() {
  userEditMode.value = false
  userForm.value = { id: 0, name: '', email: '', password: '', role_id: '', branch_ids: [] }
  userError.value = ''
  showUserModal.value = true
}

function openEditUser(user: TenantUser) {
  userEditMode.value = true
  const roleMatch = roles.value.find((r) => r.slug === user.role_slug)
  userForm.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
    role_id: roleMatch?.id ?? '',
    branch_ids: user.branches?.map((b) => b.id) ?? [],
  }
  userError.value = ''
  showUserModal.value = true
}

function openDeleteUser(user: TenantUser) {
  userToDelete.value = user
  showDeleteUserModal.value = true
}

function handleUserAction(item: DropdownItem, row: Record<string, unknown>) {
  const user = row as unknown as TenantUser
  if (item.value === 'edit') openEditUser(user)
  if (item.value === 'delete') openDeleteUser(user)
}

async function saveUser() {
  userError.value = ''
  if (!userForm.value.name || !userForm.value.email) {
    userError.value = 'Name dan email wajib diisi.'
    return
  }
  if (!userEditMode.value && !userForm.value.password) {
    userError.value = 'Password wajib diisi untuk user baru.'
    return
  }
  userSaving.value = true
  try {
    if (userEditMode.value) {
      const payload: UserUpdatePayload = {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password || null,
        role_id: userForm.value.role_id ? Number(userForm.value.role_id) : undefined,
        branch_ids: userForm.value.branch_ids.length > 0 ? userForm.value.branch_ids : undefined,
      }
      await usersApi.update(tenantId, userForm.value.id, payload)
      toast.success('User berhasil diupdate.')
    } else {
      const payload: UserCreatePayload = {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password,
        role_id: userForm.value.role_id ? Number(userForm.value.role_id) : undefined,
        branch_ids: userForm.value.branch_ids.length > 0 ? userForm.value.branch_ids : undefined,
      }
      await usersApi.create(tenantId, payload)
      toast.success('User berhasil dibuat.')
    }
    showUserModal.value = false
    await fetchUsers()
  } catch (e: any) {
    if (e.errors) {
      const firstField = Object.keys(e.errors)[0]
      userError.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      userError.value = e.message || 'Gagal menyimpan user.'
    }
  } finally {
    userSaving.value = false
  }
}

async function deleteUser() {
  if (!userToDelete.value) return
  try {
    await usersApi.remove(tenantId, userToDelete.value.id)
    toast.success('User berhasil dihapus.')
    showDeleteUserModal.value = false
    await fetchUsers()
  } catch (e: any) {
    toast.error(e.message || 'Gagal menghapus user.')
  }
}

const roleOptions = computed(() => roles.value.map((r) => ({ label: r.name, value: r.id })))

// ---------------------------------------------------------------------------
// ROLES
// ---------------------------------------------------------------------------

const roles = ref<Role[]>([])
const rolesLoading = ref(false)
const showRoleModal = ref(false)
const showDeleteRoleModal = ref(false)
const showPermissionSyncModal = ref(false)
const roleEditMode = ref(false)
const roleForm = ref({ id: 0, name: '', slug: '', description: '' })
const roleToDelete = ref<Role | null>(null)
const roleSaving = ref(false)
const roleError = ref('')

const syncRoleId = ref(0)
const syncRoleName = ref('')
const syncSelectedIds = ref<number[]>([])
const syncSaving = ref(false)

const roleColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'slug', label: 'Slug' },
  { key: 'description', label: 'Description' },
  { key: 'permissions', label: 'Permissions', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const roleActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { label: 'Manage Permissions', icon: Shield, value: 'permissions' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchRoles() {
  rolesLoading.value = true
  try {
    const res = await rolesApi.list()
    roles.value = res.data
  } catch {
    toast.error('Gagal memuat roles.')
  } finally {
    rolesLoading.value = false
  }
}

function openCreateRole() {
  roleEditMode.value = false
  roleForm.value = { id: 0, name: '', slug: '', description: '' }
  roleError.value = ''
  showRoleModal.value = true
}

function openEditRole(role: Role) {
  roleEditMode.value = true
  roleForm.value = {
    id: role.id,
    name: role.name,
    slug: role.slug,
    description: role.description ?? '',
  }
  roleError.value = ''
  showRoleModal.value = true
}

function openDeleteRole(role: Role) {
  roleToDelete.value = role
  showDeleteRoleModal.value = true
}

function openSyncPermissions(role: Role) {
  syncRoleId.value = role.id
  syncRoleName.value = role.name
  syncSelectedIds.value = role.permissions?.map((p) => p.id) ?? []
  showPermissionSyncModal.value = true
}

function handleRoleAction(item: DropdownItem, row: Record<string, unknown>) {
  const role = row as unknown as Role
  if (item.value === 'edit') openEditRole(role)
  if (item.value === 'delete') openDeleteRole(role)
  if (item.value === 'permissions') openSyncPermissions(role)
}

async function saveRole() {
  roleError.value = ''
  if (!roleForm.value.name || !roleForm.value.slug) {
    roleError.value = 'Name dan slug wajib diisi.'
    return
  }
  roleSaving.value = true
  try {
    if (roleEditMode.value) {
      await rolesApi.update(roleForm.value.id, {
        name: roleForm.value.name,
        slug: roleForm.value.slug,
        description: roleForm.value.description || undefined,
      })
      toast.success('Role berhasil diupdate.')
    } else {
      await rolesApi.create({
        name: roleForm.value.name,
        slug: roleForm.value.slug,
        description: roleForm.value.description || undefined,
      })
      toast.success('Role berhasil dibuat.')
    }
    showRoleModal.value = false
    await fetchRoles()
  } catch (e: any) {
    if (e.errors) {
      const firstField = Object.keys(e.errors)[0]
      roleError.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      roleError.value = e.message || 'Gagal menyimpan role.'
    }
  } finally {
    roleSaving.value = false
  }
}

async function deleteRole() {
  if (!roleToDelete.value) return
  try {
    await rolesApi.remove(roleToDelete.value.id)
    toast.success('Role berhasil dihapus.')
    showDeleteRoleModal.value = false
    await fetchRoles()
  } catch (e: any) {
    toast.error(e.message || 'Gagal menghapus role.')
  }
}

async function saveSyncPermissions() {
  syncSaving.value = true
  try {
    await rolesApi.syncPermissions(syncRoleId.value, syncSelectedIds.value)
    toast.success('Permissions berhasil disinkronkan.')
    showPermissionSyncModal.value = false
    await fetchRoles()
  } catch (e: any) {
    toast.error(e.message || 'Gagal menyinkronkan permissions.')
  } finally {
    syncSaving.value = false
  }
}

function toggleSyncPermission(permId: number) {
  const idx = syncSelectedIds.value.indexOf(permId)
  if (idx > -1) {
    syncSelectedIds.value.splice(idx, 1)
  } else {
    syncSelectedIds.value.push(permId)
  }
}

// ---------------------------------------------------------------------------
// PERMISSIONS
// ---------------------------------------------------------------------------

const permissions = ref<Permission[]>([])
const permissionsLoading = ref(false)
const showPermModal = ref(false)
const showDeletePermModal = ref(false)
const permEditMode = ref(false)
const permForm = ref({ id: 0, name: '', scope: '' as string, description: '' })
const permToDelete = ref<Permission | null>(null)
const permSaving = ref(false)
const permError = ref('')

const permColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'scope', label: 'Scope', align: 'center' },
  { key: 'description', label: 'Description' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const permActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

const scopeOptions = [
  { label: 'Page', value: 'page' },
  { label: 'Component', value: 'component' },
  { label: 'Action', value: 'action' },
  { label: 'API', value: 'api' },
]

async function fetchPermissions() {
  permissionsLoading.value = true
  try {
    const res = await permissionsApi.list()
    permissions.value = res.data
  } catch {
    toast.error('Gagal memuat permissions.')
  } finally {
    permissionsLoading.value = false
  }
}

function openCreatePerm() {
  permEditMode.value = false
  permForm.value = { id: 0, name: '', scope: '', description: '' }
  permError.value = ''
  showPermModal.value = true
}

function openEditPerm(perm: Permission) {
  permEditMode.value = true
  permForm.value = {
    id: perm.id,
    name: perm.name,
    scope: perm.scope,
    description: perm.description ?? '',
  }
  permError.value = ''
  showPermModal.value = true
}

function openDeletePerm(perm: Permission) {
  permToDelete.value = perm
  showDeletePermModal.value = true
}

function handlePermAction(item: DropdownItem, row: Record<string, unknown>) {
  const perm = row as unknown as Permission
  if (item.value === 'edit') openEditPerm(perm)
  if (item.value === 'delete') openDeletePerm(perm)
}

async function savePerm() {
  permError.value = ''
  if (!permForm.value.name || !permForm.value.scope) {
    permError.value = 'Name dan scope wajib diisi.'
    return
  }
  permSaving.value = true
  try {
    const payload = {
      name: permForm.value.name,
      scope: permForm.value.scope as Permission['scope'],
      description: permForm.value.description || undefined,
    }
    if (permEditMode.value) {
      await permissionsApi.update(permForm.value.id, payload)
      toast.success('Permission berhasil diupdate.')
    } else {
      await permissionsApi.create(payload)
      toast.success('Permission berhasil dibuat.')
    }
    showPermModal.value = false
    await fetchPermissions()
  } catch (e: any) {
    if (e.errors) {
      const firstField = Object.keys(e.errors)[0]
      permError.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      permError.value = e.message || 'Gagal menyimpan permission.'
    }
  } finally {
    permSaving.value = false
  }
}

async function deletePerm() {
  if (!permToDelete.value) return
  try {
    await permissionsApi.remove(permToDelete.value.id)
    toast.success('Permission berhasil dihapus.')
    showDeletePermModal.value = false
    await fetchPermissions()
  } catch (e: any) {
    toast.error(e.message || 'Gagal menghapus permission.')
  }
}

const groupedPermissions = computed(() => {
  const groups: Record<string, Permission[]> = {}
  for (const perm of permissions.value) {
    const module = perm.name.split('.')[0] ?? 'other'
    if (!groups[module]) groups[module] = []
    groups[module].push(perm)
  }
  return groups
})

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

onMounted(() => {
  fetchUsers()
  fetchRoles()
  fetchPermissions()
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Users & Roles</h1>
      <p class="text-gray-500 mt-1">Manage users, roles, and permissions for your organization.</p>
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <!-- USERS TAB -->
        <TabPanel name="users">
          <div class="space-y-4">
            <div class="flex justify-end">
              <BaseButton size="sm" :icon="Plus" @click="openCreateUser">Add User</BaseButton>
            </div>
            <BaseTable
              :columns="userColumns"
              :data="users"
              :loading="usersLoading"
              :searchable="true"
              search-placeholder="Search users..."
            >
              <template #cell-role="{ row }">
                <BaseBadge v-if="(row as any).role" variant="primary" size="sm" :pill="false">
                  {{ (row as any).role }}
                </BaseBadge>
                <span v-else class="text-gray-400 text-xs">—</span>
              </template>
              <template #cell-status="{ value }">
                <BaseBadge
                  :variant="value === 'active' ? 'success' : 'secondary'"
                  :dot="true"
                  size="sm"
                  >{{ value }}</BaseBadge
                >
              </template>
              <template #cell-actions="{ row }">
                <DropdownButton
                  :items="userActions"
                  variant="ghost"
                  size="sm"
                  align="right"
                  :icon="MoreHorizontal"
                  @select="(item) => handleUserAction(item, row)"
                />
              </template>
            </BaseTable>
          </div>
        </TabPanel>

        <!-- ROLES TAB -->
        <TabPanel name="roles">
          <div class="space-y-4">
            <div class="flex justify-end">
              <BaseButton size="sm" :icon="Plus" @click="openCreateRole">Add Role</BaseButton>
            </div>
            <BaseTable
              :columns="roleColumns"
              :data="roles"
              :loading="rolesLoading"
              :searchable="true"
              search-placeholder="Search roles..."
            >
              <template #cell-permissions="{ row }">
                <BaseBadge variant="primary" size="sm">
                  {{ (row as any).permissions?.length ?? 0 }}
                </BaseBadge>
              </template>
              <template #cell-actions="{ row }">
                <DropdownButton
                  :items="roleActions"
                  variant="ghost"
                  size="sm"
                  align="right"
                  :icon="MoreHorizontal"
                  @select="(item) => handleRoleAction(item, row)"
                />
              </template>
            </BaseTable>
          </div>
        </TabPanel>

        <!-- PERMISSIONS TAB -->
        <TabPanel name="permissions">
          <div class="space-y-4">
            <div class="flex justify-end">
              <BaseButton size="sm" :icon="Plus" @click="openCreatePerm">Add Permission</BaseButton>
            </div>
            <BaseTable
              :columns="permColumns"
              :data="permissions"
              :loading="permissionsLoading"
              :searchable="true"
              search-placeholder="Search permissions..."
            >
              <template #cell-scope="{ value }">
                <BaseBadge
                  :variant="
                    value === 'page'
                      ? 'primary'
                      : value === 'action'
                        ? 'success'
                        : value === 'component'
                          ? 'warning'
                          : 'secondary'
                  "
                  size="sm"
                  :pill="false"
                  >{{ value }}</BaseBadge
                >
              </template>
              <template #cell-actions="{ row }">
                <DropdownButton
                  :items="permActions"
                  variant="ghost"
                  size="sm"
                  align="right"
                  :icon="MoreHorizontal"
                  @select="(item) => handlePermAction(item, row)"
                />
              </template>
            </BaseTable>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- USER CREATE/EDIT MODAL -->
    <BaseModal v-model="showUserModal" :title="userEditMode ? 'Edit User' : 'Add User'" size="md">
      <div class="space-y-4">
        <div
          v-if="userError"
          class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
        >
          {{ userError }}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="userForm.name" label="Name" placeholder="Full name" />
          <BaseInput
            v-model="userForm.email"
            label="Email"
            type="email"
            placeholder="user@example.com"
          />
        </div>
        <BaseInput
          v-model="userForm.password"
          label="Password"
          type="password"
          :placeholder="userEditMode ? 'Leave empty to keep current' : 'Min 8 characters'"
          :hint="userEditMode ? 'Kosongkan jika tidak ingin mengubah password' : ''"
        />
        <BaseSelect
          v-model="userForm.role_id"
          label="Role"
          :options="roleOptions"
          placeholder="Select role..."
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showUserModal = false">Cancel</BaseButton>
        <BaseButton size="sm" :loading="userSaving" @click="saveUser">
          {{ userEditMode ? 'Update' : 'Create' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- USER DELETE MODAL -->
    <BaseModal v-model="showDeleteUserModal" title="Remove User" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Remove <strong>{{ userToDelete?.name }}</strong> from this tenant? They will lose access to
        all resources.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteUserModal = false"
          >Cancel</BaseButton
        >
        <BaseButton variant="danger" size="sm" @click="deleteUser">Remove</BaseButton>
      </template>
    </BaseModal>

    <!-- ROLE CREATE/EDIT MODAL -->
    <BaseModal
      v-model="showRoleModal"
      :title="roleEditMode ? 'Edit Role' : 'Create Role'"
      size="sm"
    >
      <div class="space-y-4">
        <div
          v-if="roleError"
          class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
        >
          {{ roleError }}
        </div>
        <BaseInput v-model="roleForm.name" label="Name" placeholder="e.g. Administrator" />
        <BaseInput
          v-model="roleForm.slug"
          label="Slug"
          placeholder="e.g. admin"
          hint="Unique identifier, lowercase"
        />
        <BaseInput
          v-model="roleForm.description"
          label="Description"
          placeholder="Optional description"
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showRoleModal = false">Cancel</BaseButton>
        <BaseButton size="sm" :loading="roleSaving" @click="saveRole">
          {{ roleEditMode ? 'Update' : 'Create' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- ROLE DELETE MODAL -->
    <BaseModal v-model="showDeleteRoleModal" title="Delete Role" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Delete <strong>{{ roleToDelete?.name }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteRoleModal = false"
          >Cancel</BaseButton
        >
        <BaseButton variant="danger" size="sm" @click="deleteRole">Delete</BaseButton>
      </template>
    </BaseModal>

    <!-- SYNC PERMISSIONS MODAL -->
    <BaseModal v-model="showPermissionSyncModal" :title="`Permissions — ${syncRoleName}`" size="lg">
      <div class="space-y-4 max-h-[60vh] overflow-y-auto">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Select which permissions this role should have.
        </p>
        <div v-for="(perms, module) in groupedPermissions" :key="module" class="space-y-2">
          <h4
            class="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400"
          >
            {{ module }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
            <label
              v-for="perm in perms"
              :key="perm.id"
              class="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors"
              :class="
                syncSelectedIds.includes(perm.id)
                  ? 'bg-primary-50 dark:bg-primary-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              "
            >
              <input
                type="checkbox"
                :checked="syncSelectedIds.includes(perm.id)"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
                @change="toggleSyncPermission(perm.id)"
              />
              <div class="flex-1 min-w-0">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate block">{{
                  perm.name
                }}</span>
                <span v-if="perm.description" class="text-xs text-gray-400 truncate block">{{
                  perm.description
                }}</span>
              </div>
              <BaseBadge
                :variant="
                  perm.scope === 'page'
                    ? 'primary'
                    : perm.scope === 'action'
                      ? 'success'
                      : perm.scope === 'component'
                        ? 'warning'
                        : 'secondary'
                "
                size="sm"
                >{{ perm.scope }}</BaseBadge
              >
            </label>
          </div>
        </div>
        <div v-if="permissions.length === 0" class="text-center py-8 text-gray-400">
          <p>No permissions available.</p>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <span class="text-xs text-gray-500">{{ syncSelectedIds.length }} selected</span>
          <div class="flex gap-2">
            <BaseButton variant="ghost" size="sm" @click="showPermissionSyncModal = false"
              >Cancel</BaseButton
            >
            <BaseButton
              size="sm"
              :loading="syncSaving"
              :icon="CheckCircle"
              @click="saveSyncPermissions"
              >Save</BaseButton
            >
          </div>
        </div>
      </template>
    </BaseModal>

    <!-- PERMISSION CREATE/EDIT MODAL -->
    <BaseModal
      v-model="showPermModal"
      :title="permEditMode ? 'Edit Permission' : 'Create Permission'"
      size="sm"
    >
      <div class="space-y-4">
        <div
          v-if="permError"
          class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
        >
          {{ permError }}
        </div>
        <BaseInput
          v-model="permForm.name"
          label="Name"
          placeholder="e.g. orders.action.create"
          hint="Dot-notation: module.scope.action"
        />
        <BaseSelect
          v-model="permForm.scope"
          label="Scope"
          :options="scopeOptions"
          placeholder="Select scope..."
          :searchable="false"
        />
        <BaseInput
          v-model="permForm.description"
          label="Description"
          placeholder="Optional description"
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showPermModal = false">Cancel</BaseButton>
        <BaseButton size="sm" :loading="permSaving" @click="savePerm">
          {{ permEditMode ? 'Update' : 'Create' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- PERMISSION DELETE MODAL -->
    <BaseModal v-model="showDeletePermModal" title="Delete Permission" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Delete <strong>{{ permToDelete?.name }}</strong
        >? This will remove it from all roles.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeletePermModal = false"
          >Cancel</BaseButton
        >
        <BaseButton variant="danger" size="sm" @click="deletePerm">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
