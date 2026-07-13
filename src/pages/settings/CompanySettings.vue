<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaseCard, BaseButton, BaseInput } from '@/components/ui'
import { Building, Save } from '@lucide/vue'
import { tenantsApi } from '@/lib/api'
import type { Tenant } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const loading = ref(false)
const saving = ref(false)
const tenant = ref<Tenant | null>(null)

const form = ref({
  name: '',
  slug: '',
  currency: '',
  locale: '',
  timezone: '',
})

async function fetchTenant() {
  loading.value = true
  try {
    const res = await tenantsApi.list()
    if (res.data.length > 0) {
      const t = res.data[0]!
      tenant.value = t
      form.value = {
        name: t.name,
        slug: t.slug,
        currency: t.currency ?? 'IDR',
        locale: t.locale ?? 'id',
        timezone: t.timezone ?? 'Asia/Jakarta',
      }
    }
  } catch {
    toast.error('Gagal memuat data perusahaan.')
  } finally {
    loading.value = false
  }
}

async function saveTenant() {
  saving.value = true
  try {
    // If no tenant exists, create one; otherwise this is read-only for now
    if (!tenant.value) {
      await tenantsApi.create({
        name: form.value.name,
        slug: form.value.slug,
        currency: form.value.currency,
        locale: form.value.locale,
        timezone: form.value.timezone,
      })
      toast.success('Perusahaan berhasil dibuat.')
    } else {
      toast.info('Update perusahaan belum tersedia via API.')
    }
  } catch (e: any) {
    toast.error(e.message || 'Gagal menyimpan.')
  } finally {
    saving.value = false
  }
}

onMounted(fetchTenant)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Company</h1>
      <p class="text-gray-500 mt-1">Manage your company profile and settings.</p>
    </div>

    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <Building class="w-5 h-5 text-primary-500" />
          <h4 class="font-semibold">Company Information</h4>
        </div>
      </template>
      <div v-if="loading" class="space-y-4">
        <div
          v-for="i in 4"
          :key="i"
          class="h-10 bg-gray-100 rounded-md animate-pulse dark:bg-gray-700"
        />
      </div>
      <div v-else class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Company Name" placeholder="PT Example" />
          <BaseInput
            v-model="form.slug"
            label="Slug"
            placeholder="example"
            hint="Unique identifier"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="form.currency" label="Currency" placeholder="IDR" />
          <BaseInput v-model="form.locale" label="Locale" placeholder="id" />
          <BaseInput v-model="form.timezone" label="Timezone" placeholder="Asia/Jakarta" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <BaseButton :icon="Save" :loading="saving" @click="saveTenant">Save</BaseButton>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
