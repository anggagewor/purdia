<script setup lang="ts">
import { ref, computed } from 'vue'
import { User, Building2, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Check } from '@lucide/vue'
import { BaseCard, BaseInput, BaseButton, BaseAlert } from '@purdia/ui'

interface StepItem {
  title: string
  description: string
  icon: typeof User
}

const steps: StepItem[] = [
  { title: 'Personal Info', description: 'Basic details', icon: User },
  { title: 'Company', description: 'Organization info', icon: Building2 },
  { title: 'Billing', description: 'Payment method', icon: CreditCard },
  { title: 'Confirmation', description: 'Review & submit', icon: CheckCircle },
]

const currentStep = ref(0)

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  industry: '',
  employees: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  billingAddress: '',
})

// Validation
const errors = ref<Record<string, string>>({})

function validateStep(step: number): boolean {
  errors.value = {}

  if (step === 0) {
    if (!form.value.firstName) errors.value.firstName = 'First name is required'
    if (!form.value.lastName) errors.value.lastName = 'Last name is required'
    if (!form.value.email) errors.value.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
      errors.value.email = 'Invalid email format'
  }

  if (step === 1) {
    if (!form.value.company) errors.value.company = 'Company name is required'
    if (!form.value.industry) errors.value.industry = 'Industry is required'
  }

  if (step === 2) {
    if (!form.value.cardName) errors.value.cardName = 'Name on card is required'
    if (!form.value.cardNumber) errors.value.cardNumber = 'Card number is required'
    if (!form.value.expiry) errors.value.expiry = 'Expiry date is required'
    if (!form.value.cvv) errors.value.cvv = 'CVV is required'
  }

  return Object.keys(errors.value).length === 0
}

function nextStep() {
  if (validateStep(currentStep.value)) {
    currentStep.value++
  }
}

function prevStep() {
  currentStep.value--
}

const submitted = ref(false)

function submit() {
  submitted.value = true
}

const progressWidth = computed(() => ((currentStep.value + 1) / steps.length) * 100)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Wizard / Multi-step Form</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Multi-step form with validation, progress indicator, and review step.
      </p>
    </div>

    <!-- Success state -->
    <div v-if="submitted" class="max-w-2xl mx-auto">
      <BaseCard>
        <div class="text-center py-12">
          <div
            class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
          >
            <CheckCircle class="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Registration Complete!
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            Your account has been created successfully. You'll receive a confirmation email shortly.
          </p>
          <BaseButton
            variant="primary"
            @click="submitted = false; currentStep = 0"
          >
            Start Over
          </BaseButton>
        </div>
      </BaseCard>
    </div>

    <!-- Wizard -->
    <div v-else class="max-w-3xl mx-auto">
      <!-- Step indicators -->
      <div class="mb-8">
        <div class="flex items-center justify-between relative">
          <!-- Progress bar background -->
          <div class="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
          <!-- Progress bar fill -->
          <div
            class="absolute top-5 left-0 h-0.5 bg-primary-600 transition-all duration-300"
            :style="{ width: `${progressWidth - 100 / steps.length / 2}%` }"
          ></div>

          <div
            v-for="(step, index) in steps"
            :key="index"
            class="relative flex flex-col items-center"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 z-10"
              :class="
                index < currentStep
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : index === currentStep
                    ? 'bg-white dark:bg-gray-800 border-primary-600 text-primary-600'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'
              "
            >
              <Check v-if="index < currentStep" class="w-5 h-5" />
              <component v-else :is="step.icon" class="w-5 h-5" />
            </div>
            <div class="mt-2 text-center">
              <p
                class="text-xs font-medium"
                :class="
                  index <= currentStep
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 dark:text-gray-500'
                "
              >
                {{ step.title }}
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form content -->
      <BaseCard>
        <!-- Step 1: Personal Info -->
        <div v-if="currentStep === 0" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Tell us about yourself to get started.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <BaseInput
              v-model="form.firstName"
              label="First Name"
              placeholder="John"
              :error="errors.firstName"
              required
            />
            <BaseInput
              v-model="form.lastName"
              label="Last Name"
              placeholder="Doe"
              :error="errors.lastName"
              required
            />
          </div>
          <BaseInput
            v-model="form.email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            :error="errors.email"
            required
          />
          <BaseInput v-model="form.phone" label="Phone Number" placeholder="+1 (555) 000-0000" />
        </div>

        <!-- Step 2: Company -->
        <div v-if="currentStep === 1" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Company Information</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tell us about your organization.</p>

          <BaseInput
            v-model="form.company"
            label="Company Name"
            placeholder="Acme Inc."
            :error="errors.company"
            required
          />
          <BaseInput v-model="form.website" label="Website" placeholder="https://example.com" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.industry"
              label="Industry"
              placeholder="Technology"
              :error="errors.industry"
              required
            />
            <BaseInput v-model="form.employees" label="Number of Employees" placeholder="50-100" />
          </div>
        </div>

        <!-- Step 3: Billing -->
        <div v-if="currentStep === 2" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Add your payment method for billing.
          </p>

          <BaseInput
            v-model="form.cardName"
            label="Name on Card"
            placeholder="John Doe"
            :error="errors.cardName"
            required
          />
          <BaseInput
            v-model="form.cardNumber"
            label="Card Number"
            placeholder="4242 4242 4242 4242"
            :error="errors.cardNumber"
            required
          />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.expiry"
              label="Expiry Date"
              placeholder="MM/YY"
              :error="errors.expiry"
              required
            />
            <BaseInput
              v-model="form.cvv"
              label="CVV"
              placeholder="123"
              :error="errors.cvv"
              required
            />
          </div>
          <BaseInput
            v-model="form.billingAddress"
            label="Billing Address"
            placeholder="123 Main Street, City"
          />
        </div>

        <!-- Step 4: Review -->
        <div v-if="currentStep === 3" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Review & Confirm</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Please review your information before submitting.
          </p>

          <BaseAlert variant="info">
            Make sure all information is correct. You can go back to edit any section.
          </BaseAlert>

          <div class="space-y-4 mt-4">
            <!-- Personal -->
            <div
              class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
            >
              <div class="flex items-center gap-2 mb-3">
                <User class="w-4 h-4 text-primary-600" />
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Personal Info</h4>
              </div>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Name:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">
                    {{ form.firstName }} {{ form.lastName }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Email:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">{{ form.email }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">
                    {{ form.phone || '—' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Company -->
            <div
              class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
            >
              <div class="flex items-center gap-2 mb-3">
                <Building2 class="w-4 h-4 text-primary-600" />
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
              </div>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Company:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">{{ form.company }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Industry:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">{{ form.industry }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Website:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">
                    {{ form.website || '—' }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Employees:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">
                    {{ form.employees || '—' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Billing -->
            <div
              class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
            >
              <div class="flex items-center gap-2 mb-3">
                <CreditCard class="w-4 h-4 text-primary-600" />
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Billing</h4>
              </div>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Card:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">
                    **** **** **** {{ form.cardNumber.slice(-4) }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Expiry:</span>
                  <span class="ml-1 text-gray-900 dark:text-white">{{ form.expiry }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div
          class="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <BaseButton v-if="currentStep > 0" variant="ghost" @click="prevStep">
            <template #icon-left><ArrowLeft class="w-4 h-4" /></template>
            Previous
          </BaseButton>
          <div v-else></div>

          <BaseButton v-if="currentStep < steps.length - 1" variant="primary" @click="nextStep">
            Next
            <template #icon-right><ArrowRight class="w-4 h-4" /></template>
          </BaseButton>
          <BaseButton v-else variant="primary" @click="submit">
            <template #icon-left><Check class="w-4 h-4" /></template>
            Submit
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
