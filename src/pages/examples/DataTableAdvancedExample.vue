<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Pin,
  PinOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Check,
  X,
  Edit3,
  GripVertical,
} from '@lucide/vue'
import { BaseCard, BaseBadge, BaseButton, BaseAvatar } from '@purdia/ui'

interface Column {
  key: string
  label: string
  width: number
  minWidth: number
  pinned: boolean
  sortable: boolean
  editable: boolean
  align: 'left' | 'center' | 'right'
}

interface Employee {
  id: number
  name: string
  email: string
  role: string
  department: string
  salary: number
  status: 'active' | 'inactive' | 'on-leave'
  joinDate: string
  [key: string]: string | number
}

const columns = ref<Column[]>([
  {
    key: 'name',
    label: 'Name',
    width: 200,
    minWidth: 150,
    pinned: true,
    sortable: true,
    editable: false,
    align: 'left',
  },
  {
    key: 'email',
    label: 'Email',
    width: 220,
    minWidth: 150,
    pinned: false,
    sortable: true,
    editable: true,
    align: 'left',
  },
  {
    key: 'role',
    label: 'Role',
    width: 160,
    minWidth: 120,
    pinned: false,
    sortable: true,
    editable: true,
    align: 'left',
  },
  {
    key: 'department',
    label: 'Department',
    width: 140,
    minWidth: 100,
    pinned: false,
    sortable: true,
    editable: true,
    align: 'left',
  },
  {
    key: 'salary',
    label: 'Salary',
    width: 120,
    minWidth: 90,
    pinned: false,
    sortable: true,
    editable: true,
    align: 'right',
  },
  {
    key: 'status',
    label: 'Status',
    width: 110,
    minWidth: 90,
    pinned: false,
    sortable: true,
    editable: false,
    align: 'center',
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    width: 120,
    minWidth: 100,
    pinned: false,
    sortable: true,
    editable: false,
    align: 'center',
  },
])

const data = ref<Employee[]>([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Product Designer',
    department: 'Design',
    salary: 85000,
    status: 'active',
    joinDate: '2023-03-15',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    salary: 120000,
    status: 'active',
    joinDate: '2022-08-01',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@company.com',
    role: 'Eng. Manager',
    department: 'Engineering',
    salary: 145000,
    status: 'active',
    joinDate: '2021-01-20',
  },
  {
    id: 4,
    name: 'Alex Turner',
    email: 'alex@company.com',
    role: 'UI Engineer',
    department: 'Design',
    salary: 95000,
    status: 'on-leave',
    joinDate: '2023-06-10',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa@company.com',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    salary: 110000,
    status: 'active',
    joinDate: '2022-11-05',
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david@company.com',
    role: 'Mobile Developer',
    department: 'Engineering',
    salary: 105000,
    status: 'active',
    joinDate: '2023-01-08',
  },
  {
    id: 7,
    name: 'Rachel Green',
    email: 'rachel@company.com',
    role: 'QA Engineer',
    department: 'Quality',
    salary: 88000,
    status: 'inactive',
    joinDate: '2022-04-22',
  },
  {
    id: 8,
    name: 'Tom Wilson',
    email: 'tom@company.com',
    role: 'Backend Dev',
    department: 'Engineering',
    salary: 115000,
    status: 'active',
    joinDate: '2022-09-14',
  },
  {
    id: 9,
    name: 'Anna Martinez',
    email: 'anna@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    salary: 92000,
    status: 'active',
    joinDate: '2023-07-01',
  },
  {
    id: 10,
    name: 'James Lee',
    email: 'james@company.com',
    role: 'Tech Lead',
    department: 'Engineering',
    salary: 140000,
    status: 'active',
    joinDate: '2021-05-10',
  },
])

// Sort
const sortKey = ref<string | null>(null)
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(col: Column) {
  if (!col.sortable) return
  if (sortKey.value === col.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col.key
    sortDir.value = 'asc'
  }
}

const sortedData = computed(() => {
  if (!sortKey.value) return data.value
  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...data.value].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * dir
    return String(aVal).localeCompare(String(bVal)) * dir
  })
})

// Search
const searchQuery = ref('')
const filteredData = computed(() => {
  if (!searchQuery.value) return sortedData.value
  const q = searchQuery.value.toLowerCase()
  return sortedData.value.filter((row) =>
    Object.values(row).some((val) => String(val).toLowerCase().includes(q)),
  )
})

// Pin
function togglePin(col: Column) {
  col.pinned = !col.pinned
}

// Inline edit
const editingCell = ref<{ rowId: number; colKey: string } | null>(null)
const editValue = ref('')

function startEdit(row: Employee, col: Column) {
  if (!col.editable) return
  editingCell.value = { rowId: row.id, colKey: col.key }
  editValue.value = String(row[col.key])
}

function saveEdit(row: Employee, col: Column) {
  if (col.key === 'salary') {
    row[col.key] = Number(editValue.value) || row[col.key]
  } else {
    ;(row as Record<string, unknown>)[col.key] = editValue.value
  }
  editingCell.value = null
}

function cancelEdit() {
  editingCell.value = null
}

function isEditing(rowId: number, colKey: string) {
  return editingCell.value?.rowId === rowId && editingCell.value?.colKey === colKey
}

// Resize
const resizingCol = ref<Column | null>(null)
const startX = ref(0)
const startWidth = ref(0)

function startResize(col: Column, event: MouseEvent) {
  resizingCol.value = col
  startX.value = event.clientX
  startWidth.value = col.width
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

function onResize(event: MouseEvent) {
  if (!resizingCol.value) return
  const diff = event.clientX - startX.value
  const newWidth = startWidth.value + diff
  if (newWidth >= resizingCol.value.minWidth) {
    resizingCol.value.width = newWidth
  }
}

function stopResize() {
  resizingCol.value = null
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

// Computed columns
const pinnedColumns = computed(() => columns.value.filter((c) => c.pinned))
const unpinnedColumns = computed(() => columns.value.filter((c) => !c.pinned))

function getStatusVariant(status: string): 'success' | 'danger' | 'warning' {
  const map: Record<string, 'success' | 'danger' | 'warning'> = {
    active: 'success',
    inactive: 'danger',
    'on-leave': 'warning',
  }
  return map[status] || 'success'
}

function formatSalary(val: number) {
  return '$' + val.toLocaleString()
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Advanced Data Table</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Column resize, pin, sort, search, and inline editing.
      </p>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center justify-between">
      <div class="relative w-72">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search all columns..."
          class="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{{ filteredData.length }} rows</span>
        <span>·</span>
        <span>{{ pinnedColumns.length }} pinned</span>
        <span>·</span>
        <span class="flex items-center gap-1">
          <Edit3 class="w-3 h-3" /> Double-click to edit
        </span>
      </div>
    </div>

    <!-- Table -->
    <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800/80">
              <th
                v-for="col in [...pinnedColumns, ...unpinnedColumns]"
                :key="col.key"
                class="relative group border-b border-gray-200 dark:border-gray-700 select-none"
                :style="{ width: col.width + 'px', minWidth: col.minWidth + 'px' }"
                :class="col.pinned ? 'bg-gray-100 dark:bg-gray-750 sticky left-0 z-10' : ''"
              >
                <div
                  class="flex items-center gap-1.5 px-3 py-2.5"
                  :class="[
                    col.align === 'right'
                      ? 'justify-end'
                      : col.align === 'center'
                        ? 'justify-center'
                        : 'justify-start',
                    col.sortable
                      ? 'cursor-pointer hover:text-primary-600 dark:hover:text-primary-400'
                      : '',
                  ]"
                  @click="toggleSort(col)"
                >
                  <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    {{ col.label }}
                  </span>
                  <ArrowUp
                    v-if="sortKey === col.key && sortDir === 'asc'"
                    class="w-3 h-3 text-primary-600"
                  />
                  <ArrowDown
                    v-else-if="sortKey === col.key && sortDir === 'desc'"
                    class="w-3 h-3 text-primary-600"
                  />
                  <ArrowUpDown
                    v-else-if="col.sortable"
                    class="w-3 h-3 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100"
                  />
                </div>

                <!-- Pin toggle -->
                <button
                  class="absolute top-1/2 -translate-y-1/2 right-5 opacity-0 group-hover:opacity-100 p-0.5 rounded text-gray-400 hover:text-primary-600 transition-opacity"
                  @click.stop="togglePin(col)"
                >
                  <Pin v-if="!col.pinned" class="w-3 h-3" />
                  <PinOff v-else class="w-3 h-3 text-primary-600" />
                </button>

                <!-- Resize handle -->
                <div
                  class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary-400 transition-colors"
                  @mousedown.prevent="startResize(col, $event)"
                ></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in filteredData"
              :key="row.id"
              class="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td
                v-for="col in [...pinnedColumns, ...unpinnedColumns]"
                :key="col.key"
                class="px-3 py-2.5"
                :class="[
                  col.pinned
                    ? 'bg-white dark:bg-gray-800 sticky left-0 z-10 border-r border-gray-100 dark:border-gray-700'
                    : '',
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                      ? 'text-center'
                      : 'text-left',
                ]"
                :style="{ width: col.width + 'px', minWidth: col.minWidth + 'px' }"
                @dblclick="startEdit(row, col)"
              >
                <!-- Editing -->
                <div v-if="isEditing(row.id, col.key)" class="flex items-center gap-1">
                  <input
                    v-model="editValue"
                    class="flex-1 px-2 py-1 text-sm border border-primary-400 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                    :type="col.key === 'salary' ? 'number' : 'text'"
                    @keydown.enter="saveEdit(row, col)"
                    @keydown.escape="cancelEdit"
                  />
                  <button
                    class="p-0.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                    @click="saveEdit(row, col)"
                  >
                    <Check class="w-3.5 h-3.5" />
                  </button>
                  <button
                    class="p-0.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    @click="cancelEdit"
                  >
                    <X class="w-3.5 h-3.5" />
                  </button>
                </div>

                <!-- Display -->
                <template v-else>
                  <!-- Name column -->
                  <div v-if="col.key === 'name'" class="flex items-center gap-2">
                    <BaseAvatar :name="String(row[col.key])" size="xs" />
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{
                      row[col.key]
                    }}</span>
                  </div>

                  <!-- Status column -->
                  <BaseBadge
                    v-else-if="col.key === 'status'"
                    :variant="getStatusVariant(String(row[col.key]))"
                    size="sm"
                    :dot="true"
                  >
                    {{ row[col.key] }}
                  </BaseBadge>

                  <!-- Salary column -->
                  <span
                    v-else-if="col.key === 'salary'"
                    class="text-sm text-gray-900 dark:text-white font-mono"
                    :class="
                      col.editable
                        ? 'cursor-pointer hover:text-primary-600 dark:hover:text-primary-400'
                        : ''
                    "
                  >
                    {{ formatSalary(row[col.key] as number) }}
                  </span>

                  <!-- Default -->
                  <span
                    v-else
                    class="text-sm text-gray-600 dark:text-gray-300"
                    :class="
                      col.editable
                        ? 'cursor-pointer hover:text-primary-600 dark:hover:text-primary-400'
                        : ''
                    "
                  >
                    {{ row[col.key] }}
                  </span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500">
      <div class="flex items-center gap-1.5">
        <GripVertical class="w-3.5 h-3.5" />
        <span>Drag column edge to resize</span>
      </div>
      <div class="flex items-center gap-1.5">
        <Pin class="w-3.5 h-3.5" />
        <span>Hover header to pin/unpin</span>
      </div>
      <div class="flex items-center gap-1.5">
        <Edit3 class="w-3.5 h-3.5" />
        <span>Double-click editable cell to edit</span>
      </div>
      <div class="flex items-center gap-1.5">
        <ArrowUpDown class="w-3.5 h-3.5" />
        <span>Click header to sort</span>
      </div>
    </div>
  </div>
</template>
