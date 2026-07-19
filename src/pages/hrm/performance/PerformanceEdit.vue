<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const employeeOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: 'andi-pratama' },
  { label: 'Dewi Lestari', value: 'dewi-lestari' },
  { label: 'Rudi Hermawan', value: 'rudi-hermawan' },
  { label: 'Maya Sari', value: 'maya-sari' },
  { label: 'Hendra Gunawan', value: 'hendra-gunawan' },
  { label: 'Linda Susanti', value: 'linda-susanti' },
  { label: 'Farhan Rizky', value: 'farhan-rizky' },
  { label: 'Siska Amelia', value: 'siska-amelia' },
]

const periodOptions: SelectOption[] = [
  { label: 'Q1 2026', value: 'q1-2026' },
  { label: 'Q2 2026', value: 'q2-2026' },
  { label: 'Q3 2026', value: 'q3-2026' },
  { label: 'Q4 2026', value: 'q4-2026' },
]

const ratingOptions: SelectOption[] = [
  { label: '1 - Needs Improvement', value: '1' },
  { label: '2 - Below Expectations', value: '2' },
  { label: '3 - Meets Expectations', value: '3' },
  { label: '4 - Exceeds Expectations', value: '4' },
  { label: '5 - Outstanding', value: '5' },
]

const reviewerOptions: SelectOption[] = [
  { label: 'Bambang Widodo', value: 'bambang-widodo' },
  { label: 'Nadia Putri', value: 'nadia-putri' },
  { label: 'Siska Amelia', value: 'siska-amelia' },
]

const form = ref({
  employee: 'andi-pratama' as string | number,
  period: 'q2-2026' as string | number,
  rating: '4' as string | number,
  reviewer: 'bambang-widodo' as string | number,
  goals:
    '- Menyelesaikan migrasi frontend ke Vue 3 Composition API\n- Meningkatkan code coverage test ke 80%\n- Mentoring 2 junior developer',
  feedback:
    'Andi menunjukkan performa yang sangat baik selama kuartal ini. Berhasil memimpin migrasi frontend tepat waktu dan kualitas kode meningkat secara signifikan.',
})

function handleSave() {
  router.push(`/hrm/performance/${route.params.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/performance')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Performance Review</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Update performance evaluation details.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.employee"
            label="Employee"
            :options="employeeOptions"
            placeholder="Select employee..."
          />
          <BaseSelect
            v-model="form.period"
            label="Period"
            :options="periodOptions"
            placeholder="Select period..."
            :searchable="false"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.rating"
            label="Rating"
            :options="ratingOptions"
            placeholder="Select rating..."
            :searchable="false"
          />
          <BaseSelect
            v-model="form.reviewer"
            label="Reviewer"
            :options="reviewerOptions"
            placeholder="Select reviewer..."
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Goals</label
          >
          <textarea
            v-model="form.goals"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Describe the goals and objectives..."
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Feedback</label
          >
          <textarea
            v-model="form.feedback"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Provide feedback for this review..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/performance')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
