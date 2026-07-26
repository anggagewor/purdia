<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, X, Zap, Building2, Rocket } from '@lucide/vue'
import { BaseButton, BaseBadge, BaseToggle } from '@purdia/ui'

const isYearly = ref(false)

interface Plan {
  name: string
  description: string
  icon: typeof Zap
  monthlyPrice: number
  features: { label: string; included: boolean }[]
  popular?: boolean
  cta: string
}

const plans: Plan[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small projects.',
    icon: Zap,
    monthlyPrice: 19,
    cta: 'Get Started',
    features: [
      { label: 'Up to 5 projects', included: true },
      { label: '1 GB storage', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Email support', included: true },
      { label: 'Custom domain', included: false },
      { label: 'API access', included: false },
      { label: 'SSO authentication', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    name: 'Professional',
    description: 'For growing teams that need more power.',
    icon: Rocket,
    monthlyPrice: 49,
    cta: 'Start Free Trial',
    popular: true,
    features: [
      { label: 'Unlimited projects', included: true },
      { label: '50 GB storage', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Priority email support', included: true },
      { label: 'Custom domain', included: true },
      { label: 'API access', included: true },
      { label: 'SSO authentication', included: false },
      { label: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs.',
    icon: Building2,
    monthlyPrice: 99,
    cta: 'Contact Sales',
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Unlimited storage', included: true },
      { label: 'Custom analytics & reports', included: true },
      { label: '24/7 phone & email support', included: true },
      { label: 'Custom domain', included: true },
      { label: 'Full API access', included: true },
      { label: 'SSO authentication', included: true },
      { label: 'Dedicated account manager', included: true },
    ],
  },
]

function getPrice(plan: Plan) {
  if (isYearly.value) {
    return Math.round(plan.monthlyPrice * 0.8)
  }
  return plan.monthlyPrice
}

const yearlyDiscount = computed(() => '20%')
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Simple, transparent pricing
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-3 text-lg">
        Choose the plan that fits your needs. Upgrade or downgrade at any time.
      </p>

      <!-- Toggle -->
      <div class="flex items-center justify-center gap-3 mt-6">
        <span
          class="text-sm font-medium"
          :class="!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
        >
          Monthly
        </span>
        <BaseToggle v-model="isYearly" size="md" />
        <span
          class="text-sm font-medium"
          :class="isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
        >
          Yearly
        </span>
        <BaseBadge v-if="isYearly" variant="success" size="sm">
          Save {{ yearlyDiscount }}
        </BaseBadge>
      </div>
    </div>

    <!-- Pricing cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div
        v-for="plan in plans"
        :key="plan.name"
        class="relative rounded-2xl border p-6 flex flex-col transition-shadow"
        :class="
          plan.popular
            ? 'border-primary-500 dark:border-primary-400 shadow-lg shadow-primary-500/10'
            : 'border-gray-200 dark:border-gray-700'
        "
      >
        <!-- Popular badge -->
        <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            class="px-3 py-1 text-xs font-semibold text-white bg-primary-600 rounded-full"
          >
            Most Popular
          </span>
        </div>

        <!-- Plan header -->
        <div class="mb-6">
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
            :class="
              plan.popular
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            "
          >
            <component :is="plan.icon" class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ plan.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ plan.description }}</p>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-bold text-gray-900 dark:text-white">
              ${{ getPrice(plan) }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              / {{ isYearly ? 'mo' : 'month' }}
            </span>
          </div>
          <p v-if="isYearly" class="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Billed annually (${{ getPrice(plan) * 12 }}/year)
          </p>
        </div>

        <!-- CTA -->
        <BaseButton
          :variant="plan.popular ? 'primary' : 'outline'"
          class="w-full mb-6"
        >
          {{ plan.cta }}
        </BaseButton>

        <!-- Features -->
        <div class="flex-1">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
            What's included
          </p>
          <ul class="space-y-2.5">
            <li
              v-for="feature in plan.features"
              :key="feature.label"
              class="flex items-center gap-2.5 text-sm"
            >
              <Check
                v-if="feature.included"
                class="w-4 h-4 text-green-500 shrink-0"
              />
              <X
                v-else
                class="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0"
              />
              <span
                :class="
                  feature.included
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-gray-400 dark:text-gray-500'
                "
              >
                {{ feature.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- FAQ / Bottom section -->
    <div class="text-center max-w-xl mx-auto pt-8">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        All plans include a 14-day free trial. No credit card required.
        <br />
        Need a custom plan?
        <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
          Contact us
        </a>
      </p>
    </div>
  </div>
</template>
