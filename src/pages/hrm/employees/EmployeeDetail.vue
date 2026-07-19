<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseAvatar } from '@purdia/ui'
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  CreditCard,
} from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const employee = ref({
  id: Number(route.params.id),
  name: 'Andi Pratama',
  employeeId: 'EMP-001',
  email: 'andi.pratama@company.com',
  phone: '+62 812 1111 2222',
  gender: 'Male',
  birthDate: '1992-05-15',
  address: 'Jl. Merdeka No. 45, Jakarta Selatan',
  department: 'Engineering',
  position: 'Senior Developer',
  employmentType: 'Full Time',
  joinDate: '2022-03-15',
  status: 'active',
  bankName: 'BCA',
  bankAccount: '1234567890',
  salary: 'Rp 25.000.000',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/hrm/employees')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ employee.name }}</h1>
          <p class="text-gray-500 mt-1">{{ employee.employeeId }}</p>
        </div>
      </div>
      <BaseButton size="sm" :icon="Edit" @click="router.push(`/hrm/employees/${employee.id}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
          </template>
          <div class="flex items-center gap-4 mb-6">
            <BaseAvatar :name="employee.name" size="lg" />
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ employee.name }}
              </h4>
              <p class="text-sm text-gray-500">
                {{ employee.position }} &middot; {{ employee.department }}
              </p>
            </div>
          </div>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Email</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Mail class="w-3.5 h-3.5 text-gray-400" /> {{ employee.email }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Phone</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Phone class="w-3.5 h-3.5 text-gray-400" /> {{ employee.phone }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Gender</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ employee.gender }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Date of Birth</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ employee.birthDate }}
              </dd>
            </div>
            <div class="md:col-span-2">
              <dt class="text-xs text-gray-500 mb-1">Address</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ employee.address }}
              </dd>
            </div>
          </dl>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Employment Details</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Department</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Building2 class="w-3.5 h-3.5 text-gray-400" /> {{ employee.department }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Position</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Briefcase class="w-3.5 h-3.5 text-gray-400" /> {{ employee.position }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Employment Type</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ employee.employmentType }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Join Date</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Calendar class="w-3.5 h-3.5 text-gray-400" /> {{ employee.joinDate }}
              </dd>
            </div>
          </dl>
        </BaseCard>
      </div>

      <div class="space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge
              :variant="employee.status === 'active' ? 'success' : 'secondary'"
              size="lg"
              :dot="true"
              >{{ employee.status }}</BaseBadge
            >
          </div>
        </BaseCard>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Bank Info</h3>
          </template>
          <dl class="space-y-3">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Bank</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <CreditCard class="w-3.5 h-3.5 text-gray-400" /> {{ employee.bankName }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Account No.</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ employee.bankAccount }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Base Salary</dt>
              <dd class="text-sm font-bold text-gray-900 dark:text-gray-100">
                {{ employee.salary }}
              </dd>
            </div>
          </dl>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
