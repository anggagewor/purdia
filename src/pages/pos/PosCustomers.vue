<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseAvatar,
  BaseModal,
  BaseInput,
  BaseSelect,
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const custPage = ref(1)
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const selectedCustomer = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'name', label: 'Customer', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'phone', label: 'Phone' },
  { key: 'points', label: 'Points', align: 'center', sortable: true },
  { key: 'totalSpent', label: 'Total Spent', align: 'right', sortable: true },
  { key: 'visits', label: 'Visits', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const customers = ref([
  {
    id: 1,
    name: 'Budi Santoso',
    memberId: 'M001',
    type: 'member',
    phone: '+62 812 1111 2222',
    email: 'budi@email.com',
    points: 1250,
    totalSpent: 3750000,
    visits: 48,
    joined: '2024-01-15',
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    memberId: 'M002',
    type: 'member',
    phone: '+62 856 3333 4444',
    email: 'siti@email.com',
    points: 890,
    totalSpent: 2670000,
    visits: 35,
    joined: '2024-03-20',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    memberId: 'M003',
    type: 'member',
    phone: '+62 878 5555 6666',
    email: 'ahmad@email.com',
    points: 2100,
    totalSpent: 6300000,
    visits: 72,
    joined: '2023-11-10',
  },
  {
    id: 4,
    name: 'Lisa Permata',
    memberId: 'M004',
    type: 'member',
    phone: '+62 821 7777 8888',
    email: 'lisa@email.com',
    points: 450,
    totalSpent: 1350000,
    visits: 18,
    joined: '2024-06-05',
  },
  {
    id: 5,
    name: 'Walk-in Customer',
    memberId: '-',
    type: 'walkin',
    phone: '-',
    email: '-',
    points: 0,
    totalSpent: 8500000,
    visits: 312,
    joined: '-',
  },
  {
    id: 6,
    name: 'David Kim',
    memberId: 'M005',
    type: 'member',
    phone: '+62 813 9999 0000',
    email: 'david@email.com',
    points: 3200,
    totalSpent: 9600000,
    visits: 95,
    joined: '2023-08-22',
  },
])

const typeOptions: SelectOption[] = [
  { label: 'Member', value: 'member' },
  { label: 'Walk-in', value: 'walkin' },
]

const formName = ref('')
const formPhone = ref('')
const formEmail = ref('')
const formType = ref<string | number>('member')

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedCustomer.value = row
  if (item.value === 'view') showDetailModal.value = true
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Customers</h1>
        <p class="text-gray-500 mt-1">Members and walk-in customer data.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="showCreateModal = true">Add Member</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="customers"
        :searchable="true"
        search-placeholder="Search customers..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="xs" />
            <div>
              <span class="font-medium block">{{ value }}</span>
              <span v-if="row.memberId !== '-'" class="text-[0.625rem] text-gray-400">{{
                row.memberId
              }}</span>
            </div>
          </div>
        </template>
        <template #cell-type="{ value }">
          <BaseBadge :variant="value === 'member' ? 'primary' : 'secondary'" size="sm">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-points="{ value }">
          <span class="font-semibold text-amber-600">{{ (value as number).toLocaleString() }}</span>
        </template>
        <template #cell-totalSpent="{ value }">
          <span class="font-mono text-sm">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-actions="{ row }">
          <DropdownButton
            :items="rowActions"
            variant="ghost"
            size="sm"
            align="right"
            :icon="MoreHorizontal"
            @select="(item) => handleAction(item, row)"
          />
        </template>
      </BaseTable>
      <div class="px-4 py-3 border-t border-gray-200">
        <BasePagination
          v-model:current-page="custPage"
          :total-pages="4"
          :total-items="35"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Add Member" size="md">
      <div class="space-y-4">
        <BaseInput v-model="formName" label="Full Name" placeholder="Customer name" />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formPhone" label="Phone" placeholder="+62 xxx" />
          <BaseInput v-model="formEmail" label="Email" placeholder="email@example.com" />
        </div>
        <BaseSelect v-model="formType" label="Type" :options="typeOptions" :searchable="false" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Add Member</BaseButton>
      </template>
    </BaseModal>

    <!-- Detail Modal -->
    <BaseModal v-model="showDetailModal" title="Customer Detail" size="md">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <BaseAvatar :name="selectedCustomer.name as string" size="lg" />
          <div>
            <h3 class="font-semibold text-gray-900">{{ selectedCustomer.name }}</h3>
            <p class="text-sm text-gray-500">{{ selectedCustomer.memberId }}</p>
            <BaseBadge
              :variant="selectedCustomer.type === 'member' ? 'primary' : 'secondary'"
              size="sm"
              class="mt-1"
              >{{ selectedCustomer.type }}</BaseBadge
            >
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p class="text-xs text-gray-500">Phone</p>
            <p class="text-sm font-medium">{{ selectedCustomer.phone }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Email</p>
            <p class="text-sm font-medium">{{ selectedCustomer.email }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Points</p>
            <p class="text-sm font-semibold text-amber-600">
              {{ ((selectedCustomer.points as number) || 0).toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Total Spent</p>
            <p class="text-sm font-medium">
              {{ formatRp((selectedCustomer.totalSpent as number) || 0) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Visits</p>
            <p class="text-sm font-medium">{{ selectedCustomer.visits }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Member Since</p>
            <p class="text-sm font-medium">{{ selectedCustomer.joined }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDetailModal = false">Close</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
