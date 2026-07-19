<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseButton, BaseTabs, TabPanel, BaseSelect } from '@purdia/ui'
import { Download } from '@lucide/vue'
import type { TabItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const activeTab = ref('balance-sheet')
const period = ref<string | number>('2025-07')

const tabs: TabItem[] = [
  { key: 'balance-sheet', label: 'Balance Sheet' },
  { key: 'income-statement', label: 'Income Statement' },
  { key: 'cash-flow', label: 'Cash Flow' },
]

const periodOptions: SelectOption[] = [
  { label: 'July 2025', value: '2025-07' },
  { label: 'June 2025', value: '2025-06' },
  { label: 'May 2025', value: '2025-05' },
  { label: 'Q2 2025', value: '2025-Q2' },
  { label: 'Q1 2025', value: '2025-Q1' },
  { label: 'FY 2024', value: '2024' },
]

function formatRp(n: number) {
  return 'Rp ' + Math.abs(n).toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Financial Statements</h1>
        <p class="text-gray-500 mt-1">Laporan keuangan — neraca, laba rugi, dan arus kas.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseSelect v-model="period" :options="periodOptions" :searchable="false" size="sm" />
        <BaseButton variant="outline" size="sm" :icon="Download">Export PDF</BaseButton>
      </div>
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <!-- Balance Sheet -->
        <TabPanel name="balance-sheet">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Assets -->
            <div>
              <h4 class="font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
                ASSETS
              </h4>
              <div class="space-y-1">
                <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 mb-2">
                  Current Assets
                </h5>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Cash & Bank</span
                  ><span class="text-sm font-mono">{{ formatRp(245000000) }}</span>
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Accounts Receivable</span
                  ><span class="text-sm font-mono">{{ formatRp(78000000) }}</span>
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Inventory</span
                  ><span class="text-sm font-mono">{{ formatRp(42000000) }}</span>
                </div>
                <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
                  <span class="text-sm">Total Current Assets</span
                  ><span class="text-sm font-mono">{{ formatRp(365000000) }}</span>
                </div>

                <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
                  Fixed Assets
                </h5>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Property & Equipment</span
                  ><span class="text-sm font-mono">{{ formatRp(350000000) }}</span>
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Accumulated Depreciation</span
                  ><span class="text-sm font-mono text-red-600">({{ formatRp(75000000) }})</span>
                </div>
                <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
                  <span class="text-sm">Total Fixed Assets</span
                  ><span class="text-sm font-mono">{{ formatRp(275000000) }}</span>
                </div>

                <div
                  class="flex justify-between py-2 mt-3 border-t-2 border-gray-800 font-bold text-base"
                >
                  <span>TOTAL ASSETS</span><span class="font-mono">{{ formatRp(640000000) }}</span>
                </div>
              </div>
            </div>

            <!-- Liabilities + Equity -->
            <div>
              <h4 class="font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
                LIABILITIES & EQUITY
              </h4>
              <div class="space-y-1">
                <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 mb-2">
                  Current Liabilities
                </h5>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Accounts Payable</span
                  ><span class="text-sm font-mono">{{ formatRp(35000000) }}</span>
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Tax Payable</span
                  ><span class="text-sm font-mono">{{ formatRp(12000000) }}</span>
                </div>
                <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
                  <span class="text-sm">Total Current Liabilities</span
                  ><span class="text-sm font-mono">{{ formatRp(47000000) }}</span>
                </div>

                <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
                  Long-term Liabilities
                </h5>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Bank Loan</span
                  ><span class="text-sm font-mono">{{ formatRp(150000000) }}</span>
                </div>
                <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
                  <span class="text-sm">Total Liabilities</span
                  ><span class="text-sm font-mono">{{ formatRp(197000000) }}</span>
                </div>

                <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
                  Equity
                </h5>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Owner's Equity</span
                  ><span class="text-sm font-mono">{{ formatRp(274000000) }}</span>
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-sm text-gray-700">Retained Earnings</span
                  ><span class="text-sm font-mono">{{ formatRp(169000000) }}</span>
                </div>
                <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
                  <span class="text-sm">Total Equity</span
                  ><span class="text-sm font-mono">{{ formatRp(443000000) }}</span>
                </div>

                <div
                  class="flex justify-between py-2 mt-3 border-t-2 border-gray-800 font-bold text-base"
                >
                  <span>TOTAL LIAB. & EQUITY</span
                  ><span class="font-mono">{{ formatRp(640000000) }}</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <!-- Income Statement -->
        <TabPanel name="income-statement">
          <div class="max-w-2xl space-y-1">
            <h4 class="font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
              INCOME STATEMENT — July 2025
            </h4>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 mb-2">
              Revenue
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Sales Revenue</span
              ><span class="text-sm font-mono">{{ formatRp(120000000) }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Service Revenue</span
              ><span class="text-sm font-mono">{{ formatRp(18000000) }}</span>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
              <span class="text-sm">Total Revenue</span
              ><span class="text-sm font-mono">{{ formatRp(138000000) }}</span>
            </div>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
              Cost of Goods Sold
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">COGS</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(48000000) }})</span>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
              <span class="text-sm">Gross Profit</span
              ><span class="text-sm font-mono">{{ formatRp(90000000) }}</span>
            </div>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
              Operating Expenses
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Salary Expense</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(45000000) }})</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Rent Expense</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(15000000) }})</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Utilities</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(3500000) }})</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Depreciation</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(3500000) }})</span>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
              <span class="text-sm">Total Operating Expenses</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(67000000) }})</span>
            </div>

            <div class="flex justify-between py-1 mt-2 font-semibold">
              <span class="text-sm">Operating Income</span
              ><span class="text-sm font-mono">{{ formatRp(23000000) }}</span>
            </div>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
              Tax
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Income Tax (PPh)</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(5060000) }})</span>
            </div>

            <div
              class="flex justify-between py-2 mt-3 border-t-2 border-gray-800 font-bold text-base"
            >
              <span>NET INCOME</span
              ><span class="font-mono text-emerald-600">{{ formatRp(17940000) }}</span>
            </div>
          </div>
        </TabPanel>

        <!-- Cash Flow -->
        <TabPanel name="cash-flow">
          <div class="max-w-2xl space-y-1">
            <h4 class="font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
              CASH FLOW STATEMENT — July 2025
            </h4>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 mb-2">
              Operating Activities
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Net Income</span
              ><span class="text-sm font-mono">{{ formatRp(17940000) }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Depreciation</span
              ><span class="text-sm font-mono">{{ formatRp(3500000) }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Decrease in Receivables</span
              ><span class="text-sm font-mono">{{ formatRp(18000000) }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Increase in Payables</span
              ><span class="text-sm font-mono">{{ formatRp(5000000) }}</span>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
              <span class="text-sm">Net Cash from Operations</span
              ><span class="text-sm font-mono">{{ formatRp(44440000) }}</span>
            </div>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
              Investing Activities
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Purchase of Equipment</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(12000000) }})</span>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
              <span class="text-sm">Net Cash from Investing</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(12000000) }})</span>
            </div>

            <h5 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
              Financing Activities
            </h5>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-700">Loan Repayment</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(10000000) }})</span>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-100 font-semibold">
              <span class="text-sm">Net Cash from Financing</span
              ><span class="text-sm font-mono text-red-600">({{ formatRp(10000000) }})</span>
            </div>

            <div
              class="flex justify-between py-2 mt-3 border-t-2 border-gray-800 font-bold text-base"
            >
              <span>NET CHANGE IN CASH</span
              ><span class="font-mono text-emerald-600">{{ formatRp(22440000) }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-sm text-gray-500">Opening Cash Balance</span
              ><span class="text-sm font-mono">{{ formatRp(222560000) }}</span>
            </div>
            <div class="flex justify-between py-1 font-semibold">
              <span class="text-sm">Closing Cash Balance</span
              ><span class="text-sm font-mono">{{ formatRp(245000000) }}</span>
            </div>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>
  </div>
</template>
