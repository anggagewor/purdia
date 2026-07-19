import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/pages/examples/ExamplesIndex.vue'),
  },
  {
    path: '/examples/button',
    name: 'example-button',
    component: () => import('@/pages/examples/ButtonExample.vue'),
  },
  {
    path: '/examples/card',
    name: 'example-card',
    component: () => import('@/pages/examples/CardExample.vue'),
  },
  {
    path: '/examples/badge',
    name: 'example-badge',
    component: () => import('@/pages/examples/BadgeExample.vue'),
  },
  {
    path: '/examples/input',
    name: 'example-input',
    component: () => import('@/pages/examples/InputExample.vue'),
  },
  {
    path: '/examples/select',
    name: 'example-select',
    component: () => import('@/pages/examples/SelectExample.vue'),
  },
  {
    path: '/examples/toggle',
    name: 'example-toggle',
    component: () => import('@/pages/examples/ToggleExample.vue'),
  },
  {
    path: '/examples/avatar',
    name: 'example-avatar',
    component: () => import('@/pages/examples/AvatarExample.vue'),
  },
  {
    path: '/examples/table',
    name: 'example-table',
    component: () => import('@/pages/examples/TableExample.vue'),
  },
  {
    path: '/examples/modal',
    name: 'example-modal',
    component: () => import('@/pages/examples/ModalExample.vue'),
  },
  {
    path: '/examples/alert',
    name: 'example-alert',
    component: () => import('@/pages/examples/AlertExample.vue'),
  },
  {
    path: '/examples/progress',
    name: 'example-progress',
    component: () => import('@/pages/examples/ProgressExample.vue'),
  },
  {
    path: '/examples/stat-card',
    name: 'example-stat-card',
    component: () => import('@/pages/examples/StatCardExample.vue'),
  },
  {
    path: '/examples/charts',
    name: 'example-charts',
    component: () => import('@/pages/examples/ChartsExample.vue'),
  },
  {
    path: '/examples/skeleton',
    name: 'example-skeleton',
    component: () => import('@/pages/examples/SkeletonExample.vue'),
  },
  {
    path: '/examples/tabs',
    name: 'example-tabs',
    component: () => import('@/pages/examples/TabsExample.vue'),
  },
  {
    path: '/examples/datepicker',
    name: 'example-datepicker',
    component: () => import('@/pages/examples/DatePickerExample.vue'),
  },
  {
    path: '/examples/grid',
    name: 'example-grid',
    component: () => import('@/pages/examples/GridExample.vue'),
  },
  {
    path: '/examples/pagination',
    name: 'example-pagination',
    component: () => import('@/pages/examples/PaginationExample.vue'),
  },
  {
    path: '/examples/breadcrumb',
    name: 'example-breadcrumb',
    component: () => import('@/pages/examples/BreadcrumbExample.vue'),
  },
  {
    path: '/examples/file-upload',
    name: 'example-file-upload',
    component: () => import('@/pages/examples/FileUploadExample.vue'),
  },
  {
    path: '/examples/editor',
    name: 'example-editor',
    component: () => import('@/pages/examples/EditorExample.vue'),
  },
  {
    path: '/examples/textarea',
    name: 'example-textarea',
    component: () => import('@/pages/examples/TextareaExample.vue'),
  },
  {
    path: '/examples/tooltip',
    name: 'example-tooltip',
    component: () => import('@/pages/examples/TooltipExample.vue'),
  },
  {
    path: '/examples/popover',
    name: 'example-popover',
    component: () => import('@/pages/examples/PopoverExample.vue'),
  },
  {
    path: '/examples/drawer',
    name: 'example-drawer',
    component: () => import('@/pages/examples/DrawerExample.vue'),
  },
  {
    path: '/examples/accordion',
    name: 'example-accordion',
    component: () => import('@/pages/examples/AccordionExample.vue'),
  },
  {
    path: '/examples/checkbox',
    name: 'example-checkbox',
    component: () => import('@/pages/examples/CheckboxExample.vue'),
  },
  {
    path: '/examples/radio',
    name: 'example-radio',
    component: () => import('@/pages/examples/RadioExample.vue'),
  },
  {
    path: '/examples/tag',
    name: 'example-tag',
    component: () => import('@/pages/examples/TagExample.vue'),
  },
  {
    path: '/examples/spinner',
    name: 'example-spinner',
    component: () => import('@/pages/examples/SpinnerExample.vue'),
  },
  {
    path: '/examples/timeline',
    name: 'example-timeline',
    component: () => import('@/pages/examples/TimelineExample.vue'),
  },
  {
    path: '/examples/steps',
    name: 'example-steps',
    component: () => import('@/pages/examples/StepsExample.vue'),
  },
  {
    path: '/examples/empty-state',
    name: 'example-empty-state',
    component: () => import('@/pages/examples/EmptyStateExample.vue'),
  },
  {
    path: '/examples/color-picker',
    name: 'example-color-picker',
    component: () => import('@/pages/examples/ColorPickerExample.vue'),
  },
  {
    path: '/examples/rating',
    name: 'example-rating',
    component: () => import('@/pages/examples/RatingExample.vue'),
  },
  {
    path: '/examples/slider',
    name: 'example-slider',
    component: () => import('@/pages/examples/SliderExample.vue'),
  },
  {
    path: '/examples/divider',
    name: 'example-divider',
    component: () => import('@/pages/examples/DividerExample.vue'),
  },
  {
    path: '/examples/kbd',
    name: 'example-kbd',
    component: () => import('@/pages/examples/KbdExample.vue'),
  },
  {
    path: '/examples/avatar-group',
    name: 'example-avatar-group',
    component: () => import('@/pages/examples/AvatarGroupExample.vue'),
  },
  {
    path: '/examples/number-input',
    name: 'example-number-input',
    component: () => import('@/pages/examples/NumberInputExample.vue'),
  },
  {
    path: '/examples/tree-view',
    name: 'example-tree-view',
    component: () => import('@/pages/examples/TreeViewExample.vue'),
  },
  {
    path: '/examples/calendar',
    name: 'example-calendar',
    component: () => import('@/pages/examples/CalendarExample.vue'),
  },
  {
    path: '/examples/command-palette',
    name: 'example-command-palette',
    component: () => import('@/pages/examples/CommandPaletteExample.vue'),
  },
  {
    path: '/examples/notification-list',
    name: 'example-notification-list',
    component: () => import('@/pages/examples/NotificationListExample.vue'),
  },
  {
    path: '/examples/context-menu',
    name: 'example-context-menu',
    component: () => import('@/pages/examples/ContextMenuExample.vue'),
  },
]

export default routes
