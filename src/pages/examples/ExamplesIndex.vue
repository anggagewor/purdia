<script setup lang="ts">
import {
  RectangleHorizontal,
  CreditCard,
  Tag,
  TextCursorInput,
  ListFilter,
  ToggleLeft,
  CircleUser,
  Table,
  Layers,
  AlertCircle,
  BarChart3,
  Activity,
  Gauge,
  Bone,
  Calendar,
  Navigation,
  Upload,
} from '@lucide/vue'

const components = [
  {
    label: 'Button',
    to: '/examples/button',
    icon: RectangleHorizontal,
    description: 'Clickable actions with variants, sizes, icons, and loading state.',
  },
  {
    label: 'Card',
    to: '/examples/card',
    icon: CreditCard,
    description: 'Containers for grouping content with header/footer slots.',
  },
  {
    label: 'Badge',
    to: '/examples/badge',
    icon: Tag,
    description: 'Labels and status indicators with color variants.',
  },
  {
    label: 'Input',
    to: '/examples/input',
    icon: TextCursorInput,
    description: 'Text inputs with icons, validation, and multiple styles.',
  },
  {
    label: 'Select',
    to: '/examples/select',
    icon: ListFilter,
    description: 'Dropdown select with variants and validation.',
  },
  {
    label: 'Toggle',
    to: '/examples/toggle',
    icon: ToggleLeft,
    description: 'Switch component for boolean state.',
  },
  {
    label: 'Avatar',
    to: '/examples/avatar',
    icon: CircleUser,
    description: 'User avatars with image, initials, and color generation.',
  },
  {
    label: 'Table',
    to: '/examples/table',
    icon: Table,
    description: 'Data tables with sorting, striping, and custom cells.',
  },
  {
    label: 'Modal',
    to: '/examples/modal',
    icon: Layers,
    description: 'Dialog overlays with sizes and footer actions.',
  },
  {
    label: 'Alert',
    to: '/examples/alert',
    icon: AlertCircle,
    description: 'Notification banners for info, success, warning, error.',
  },
  {
    label: 'Progress',
    to: '/examples/progress',
    icon: Activity,
    description: 'Progress bars with stripes and animation.',
  },
  {
    label: 'Stat Card',
    to: '/examples/stat-card',
    icon: Gauge,
    description: 'Metric cards with trend indicators.',
  },
  {
    label: 'Charts',
    to: '/examples/charts',
    icon: BarChart3,
    description: 'Line, bar, and doughnut charts with Chart.js.',
  },
  {
    label: 'Skeleton',
    to: '/examples/skeleton',
    icon: Bone,
    description: 'Loading placeholders for all components and layouts.',
  },
  {
    label: 'Tabs',
    to: '/examples/tabs',
    icon: Layers,
    description: 'Tab navigation with variants, placements (top, bottom, left, right), and sizes.',
  },
  {
    label: 'Date Picker',
    to: '/examples/datepicker',
    icon: Calendar,
    description: 'Date, time, datetime, and range picker with custom format output.',
  },
  {
    label: 'Grid System',
    to: '/examples/grid',
    icon: BarChart3,
    description: '12-column grid, responsive breakpoints, auto-fit, gap, offset, and row span.',
  },
  {
    label: 'Breadcrumb',
    to: '/examples/breadcrumb',
    icon: Navigation,
    description: 'Navigation breadcrumb dengan separator, icons, dan sizes.',
  },
  {
    label: 'File Upload',
    to: '/examples/file-upload',
    icon: Upload,
    description: 'Upload file dengan dropzone, input, progress bar, cancel, dan validasi.',
  },
  {
    label: 'Editor (WYSIWYG)',
    to: '/examples/editor',
    icon: TextCursorInput,
    description:
      'Rich text editor dengan toolbar, formatting, link, image, code block, dan lainnya.',
  },
]
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Components</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Semua reusable components yang tersedia. Klik untuk lihat demo dan cara pakenya.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        v-for="item in components"
        :key="item.to"
        :to="item.to"
        class="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          class="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors dark:bg-primary-900/30 dark:group-hover:bg-primary-900/50"
        >
          <component :is="item.icon" class="w-5 h-5" />
        </div>
        <div>
          <h3
            class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors dark:text-gray-100"
          >
            {{ item.label }}
          </h3>
          <p class="text-xs text-gray-500 mt-0.5 leading-relaxed dark:text-gray-400">
            {{ item.description }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>
