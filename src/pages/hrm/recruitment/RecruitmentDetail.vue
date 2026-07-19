<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseAvatar } from '@purdia/ui'
import { ArrowLeft, Edit, Briefcase, Building2, Calendar, DollarSign } from '@lucide/vue'
import type { BadgeVariant } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const job = ref({
  id: Number(route.params.id),
  position: 'Senior Frontend Developer',
  department: 'Engineering',
  employmentType: 'Full Time',
  status: 'open',
  postedDate: '2026-01-10',
  closingDate: '2026-02-10',
  salaryMin: 'Rp 15.000.000',
  salaryMax: 'Rp 25.000.000',
  requirements:
    '- Minimal 3 tahun pengalaman di Vue.js atau React\n- Memahami TypeScript dengan baik\n- Pengalaman dengan REST API dan GraphQL\n- Kemampuan komunikasi yang baik\n- Bersedia bekerja secara hybrid',
})

const applicants = ref([
  {
    id: 1,
    name: 'Rizky Pratama',
    appliedDate: '2026-01-12',
    status: 'interview',
  },
  {
    id: 2,
    name: 'Anisa Rahma',
    appliedDate: '2026-01-14',
    status: 'screening',
  },
  {
    id: 3,
    name: 'Fajar Nugroho',
    appliedDate: '2026-01-15',
    status: 'offered',
  },
  {
    id: 4,
    name: 'Dina Safitri',
    appliedDate: '2026-01-16',
    status: 'rejected',
  },
  {
    id: 5,
    name: 'Bagus Setiawan',
    appliedDate: '2026-01-18',
    status: 'screening',
  },
])

function getApplicantStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    screening: 'warning',
    interview: 'primary',
    offered: 'success',
    rejected: 'danger',
  }
  return map[status] || 'secondary'
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
          @click="router.push('/hrm/recruitment')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ job.position }}</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">{{ job.department }}</p>
        </div>
      </div>
      <BaseButton size="sm" :icon="Edit" @click="router.push(`/hrm/recruitment/${job.id}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Job Details</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 dark:text-gray-400 mb-1">Position</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Briefcase class="w-3.5 h-3.5 text-gray-400" /> {{ job.position }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 dark:text-gray-400 mb-1">Department</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Building2 class="w-3.5 h-3.5 text-gray-400" /> {{ job.department }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 dark:text-gray-400 mb-1">Employment Type</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ job.employmentType }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 dark:text-gray-400 mb-1">Salary Range</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <DollarSign class="w-3.5 h-3.5 text-gray-400" /> {{ job.salaryMin }} -
                {{ job.salaryMax }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 dark:text-gray-400 mb-1">Posted Date</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Calendar class="w-3.5 h-3.5 text-gray-400" /> {{ job.postedDate }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 dark:text-gray-400 mb-1">Closing Date</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Calendar class="w-3.5 h-3.5 text-gray-400" /> {{ job.closingDate }}
              </dd>
            </div>
          </dl>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Requirements</h3>
          </template>
          <div class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {{ job.requirements }}
          </div>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">
              Applicants ({{ applicants.length }})
            </h3>
          </template>
          <div class="space-y-3">
            <div
              v-for="applicant in applicants"
              :key="applicant.id"
              class="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <BaseAvatar :name="applicant.name" size="sm" />
              <div class="flex-1 min-w-0">
                <span class="font-medium text-sm text-gray-900 dark:text-gray-100">{{
                  applicant.name
                }}</span>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Applied {{ applicant.appliedDate }}
                </p>
              </div>
              <BaseBadge :variant="getApplicantStatusVariant(applicant.status)" size="sm">{{
                applicant.status
              }}</BaseBadge>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge
              :variant="job.status === 'open' ? 'success' : 'secondary'"
              size="lg"
              :dot="true"
              >{{ job.status }}</BaseBadge
            >
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
