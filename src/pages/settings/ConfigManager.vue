<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaseCard, BaseButton, BaseInput, BaseModal, BaseSelect } from '@/components/ui'
import { Plus, Save, Trash2, RefreshCw } from '@lucide/vue'
import { configApi } from '@/lib/api'
import type { ConfigItem } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const loading = ref(false)
const groups = ref<string[]>([])
const selectedGroup = ref('')
const configs = ref<ConfigItem[]>([])
const showAddModal = ref(false)
const addForm = ref({ key: '', value: '', type: 'string' })
const addError = ref('')

const typeOptions = [
  { label: 'String', value: 'string' },
  { label: 'Boolean', value: 'boolean' },
  { label: 'Integer', value: 'integer' },
  { label: 'Float', value: 'float' },
  { label: 'JSON', value: 'json' },
  { label: 'Array', value: 'array' },
]

async function fetchGroups() {
  loading.value = true
  try {
    const res = await configApi.listGroups()
    groups.value = res.data
    if (groups.value.length > 0 && !selectedGroup.value) {
      selectedGroup.value = groups.value[0] ?? ''
      await fetchConfigs()
    }
  } catch {
    toast.error('Gagal memuat config groups.')
  } finally {
    loading.value = false
  }
}

async function fetchConfigs() {
  if (!selectedGroup.value) return
  loading.value = true
  try {
    const res = await configApi.getGroup(selectedGroup.value)
    configs.value = res.data
  } catch {
    toast.error('Gagal memuat configs.')
  } finally {
    loading.value = false
  }
}

async function selectGroup(group: string) {
  selectedGroup.value = group
  await fetchConfigs()
}

async function updateConfig(item: ConfigItem) {
  try {
    await configApi.set(selectedGroup.value, { key: item.key, value: item.value, type: item.type })
    toast.success(`Config "${item.key}" berhasil disimpan.`)
  } catch (e: any) {
    toast.error(e.message || 'Gagal menyimpan config.')
  }
}

async function deleteConfig(key: string) {
  try {
    await configApi.remove(selectedGroup.value, key)
    toast.success(`Config "${key}" berhasil dihapus.`)
    await fetchConfigs()
  } catch (e: any) {
    toast.error(e.message || 'Gagal menghapus config.')
  }
}

function openAdd() {
  addForm.value = { key: '', value: '', type: 'string' }
  addError.value = ''
  showAddModal.value = true
}

async function saveNewConfig() {
  addError.value = ''
  if (!addForm.value.key) {
    addError.value = 'Key wajib diisi.'
    return
  }
  try {
    await configApi.set(selectedGroup.value, {
      key: addForm.value.key,
      value: addForm.value.value,
      type: addForm.value.type as ConfigItem['type'],
    })
    toast.success('Config berhasil ditambahkan.')
    showAddModal.value = false
    await fetchConfigs()
  } catch (e: any) {
    if (e.errors) {
      const f = Object.keys(e.errors)[0]
      addError.value = f ? e.errors[f][0] : e.message
    } else {
      addError.value = e.message || 'Gagal menyimpan.'
    }
  }
}

onMounted(fetchGroups)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Configuration</h1>
        <p class="text-gray-500 mt-1">System configuration and preferences.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="RefreshCw" @click="fetchConfigs"
          >Refresh</BaseButton
        >
        <BaseButton size="sm" :icon="Plus" @click="openAdd" :disabled="!selectedGroup"
          >Add Config</BaseButton
        >
      </div>
    </div>

    <div class="flex gap-6">
      <!-- Groups sidebar -->
      <div class="w-48 shrink-0 space-y-1">
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Groups</p>
        <button
          v-for="group in groups"
          :key="group"
          class="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
          :class="
            selectedGroup === group
              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
          "
          @click="selectGroup(group)"
        >
          {{ group }}
        </button>
        <p v-if="groups.length === 0 && !loading" class="text-xs text-gray-400">No groups found.</p>
      </div>

      <!-- Config items -->
      <div class="flex-1">
        <BaseCard v-if="selectedGroup">
          <template #header>
            <h4 class="font-semibold capitalize">{{ selectedGroup }}</h4>
          </template>
          <div v-if="loading" class="space-y-3">
            <div
              v-for="i in 4"
              :key="i"
              class="h-10 bg-gray-100 rounded animate-pulse dark:bg-gray-700"
            />
          </div>
          <div v-else-if="configs.length === 0" class="text-center py-8 text-gray-400">
            <p>No configs in this group.</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="item in configs"
              :key="item.key"
              class="flex items-center gap-3 border border-gray-100 rounded-lg p-3 dark:border-gray-700"
            >
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.key }}</p>
                <input
                  :value="String(item.value ?? '')"
                  class="mt-1 w-full text-sm px-2 py-1 border border-gray-200 rounded bg-gray-50 outline-none focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                  @change="
                    (e: Event) => {
                      item.value = (e.target as any).value
                      updateConfig(item)
                    }
                  "
                />
              </div>
              <span class="text-xs text-gray-400">{{ item.type || 'string' }}</span>
              <button
                class="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer"
                @click="deleteConfig(item.key)"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </BaseCard>
        <div v-else class="text-center py-12 text-gray-400">
          <p>Select a group from the left to view configs.</p>
        </div>
      </div>
    </div>

    <BaseModal v-model="showAddModal" title="Add Config" size="sm">
      <div class="space-y-4">
        <p v-if="addError" class="text-sm text-red-600">{{ addError }}</p>
        <BaseInput v-model="addForm.key" label="Key" placeholder="e.g. app.timezone" />
        <BaseInput v-model="addForm.value" label="Value" placeholder="Config value" />
        <BaseSelect
          v-model="addForm.type"
          :options="typeOptions"
          label="Type"
          :searchable="false"
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showAddModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveNewConfig">Save</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
