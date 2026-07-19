# 🧱 Component Library

All components are published as `@purdia/ui` with full TypeScript props, variants, and sizes.

## Component List

| Component         | Variants                                                      |
| ----------------- | ------------------------------------------------------------- |
| Button            | primary, secondary, success, warning, danger, ghost, outline  |
| Card              | default, bordered, elevated, flat + flush mode                |
| Table             | default, striped, bordered + searchable, sortable, expandable |
| Badge             | primary, secondary, success, warning, danger, info            |
| Input             | default, filled, underlined                                   |
| Select            | single, multiple, remote/ajax, searchable, clearable          |
| Modal             | sm, md, lg, xl, full                                          |
| Alert             | info, success, warning, danger                                |
| Pagination        | default, simple, minimal, jumper                              |
| Tabs              | default, pills, underline, bordered                           |
| Date Picker       | date, time, datetime, range                                   |
| Toggle            | sm, md, lg                                                    |
| Progress          | primary, success, warning, danger + striped, animated         |
| Skeleton          | text, circle, rect, button, avatar, badge, input              |
| Avatar            | xs, sm, md, lg, xl + circle, rounded, square                  |
| Avatar Group      | grouped avatars with overflow count                           |
| Dropdown          | 7 color variants + teleported positioning                     |
| Breadcrumb        | chevron, slash, dot separators + sm, md, lg sizes + icons     |
| File Upload       | dropzone, input, compact + progress, cancel, retry, validate  |
| Editor            | minimal, default, full (Tiptap WYSIWYG) + sm, md, lg sizes    |
| Toast             | success, error, warning, info — `@purdia/toast`               |
| Charts            | Line, Bar, Doughnut (Chart.js) — `@purdia/charts`             |
| Tooltip           | top, bottom, left, right positioning                          |
| Popover           | click/hover trigger, multiple positions                       |
| Drawer            | left, right, top, bottom positions + sizes                    |
| Accordion         | default, bordered, separated                                  |
| Checkbox          | default + variants                                            |
| Radio             | default + variants                                            |
| Tag               | primary, secondary, success, warning, danger + sizes          |
| Spinner           | sm, md, lg + color variants                                   |
| Timeline          | default, alternate                                            |
| Steps             | horizontal, vertical + color variants                         |
| Empty State       | sm, md, lg                                                    |
| Color Picker      | grid, list + custom colors                                    |
| Rating            | sm, md, lg + read-only                                        |
| Slider            | single, range + color variants                                |
| Divider           | horizontal, vertical + label positions                        |
| Kbd               | keyboard shortcut indicator                                   |
| Number Input      | sm, md, lg + min/max/step                                     |
| Tree View         | expandable, selectable, icons, disabled nodes                 |
| Calendar          | month view with event indicators                              |
| Command Palette   | search, groups, keyboard navigation                           |
| Context Menu      | right-click, icons, shortcuts, dividers                       |
| Notification List | read/unread states, dismiss, group actions                    |

## Usage Example

```vue
<script setup lang="ts">
import { BaseButton, BaseCard, BaseTable, BaseModal } from '@purdia/ui'
import type { TableColumn } from '@purdia/ui'

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
]
</script>

<template>
  <BaseCard>
    <template #header>
      <BaseButton variant="primary">Add User</BaseButton>
    </template>
    <BaseTable :columns="columns" :data="users" striped />
  </BaseCard>
</template>
```

## Live Demo

All components have interactive example pages at `/examples/*` in the running app. See the sidebar under **Components** for the full list.
