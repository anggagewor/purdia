<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import { BaseButton, BaseModal, BaseInput, BaseSelect, BaseBadge, BaseAvatar } from '@purdia/ui'
import {
  Plus,
  MoreHorizontal,
  X,
  Trash2,
  Edit,
  GripVertical,
  Calendar,
  MessageSquare,
} from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

interface Task {
  id: number
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: string
  dueDate?: string
  comments?: number
  tags?: string[]
}

interface KanbanColumn {
  id: string
  title: string
  color: string
  tasks: Task[]
}

const router = useRouter()

const columns = ref<KanbanColumn[]>([
  {
    id: 'backlog',
    title: 'Backlog',
    color: '#94a3b8',
    tasks: [
      {
        id: 1,
        title: 'Research competitor features',
        priority: 'low',
        assignee: 'Sarah Johnson',
        tags: ['research'],
      },
      {
        id: 2,
        title: 'Setup CI/CD pipeline',
        priority: 'medium',
        assignee: 'Mike Chen',
        dueDate: '2025-07-20',
        tags: ['devops'],
      },
      {
        id: 3,
        title: 'Write API documentation',
        priority: 'low',
        assignee: 'Emily Davis',
        comments: 2,
        tags: ['docs'],
      },
    ],
  },
  {
    id: 'todo',
    title: 'To Do',
    color: '#6366f1',
    tasks: [
      {
        id: 4,
        title: 'Design user onboarding flow',
        priority: 'high',
        assignee: 'Alex Turner',
        dueDate: '2025-07-15',
        comments: 5,
        tags: ['design', 'ux'],
      },
      {
        id: 5,
        title: 'Implement authentication',
        priority: 'urgent',
        assignee: 'Mike Chen',
        dueDate: '2025-07-12',
        tags: ['backend'],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#f59e0b',
    tasks: [
      {
        id: 6,
        title: 'Build dashboard components',
        priority: 'high',
        assignee: 'Lisa Wang',
        dueDate: '2025-07-18',
        comments: 3,
        tags: ['frontend'],
      },
      {
        id: 7,
        title: 'Database schema design',
        priority: 'medium',
        assignee: 'Sarah Johnson',
        tags: ['backend', 'database'],
      },
      {
        id: 8,
        title: 'Payment integration',
        priority: 'urgent',
        assignee: 'Alex Turner',
        dueDate: '2025-07-14',
        comments: 8,
        tags: ['backend', 'payment'],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    color: '#8b5cf6',
    tasks: [
      {
        id: 9,
        title: 'Landing page redesign',
        priority: 'medium',
        assignee: 'Emily Davis',
        comments: 12,
        tags: ['design'],
      },
      {
        id: 10,
        title: 'Email notification system',
        priority: 'low',
        assignee: 'Mike Chen',
        dueDate: '2025-07-22',
        tags: ['backend'],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10b981',
    tasks: [
      {
        id: 11,
        title: 'Project setup & scaffolding',
        priority: 'high',
        assignee: 'Lisa Wang',
        tags: ['devops'],
      },
      {
        id: 12,
        title: 'User stories & requirements',
        priority: 'medium',
        assignee: 'Sarah Johnson',
        comments: 4,
        tags: ['planning'],
      },
    ],
  },
])

// Modals
const showAddColumn = ref(false)
const showAddTask = ref(false)
const showEditColumn = ref(false)
const showDeleteColumn = ref(false)
const showTaskDetail = ref(false)

const newColumnTitle = ref('')
const newColumnColor = ref('#6366f1')
const editColumnId = ref('')
const editColumnTitle = ref('')
const editColumnColor = ref('')
const deleteColumnId = ref('')
const addTaskColumnId = ref('')
const selectedTask = ref<Task | null>(null)

// New task form
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref<string | number>('medium')
const newTaskAssignee = ref<string | number>('')

const priorityOptions: SelectOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
]

const assigneeOptions: SelectOption[] = [
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Mike Chen', value: 'Mike Chen' },
  { label: 'Emily Davis', value: 'Emily Davis' },
  { label: 'Alex Turner', value: 'Alex Turner' },
  { label: 'Lisa Wang', value: 'Lisa Wang' },
]

const colorOptions = [
  '#94a3b8',
  '#6366f1',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
]

let taskIdCounter = 20

function addColumn() {
  if (!newColumnTitle.value.trim()) return
  columns.value.push({
    id: `col-${Date.now()}`,
    title: newColumnTitle.value,
    color: newColumnColor.value,
    tasks: [],
  })
  newColumnTitle.value = ''
  newColumnColor.value = '#6366f1'
  showAddColumn.value = false
}

function openEditColumn(col: KanbanColumn) {
  editColumnId.value = col.id
  editColumnTitle.value = col.title
  editColumnColor.value = col.color
  showEditColumn.value = true
}

function saveEditColumn() {
  const col = columns.value.find((c) => c.id === editColumnId.value)
  if (col) {
    col.title = editColumnTitle.value
    col.color = editColumnColor.value
  }
  showEditColumn.value = false
}

function openDeleteColumn(col: KanbanColumn) {
  deleteColumnId.value = col.id
  showDeleteColumn.value = true
}

function confirmDeleteColumn() {
  columns.value = columns.value.filter((c) => c.id !== deleteColumnId.value)
  showDeleteColumn.value = false
}

function openAddTask(columnId: string) {
  addTaskColumnId.value = columnId
  newTaskTitle.value = ''
  newTaskDescription.value = ''
  newTaskPriority.value = 'medium'
  newTaskAssignee.value = ''
  showAddTask.value = true
}

function addTask() {
  if (!newTaskTitle.value.trim()) return
  const col = columns.value.find((c) => c.id === addTaskColumnId.value)
  if (col) {
    col.tasks.push({
      id: taskIdCounter++,
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      priority: newTaskPriority.value as Task['priority'],
      assignee: (newTaskAssignee.value as string) || undefined,
    })
  }
  showAddTask.value = false
}

function openTaskDetail(task: Task) {
  selectedTask.value = task
  showTaskDetail.value = true
}

function openFullTaskDetail() {
  showTaskDetail.value = false
  if (selectedTask.value) {
    router.push(`/projects/tasks/${selectedTask.value.id}`)
  }
}

function getPriorityColor(priority: string) {
  const map: Record<string, 'secondary' | 'info' | 'warning' | 'danger'> = {
    low: 'secondary',
    medium: 'info',
    high: 'warning',
    urgent: 'danger',
  }
  return map[priority] || 'secondary'
}
</script>

<template>
  <div class="flex flex-col h-full min-h-0 gap-4">
    <div class="flex items-center justify-between shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Project Board</h1>
        <p class="text-gray-500 mt-1">Drag tasks between columns to update status.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="showAddColumn = true">Add Column</BaseButton>
    </div>

    <!-- Kanban Board -->
    <div class="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
      <div
        v-for="col in columns"
        :key="col.id"
        class="flex flex-col w-72 min-w-[18rem] shrink-0 bg-gray-100 rounded-xl"
      >
        <!-- Column Header -->
        <div class="flex items-center justify-between px-3 py-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full" :style="{ background: col.color }" />
            <h4 class="text-sm font-semibold text-gray-800">{{ col.title }}</h4>
            <span
              class="text-xs text-gray-400 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
              >{{ col.tasks.length }}</span
            >
          </div>
          <div class="flex items-center gap-0.5">
            <button
              class="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer hover:bg-gray-200"
              @click="openAddTask(col.id)"
            >
              <Plus class="w-4 h-4" />
            </button>
            <button
              class="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer hover:bg-gray-200"
              @click="openEditColumn(col)"
            >
              <Edit class="w-3.5 h-3.5" />
            </button>
            <button
              class="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer hover:bg-gray-200"
              @click="openDeleteColumn(col)"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Tasks (Draggable) -->
        <draggable
          v-model="col.tasks"
          :group="{ name: 'kanban' }"
          item-key="id"
          class="flex-1 px-2 pb-2 space-y-2 min-h-[4rem]"
          ghost-class="opacity-40"
          drag-class="rotate-2"
          :animation="200"
        >
          <template #item="{ element: task }">
            <div
              class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
              @click="openTaskDetail(task)"
            >
              <!-- Priority + Tags -->
              <div class="flex items-center gap-1.5 mb-2">
                <BaseBadge :variant="getPriorityColor(task.priority)" size="sm">{{
                  task.priority
                }}</BaseBadge>
                <BaseBadge
                  v-for="tag in (task.tags || []).slice(0, 2)"
                  :key="tag"
                  variant="secondary"
                  size="sm"
                  :pill="false"
                  >{{ tag }}</BaseBadge
                >
              </div>

              <!-- Title -->
              <p class="text-sm font-medium text-gray-800 leading-snug">{{ task.title }}</p>

              <!-- Footer -->
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center gap-2">
                  <BaseAvatar v-if="task.assignee" :name="task.assignee" size="xs" />
                  <span
                    v-if="task.dueDate"
                    class="text-[0.6875rem] text-gray-400 flex items-center gap-0.5"
                  >
                    <Calendar class="w-3 h-3" /> {{ task.dueDate.slice(5) }}
                  </span>
                </div>
                <span
                  v-if="task.comments"
                  class="text-[0.6875rem] text-gray-400 flex items-center gap-0.5"
                >
                  <MessageSquare class="w-3 h-3" /> {{ task.comments }}
                </span>
              </div>
            </div>
          </template>
        </draggable>

        <!-- Add task button -->
        <button
          class="mx-2 mb-2 py-2 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-colors"
          @click="openAddTask(col.id)"
        >
          <Plus class="w-3.5 h-3.5" /> Add task
        </button>
      </div>

      <!-- Add Column Placeholder -->
      <div
        class="w-72 min-w-[18rem] shrink-0 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
        @click="showAddColumn = true"
      >
        <div class="text-center text-gray-400">
          <Plus class="w-6 h-6 mx-auto mb-1" />
          <span class="text-sm">Add Column</span>
        </div>
      </div>
    </div>

    <!-- Add Column Modal -->
    <BaseModal v-model="showAddColumn" title="Add Column" size="sm">
      <div class="space-y-4">
        <BaseInput v-model="newColumnTitle" label="Column Title" placeholder="e.g. In Review" />
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-2">Color</label>
          <div class="flex gap-2">
            <button
              v-for="c in colorOptions"
              :key="c"
              class="w-7 h-7 rounded-full cursor-pointer ring-2 ring-offset-2 transition-all"
              :class="
                newColumnColor === c ? 'ring-gray-400' : 'ring-transparent hover:ring-gray-200'
              "
              :style="{ background: c }"
              @click="newColumnColor = c"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showAddColumn = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="addColumn">Add Column</BaseButton>
      </template>
    </BaseModal>

    <!-- Edit Column Modal -->
    <BaseModal v-model="showEditColumn" title="Edit Column" size="sm">
      <div class="space-y-4">
        <BaseInput v-model="editColumnTitle" label="Column Title" />
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-2">Color</label>
          <div class="flex gap-2">
            <button
              v-for="c in colorOptions"
              :key="c"
              class="w-7 h-7 rounded-full cursor-pointer ring-2 ring-offset-2 transition-all"
              :class="
                editColumnColor === c ? 'ring-gray-400' : 'ring-transparent hover:ring-gray-200'
              "
              :style="{ background: c }"
              @click="editColumnColor = c"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showEditColumn = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveEditColumn">Save</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Column Modal -->
    <BaseModal v-model="showDeleteColumn" title="Delete Column" size="sm">
      <p class="text-sm text-gray-600">Are you sure? All tasks in this column will be removed.</p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteColumn = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDeleteColumn">Delete</BaseButton>
      </template>
    </BaseModal>

    <!-- Add Task Modal -->
    <BaseModal v-model="showAddTask" title="Add Task" size="md">
      <div class="space-y-4">
        <BaseInput v-model="newTaskTitle" label="Task Title" placeholder="What needs to be done?" />
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-1">Description</label>
          <textarea
            v-model="newTaskDescription"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400"
            placeholder="Optional description..."
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect
            v-model="newTaskPriority"
            label="Priority"
            :options="priorityOptions"
            :searchable="false"
          />
          <BaseSelect
            v-model="newTaskAssignee"
            label="Assignee"
            :options="assigneeOptions"
            placeholder="Assign to..."
          />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showAddTask = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="addTask">Add Task</BaseButton>
      </template>
    </BaseModal>

    <!-- Task Detail Modal -->
    <BaseModal v-model="showTaskDetail" :title="selectedTask?.title || ''" size="md">
      <div v-if="selectedTask" class="space-y-4">
        <div class="flex items-center gap-2">
          <BaseBadge :variant="getPriorityColor(selectedTask.priority)" size="sm">{{
            selectedTask.priority
          }}</BaseBadge>
          <BaseBadge
            v-for="tag in selectedTask.tags || []"
            :key="tag"
            variant="secondary"
            size="sm"
            :pill="false"
            >{{ tag }}</BaseBadge
          >
        </div>
        <p v-if="selectedTask.description" class="text-sm text-gray-600">
          {{ selectedTask.description }}
        </p>
        <div class="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div>
            <p class="text-xs text-gray-500">Assignee</p>
            <div v-if="selectedTask.assignee" class="flex items-center gap-2 mt-1">
              <BaseAvatar :name="selectedTask.assignee" size="xs" />
              <span class="text-sm font-medium">{{ selectedTask.assignee }}</span>
            </div>
            <span v-else class="text-sm text-gray-400">Unassigned</span>
          </div>
          <div>
            <p class="text-xs text-gray-500">Due Date</p>
            <span class="text-sm font-medium">{{ selectedTask.dueDate || 'No due date' }}</span>
          </div>
        </div>

        <!-- Recent Comments Preview -->
        <div class="pt-3 border-t border-gray-100">
          <p class="text-xs font-medium text-gray-500 mb-2">Recent Comments</p>
          <div class="space-y-2">
            <div class="flex gap-2">
              <BaseAvatar name="Sarah Johnson" size="xs" />
              <div class="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-gray-800">Sarah Johnson</span>
                  <span class="text-[0.625rem] text-gray-400">2h ago</span>
                </div>
                <p class="text-xs text-gray-600 mt-0.5">
                  Looks good, let's move forward with this approach.
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <BaseAvatar name="Mike Chen" size="xs" />
              <div class="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-gray-800">Mike Chen</span>
                  <span class="text-[0.625rem] text-gray-400">5h ago</span>
                </div>
                <p class="text-xs text-gray-600 mt-0.5">
                  I've updated the specs. Please review when you get a chance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showTaskDetail = false">Close</BaseButton>
        <BaseButton size="sm" @click="openFullTaskDetail">Open Full Detail</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
