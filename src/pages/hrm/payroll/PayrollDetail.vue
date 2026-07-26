<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseTable } from '@purdia/ui'
import { ArrowLeft, Edit, Printer } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const payroll = ref({
  id: Number(route.params.id),
  period: 'Desember 2024',
  employee: 'Andi Pratama',
  employeeId: 'EMP-001',
  department: 'Engineering',
  position: 'Senior Developer',
  bankName: 'BCA',
  bankAccount: '1234567890',
  status: 'paid',
  paidDate: '2024-12-25',
  earnings: [
    { label: 'Gaji Pokok', amount: 'Rp 25.000.000' },
    { label: 'Tunjangan Transportasi', amount: 'Rp 2.000.000' },
    { label: 'Tunjangan Makan', amount: 'Rp 1.500.000' },
    { label: 'Tunjangan Komunikasi', amount: 'Rp 500.000' },
    { label: 'Bonus Kinerja', amount: 'Rp 1.000.000' },
  ],
  deductions: [
    { label: 'BPJS Kesehatan', amount: 'Rp 500.000' },
    { label: 'BPJS Ketenagakerjaan', amount: 'Rp 750.000' },
    { label: 'PPh 21', amount: 'Rp 1.250.000' },
  ],
  totalEarnings: 'Rp 30.000.000',
  totalDeductions: 'Rp 2.500.000',
  netSalary: 'Rp 27.500.000',
})

const payslipColumns: TableColumn[] = [
  { key: 'label', label: 'Item' },
  { key: 'amount', label: 'Amount', align: 'right' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/hrm/payroll')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Payslip Detail</h1>
          <p class="text-gray-500 mt-1">{{ payroll.period }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="ghost" size="sm" :icon="Printer">Print</BaseButton>
        <BaseButton size="sm" :icon="Edit" @click="router.push(`/hrm/payroll/${payroll.id}/edit`)"
          >Edit</BaseButton
        >
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Employee Information</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Employee Name</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.employee }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Employee ID</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.employeeId }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Department</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.department }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Position</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.position }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Bank</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.bankName }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Account No.</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.bankAccount }}
              </dd>
            </div>
          </dl>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Earnings</h3>
          </template>
          <BaseTable :columns="payslipColumns" :data="payroll.earnings" :compact="true" :hoverable="false">
            <template #cell-amount="{ value }">
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ value }}</span>
            </template>
            <template #footer>
              <tr class="border-t-2 border-gray-200 dark:border-gray-600">
                <td class="px-3 py-2 font-semibold text-gray-900 dark:text-gray-100">Total Earnings</td>
                <td class="px-3 py-2 text-right font-bold text-gray-900 dark:text-gray-100">
                  {{ payroll.totalEarnings }}
                </td>
              </tr>
            </template>
          </BaseTable>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Deductions</h3>
          </template>
          <BaseTable :columns="payslipColumns" :data="payroll.deductions" :compact="true" :hoverable="false">
            <template #cell-amount="{ value }">
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ value }}</span>
            </template>
            <template #footer>
              <tr class="border-t-2 border-gray-200 dark:border-gray-600">
                <td class="px-3 py-2 font-semibold text-gray-900 dark:text-gray-100">
                  Total Deductions
                </td>
                <td class="px-3 py-2 text-right font-bold text-danger-600">
                  {{ payroll.totalDeductions }}
                </td>
              </tr>
            </template>
          </BaseTable>
        </BaseCard>
      </div>

      <div class="space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge
              :variant="
                payroll.status === 'paid'
                  ? 'success'
                  : payroll.status === 'processed'
                    ? 'info'
                    : 'secondary'
              "
              size="lg"
              :dot="true"
              >{{ payroll.status }}</BaseBadge
            >
            <p v-if="payroll.paidDate" class="text-xs text-gray-500">
              Paid on {{ payroll.paidDate }}
            </p>
          </div>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Net Pay</h3>
          </template>
          <div class="text-center py-4">
            <p class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {{ payroll.netSalary }}
            </p>
            <p class="text-xs text-gray-500 mt-1">{{ payroll.period }}</p>
          </div>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Summary</h3>
          </template>
          <dl class="space-y-3">
            <div class="flex justify-between">
              <dt class="text-sm text-gray-500">Total Earnings</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ payroll.totalEarnings }}
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-sm text-gray-500">Total Deductions</dt>
              <dd class="text-sm font-medium text-danger-600">{{ payroll.totalDeductions }}</dd>
            </div>
            <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <dt class="text-sm font-semibold text-gray-900 dark:text-gray-100">Net Salary</dt>
              <dd class="text-sm font-bold text-gray-900 dark:text-gray-100">
                {{ payroll.netSalary }}
              </dd>
            </div>
          </dl>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
