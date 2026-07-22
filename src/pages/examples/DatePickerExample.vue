<script setup lang="ts">
import { ref } from 'vue'
import { BaseDatePicker, BaseCard, BaseSelect } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

// Date
const dateValue = ref('')
const dateFormatted = ref('')
const dateMysql = ref('')
const dateCustom = ref('')

// Time
const timeValue = ref('')
const timeFormatted = ref('')

// DateTime
const datetimeValue = ref('')
const datetimeMysql = ref('')

// Range
const rangeValue = ref<[string, string]>(['', ''])
const rangeFormatted = ref<[string, string]>(['', ''])

// Format demos
const formatOptions: SelectOption[] = [
  { label: 'YYYY-MM-DD (ISO)', value: 'YYYY-MM-DD' },
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'D M YYYY', value: 'D M YYYY' },
  { label: 'YYYY-MM-DD HH:mm:ss (MySQL)', value: 'YYYY-MM-DD HH:mm:ss' },
  { label: 'DD/MM/YYYY HH:mm', value: 'DD/MM/YYYY HH:mm' },
  { label: 'HH:mm:ss', value: 'HH:mm:ss' },
  { label: 'hh:mm A (12h)', value: 'hh:mm A' },
]

const selectedFormat = ref<string | number>('YYYY-MM-DD')
const customFormatValue = ref('')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Date Picker</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Date, time, datetime, dan range picker dengan custom format output.
      </p>
    </div>

    <!-- Date Picker -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Date Picker</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseDatePicker
          v-model="dateValue"
          mode="date"
          label="Default (YYYY-MM-DD)"
          format="YYYY-MM-DD"
          placeholder="Pick a date..."
        />
        <BaseDatePicker
          v-model="dateFormatted"
          mode="date"
          label="DD/MM/YYYY"
          format="DD/MM/YYYY"
          placeholder="Pick a date..."
        />
        <BaseDatePicker
          v-model="dateMysql"
          mode="date"
          label="MySQL format"
          format="YYYY-MM-DD"
          placeholder="Select date..."
        />
        <BaseDatePicker
          v-model="dateCustom"
          mode="date"
          label="MM/DD/YYYY"
          format="MM/DD/YYYY"
          placeholder="Select..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
        <p class="text-xs text-gray-500">Raw values:</p>
        <code class="text-xs text-gray-700"
          >dateValue: {{ dateValue || '—' }} | dateFormatted: {{ dateFormatted || '—' }}</code
        >
      </div>
    </BaseCard>

    <!-- Time Picker -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Time Picker</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseDatePicker
          v-model="timeValue"
          mode="time"
          label="Time (HH:mm:ss)"
          format="HH:mm:ss"
          placeholder="Select time..."
        />
        <BaseDatePicker
          v-model="timeFormatted"
          mode="time"
          label="12-hour format"
          format="hh:mm A"
          placeholder="Select time..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
        <p class="text-xs text-gray-500">Raw values:</p>
        <code class="text-xs text-gray-700"
          >time: {{ timeValue || '—' }} | 12h: {{ timeFormatted || '—' }}</code
        >
      </div>
    </BaseCard>

    <!-- DateTime Picker -->
    <BaseCard>
      <template #header><h4 class="font-semibold">DateTime Picker</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseDatePicker
          v-model="datetimeValue"
          mode="datetime"
          label="DateTime (YYYY-MM-DD HH:mm)"
          format="YYYY-MM-DD HH:mm"
          placeholder="Pick date & time..."
        />
        <BaseDatePicker
          v-model="datetimeMysql"
          mode="datetime"
          label="MySQL DateTime"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="MySQL format..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
        <p class="text-xs text-gray-500">Raw values:</p>
        <code class="text-xs text-gray-700"
          >datetime: {{ datetimeValue || '—' }} | mysql: {{ datetimeMysql || '—' }}</code
        >
      </div>
    </BaseCard>

    <!-- Range Picker -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Range Picker</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseDatePicker
          v-model="rangeValue"
          mode="range"
          label="Date Range (YYYY-MM-DD)"
          format="YYYY-MM-DD"
          placeholder="Select start → end"
        />
        <BaseDatePicker
          v-model="rangeFormatted"
          mode="range"
          label="Range (DD/MM/YYYY)"
          format="DD/MM/YYYY"
          placeholder="Select range..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
        <p class="text-xs text-gray-500">Raw values:</p>
        <code class="text-xs text-gray-700"
          >range: [{{ rangeValue[0] || '—' }}, {{ rangeValue[1] || '—' }}]</code
        >
      </div>
    </BaseCard>

    <!-- Custom Format -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Custom Format</h4></template>
      <p class="text-sm text-gray-500 mb-4">
        Pilih format output yang diinginkan. Value yang di-emit tetap ISO, tapi display mengikuti
        format.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelect
          v-model="selectedFormat"
          label="Choose Format"
          :options="formatOptions"
          :searchable="false"
        />
        <BaseDatePicker
          v-model="customFormatValue"
          mode="datetime"
          label="Preview"
          :format="selectedFormat as string"
          placeholder="Try different formats..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
        <p class="text-xs text-gray-500">
          Raw value: <code class="text-gray-700">{{ customFormatValue || '—' }}</code>
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Format used: <code class="text-gray-700">{{ selectedFormat }}</code>
        </p>
      </div>
    </BaseCard>

    <!-- Sizes & States -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes & States</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseDatePicker mode="date" label="Small" size="sm" placeholder="sm..." />
        <BaseDatePicker mode="date" label="Medium (default)" size="md" placeholder="md..." />
        <BaseDatePicker mode="date" label="Large" size="lg" placeholder="lg..." />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <BaseDatePicker
          mode="date"
          label="With Error"
          error="Date is required"
          placeholder="Select..."
        />
        <BaseDatePicker
          mode="date"
          label="Disabled"
          :disabled="true"
          placeholder="Can't select..."
        />
        <BaseDatePicker
          mode="date"
          label="Not Clearable"
          :clearable="false"
          placeholder="Select..."
        />
      </div>
    </BaseCard>

    <!-- Format Reference -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Format Tokens</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Token</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Output</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">YYYY</code>
              </td>
              <td class="py-1.5 pr-4">2025</td>
              <td class="py-1.5">4-digit year</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">YY</code>
              </td>
              <td class="py-1.5 pr-4">25</td>
              <td class="py-1.5">2-digit year</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">MM</code>
              </td>
              <td class="py-1.5 pr-4">01–12</td>
              <td class="py-1.5">Month (zero-padded)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">M</code>
              </td>
              <td class="py-1.5 pr-4">1–12</td>
              <td class="py-1.5">Month (no padding)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">DD</code>
              </td>
              <td class="py-1.5 pr-4">01–31</td>
              <td class="py-1.5">Day (zero-padded)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">D</code>
              </td>
              <td class="py-1.5 pr-4">1–31</td>
              <td class="py-1.5">Day (no padding)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">HH</code>
              </td>
              <td class="py-1.5 pr-4">00–23</td>
              <td class="py-1.5">Hours (24h, padded)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">hh</code>
              </td>
              <td class="py-1.5 pr-4">01–12</td>
              <td class="py-1.5">Hours (12h, padded)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">mm</code>
              </td>
              <td class="py-1.5 pr-4">00–59</td>
              <td class="py-1.5">Minutes (padded)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">ss</code>
              </td>
              <td class="py-1.5 pr-4">00–59</td>
              <td class="py-1.5">Seconds (padded)</td>
            </tr>
            <tr>
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">A / a</code>
              </td>
              <td class="py-1.5 pr-4">AM/PM</td>
              <td class="py-1.5">Meridiem (upper/lower)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseDatePicker } from '@purdia/ui'

const date = ref('')
const time = ref('')
const datetime = ref('')
const range = ref&lt;[string, string]&gt;(['', ''])
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Date --&gt;
  &lt;BaseDatePicker v-model="date" mode="date" format="YYYY-MM-DD" /&gt;

  &lt;!-- Time --&gt;
  &lt;BaseDatePicker v-model="time" mode="time" format="HH:mm:ss" /&gt;

  &lt;!-- DateTime (MySQL) --&gt;
  &lt;BaseDatePicker v-model="datetime" mode="datetime" format="YYYY-MM-DD HH:mm:ss" /&gt;

  &lt;!-- Range --&gt;
  &lt;BaseDatePicker v-model="range" mode="range" format="DD/MM/YYYY" /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>

    <!-- Props -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Default</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">modelValue</code>
              </td>
              <td class="py-2 pr-4">string | [string, string]</td>
              <td class="py-2 pr-4">''</td>
              <td class="py-2">Selected value (ISO for date/time, array for range)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">mode</code>
              </td>
              <td class="py-2 pr-4">'date' | 'time' | 'datetime' | 'range'</td>
              <td class="py-2 pr-4">'date'</td>
              <td class="py-2">Picker mode</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">format</code>
              </td>
              <td class="py-2 pr-4">string</td>
              <td class="py-2 pr-4">'YYYY-MM-DD'</td>
              <td class="py-2">Display format (uses tokens above)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">size</code>
              </td>
              <td class="py-2 pr-4">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4">'md'</td>
              <td class="py-2">Input size</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">clearable</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Show clear button</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">disabled</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Disable picker</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
