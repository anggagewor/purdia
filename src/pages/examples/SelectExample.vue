<script setup lang="ts">
import { ref } from 'vue'
import { BaseSelect, BaseCard } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

// Single select
const singleValue = ref<string | number>('')
const filledValue = ref<string | number>('')
const underlinedValue = ref<string | number>('')

// Multiple select
const multipleValue = ref<(string | number)[]>([])
const prefilledMultiple = ref<(string | number)[]>(['react', 'vue'])

// Ajax select
const ajaxValue = ref<string | number>('')
const ajaxMultiple = ref<(string | number)[]>([])

const fruits: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' },
]

const frameworks: SelectOption[] = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'Remix', value: 'remix' },
]

const roles: SelectOption[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
  { label: 'Guest (disabled)', value: 'guest', disabled: true },
]

// Simulate ajax search
async function searchUsers(query: string): Promise<SelectOption[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const allUsers = [
    { label: 'John Doe', value: 'john' },
    { label: 'Jane Smith', value: 'jane' },
    { label: 'Bob Wilson', value: 'bob' },
    { label: 'Alice Brown', value: 'alice' },
    { label: 'Charlie Davis', value: 'charlie' },
    { label: 'Diana Prince', value: 'diana' },
    { label: 'Edward Norton', value: 'edward' },
    { label: 'Fiona Apple', value: 'fiona' },
    { label: 'George Martin', value: 'george' },
    { label: 'Hannah Baker', value: 'hannah' },
  ]

  return allUsers.filter((u) => u.label.toLowerCase().includes(query.toLowerCase()))
}

// Simulate ajax search for cities
async function searchCities(query: string): Promise<SelectOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const cities = [
    { label: 'Jakarta, Indonesia', value: 'jakarta' },
    { label: 'Tokyo, Japan', value: 'tokyo' },
    { label: 'New York, USA', value: 'newyork' },
    { label: 'London, UK', value: 'london' },
    { label: 'Paris, France', value: 'paris' },
    { label: 'Sydney, Australia', value: 'sydney' },
    { label: 'Berlin, Germany', value: 'berlin' },
    { label: 'Singapore', value: 'singapore' },
    { label: 'Seoul, South Korea', value: 'seoul' },
    { label: 'Bangkok, Thailand', value: 'bangkok' },
    { label: 'Mumbai, India', value: 'mumbai' },
    { label: 'Dubai, UAE', value: 'dubai' },
  ]

  return cities.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Select</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Custom select (Select2-style) dengan search, multiple, dan remote/ajax support.
      </p>
    </div>

    <!-- Variants -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseSelect
          v-model="singleValue"
          variant="default"
          label="Default"
          :options="fruits"
          placeholder="Pick a fruit..."
        />
        <BaseSelect
          v-model="filledValue"
          variant="filled"
          label="Filled"
          :options="fruits"
          placeholder="Pick a fruit..."
        />
        <BaseSelect
          v-model="underlinedValue"
          variant="underlined"
          label="Underlined"
          :options="fruits"
          placeholder="Pick a fruit..."
        />
      </div>
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseSelect size="sm" label="Small" :options="roles" placeholder="Select role..." />
        <BaseSelect size="md" label="Medium" :options="roles" placeholder="Select role..." />
        <BaseSelect size="lg" label="Large" :options="roles" placeholder="Select role..." />
      </div>
    </BaseCard>

    <!-- Single Select -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Single Select</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelect
          v-model="singleValue"
          label="Searchable (default)"
          :options="fruits"
          placeholder="Search fruits..."
        />
        <BaseSelect
          v-model="singleValue"
          label="Not Searchable"
          :options="roles"
          :searchable="false"
          placeholder="Select role..."
        />
      </div>
      <p class="text-xs text-gray-500 mt-3">
        Selected: <code class="bg-gray-100 px-1.5 py-0.5 rounded">{{ singleValue || 'none' }}</code>
      </p>
    </BaseCard>

    <!-- Multiple Select -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Multiple Select</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelect
          v-model="multipleValue"
          label="Select Frameworks"
          :options="frameworks"
          :multiple="true"
          placeholder="Choose frameworks..."
        />
        <BaseSelect
          v-model="prefilledMultiple"
          label="Pre-filled Values"
          :options="frameworks"
          :multiple="true"
          placeholder="Choose frameworks..."
        />
      </div>
      <p class="text-xs text-gray-500 mt-3">
        Selected:
        <code class="bg-gray-100 px-1.5 py-0.5 rounded">{{
          multipleValue.length ? multipleValue.join(', ') : 'none'
        }}</code>
      </p>
    </BaseCard>

    <!-- Remote / Ajax -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Remote / Ajax Search</h4></template>
      <p class="text-sm text-gray-500 mb-4">
        Options di-load dari server (simulated). Ketik minimal 1 karakter untuk search.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelect
          v-model="ajaxValue"
          label="Search Users (single)"
          :remote="true"
          :remote-method="searchUsers"
          placeholder="Type to search users..."
        />
        <BaseSelect
          v-model="ajaxMultiple"
          label="Search Cities (multiple)"
          :remote="true"
          :remote-method="searchCities"
          :multiple="true"
          placeholder="Type to search cities..."
        />
      </div>
      <p class="text-xs text-gray-500 mt-3">
        User: <code class="bg-gray-100 px-1.5 py-0.5 rounded">{{ ajaxValue || 'none' }}</code> |
        Cities:
        <code class="bg-gray-100 px-1.5 py-0.5 rounded">{{
          ajaxMultiple.length ? ajaxMultiple.join(', ') : 'none'
        }}</code>
      </p>
    </BaseCard>

    <!-- States -->
    <BaseCard>
      <template #header><h4 class="font-semibold">States</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseSelect
          label="With Error"
          :options="roles"
          error="This field is required"
          placeholder="Select..."
        />
        <BaseSelect
          label="Disabled"
          :options="roles"
          :disabled="true"
          placeholder="Can't select..."
        />
        <BaseSelect
          label="Not Clearable"
          :options="fruits"
          :clearable="false"
          placeholder="Select fruit..."
        />
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseSelect } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const value = ref('')
const multiValue = ref&lt;(string | number)[]&gt;([])

const options: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
]

// Ajax method
async function fetchUsers(query: string): Promise&lt;SelectOption[]&gt; {
  const res = await fetch(`/api/users?q=$&#123;query&#125;`)
  return res.json()
}
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Single --&gt;
  &lt;BaseSelect v-model="value" :options="options" label="Pick one" /&gt;

  &lt;!-- Multiple --&gt;
  &lt;BaseSelect v-model="multiValue" :options="options" :multiple="true" /&gt;

  &lt;!-- Remote/Ajax --&gt;
  &lt;BaseSelect
    v-model="value"
    :remote="true"
    :remote-method="fetchUsers"
    placeholder="Search users..."
  /&gt;
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
              <td class="py-2 pr-4">string | number | array</td>
              <td class="py-2 pr-4">''</td>
              <td class="py-2">Selected value(s)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">options</code>
              </td>
              <td class="py-2 pr-4">SelectOption[]</td>
              <td class="py-2 pr-4">[]</td>
              <td class="py-2">Static options</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">multiple</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Allow multi-select</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">searchable</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Show search input</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">clearable</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Show clear button</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">remote</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Enable ajax mode</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">remoteMethod</code>
              </td>
              <td class="py-2 pr-4">(q: string) =&gt; Promise</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Async fetch function</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">'default' | 'filled' | 'underlined'</td>
              <td class="py-2 pr-4">'default'</td>
              <td class="py-2">Visual style</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">size</code>
              </td>
              <td class="py-2 pr-4">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4">'md'</td>
              <td class="py-2">Size</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">disabled</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Disable component</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
