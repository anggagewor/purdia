<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseCard, BaseInput, BaseButton, BaseAlert, BaseProgress } from '@purdia/ui'
import { Lock, Eye, EyeOff, CheckCircle, ShieldCheck } from '@lucide/vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const saved = ref(false)

const passwordStrength = computed(() => {
  const p = newPassword.value
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score += 25
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score += 25
  if (/\d/.test(p)) score += 25
  if (/[^a-zA-Z0-9]/.test(p)) score += 25
  return score
})

const strengthLabel = computed(() => {
  if (passwordStrength.value === 0) return ''
  if (passwordStrength.value <= 25) return 'Weak'
  if (passwordStrength.value <= 50) return 'Fair'
  if (passwordStrength.value <= 75) return 'Good'
  return 'Strong'
})

const strengthVariant = computed(() => {
  if (passwordStrength.value <= 25) return 'danger' as const
  if (passwordStrength.value <= 50) return 'warning' as const
  if (passwordStrength.value <= 75) return 'info' as const
  return 'success' as const
})

const errors = computed(() => {
  const errs: string[] = []
  if (confirmPassword.value && newPassword.value !== confirmPassword.value) {
    errs.push('Passwords do not match')
  }
  return errs
})

const canSubmit = computed(() => {
  return (
    currentPassword.value.length > 0 &&
    newPassword.value.length >= 8 &&
    newPassword.value === confirmPassword.value
  )
})

function handleSubmit() {
  if (!canSubmit.value) return
  saved.value = true
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  setTimeout(() => (saved.value = false), 3000)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Change Password</h1>
      <p class="text-gray-500 mt-1">Update your password to keep your account secure.</p>
    </div>

    <BaseAlert v-if="saved" variant="success" title="Password Updated" :icon="CheckCircle">
      Your password has been changed successfully.
    </BaseAlert>

    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <ShieldCheck class="w-5 h-5 text-primary-500" />
          <h4 class="font-semibold">Update Password</h4>
        </div>
      </template>

      <div class="space-y-4">
        <!-- Current Password -->
        <div class="relative">
          <BaseInput
            v-model="currentPassword"
            :type="showCurrent ? 'text' : 'password'"
            label="Current Password"
            placeholder="Enter current password"
            :icon="Lock"
          />
          <button
            class="absolute right-3 top-[2.1rem] text-gray-400 hover:text-gray-600 cursor-pointer"
            @click="showCurrent = !showCurrent"
            type="button"
          >
            <component :is="showCurrent ? EyeOff : Eye" class="w-4 h-4" />
          </button>
        </div>

        <!-- New Password -->
        <div class="relative">
          <BaseInput
            v-model="newPassword"
            :type="showNew ? 'text' : 'password'"
            label="New Password"
            placeholder="Enter new password"
            :icon="Lock"
            hint="Minimum 8 characters"
          />
          <button
            class="absolute right-3 top-[2.1rem] text-gray-400 hover:text-gray-600 cursor-pointer"
            @click="showNew = !showNew"
            type="button"
          >
            <component :is="showNew ? EyeOff : Eye" class="w-4 h-4" />
          </button>
        </div>

        <!-- Password Strength -->
        <div v-if="newPassword" class="space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Password strength</span>
            <span
              class="text-xs font-medium"
              :class="{
                'text-red-500': strengthVariant === 'danger',
                'text-amber-500': strengthVariant === 'warning',
                'text-cyan-500': strengthVariant === 'info',
                'text-emerald-500': strengthVariant === 'success',
              }"
              >{{ strengthLabel }}</span
            >
          </div>
          <BaseProgress :value="passwordStrength" :variant="strengthVariant" size="sm" />
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <BaseInput
            v-model="confirmPassword"
            :type="showConfirm ? 'text' : 'password'"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            :icon="Lock"
            :error="errors[0]"
          />
          <button
            class="absolute right-3 top-[2.1rem] text-gray-400 hover:text-gray-600 cursor-pointer"
            @click="showConfirm = !showConfirm"
            type="button"
          >
            <component :is="showConfirm ? EyeOff : Eye" class="w-4 h-4" />
          </button>
        </div>

        <!-- Requirements -->
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-xs font-medium text-gray-600 mb-2">Password requirements:</p>
          <ul class="space-y-1">
            <li
              class="flex items-center gap-2 text-xs"
              :class="newPassword.length >= 8 ? 'text-emerald-600' : 'text-gray-400'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="newPassword.length >= 8 ? 'bg-emerald-500' : 'bg-gray-300'"
              />
              At least 8 characters
            </li>
            <li
              class="flex items-center gap-2 text-xs"
              :class="/[A-Z]/.test(newPassword) ? 'text-emerald-600' : 'text-gray-400'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="/[A-Z]/.test(newPassword) ? 'bg-emerald-500' : 'bg-gray-300'"
              />
              One uppercase letter
            </li>
            <li
              class="flex items-center gap-2 text-xs"
              :class="/\d/.test(newPassword) ? 'text-emerald-600' : 'text-gray-400'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="/\d/.test(newPassword) ? 'bg-emerald-500' : 'bg-gray-300'"
              />
              One number
            </li>
            <li
              class="flex items-center gap-2 text-xs"
              :class="/[^a-zA-Z0-9]/.test(newPassword) ? 'text-emerald-600' : 'text-gray-400'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="/[^a-zA-Z0-9]/.test(newPassword) ? 'bg-emerald-500' : 'bg-gray-300'"
              />
              One special character
            </li>
          </ul>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2 w-full">
          <BaseButton variant="ghost">Cancel</BaseButton>
          <BaseButton :disabled="!canSubmit" @click="handleSubmit">Update Password</BaseButton>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
