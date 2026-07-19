<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseAvatar, BaseInput } from '@purdia/ui'
import { ArrowLeft, Calendar, User, Flag, Tag, Clock, Send, Paperclip } from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const taskId = Number(route.params.id)

// Dummy task data
const tasksData: Record<number, any> = {
  1: {
    id: 1,
    title: 'Research competitor features',
    description:
      'Analyze top 5 competitors and document their key features, pricing models, and UX patterns. Focus on onboarding flows and dashboard layouts.',
    priority: 'low',
    assignee: 'Sarah Johnson',
    status: 'Backlog',
    dueDate: '',
    tags: ['research'],
    created: '2025-07-01',
  },
  2: {
    id: 2,
    title: 'Setup CI/CD pipeline',
    description:
      'Configure GitHub Actions for automated testing, linting, and deployment to staging environment. Include Docker build steps.',
    priority: 'medium',
    assignee: 'Mike Chen',
    status: 'Backlog',
    dueDate: '2025-07-20',
    tags: ['devops'],
    created: '2025-07-02',
  },
  4: {
    id: 4,
    title: 'Design user onboarding flow',
    description:
      'Create wireframes and high-fidelity mockups for the user onboarding experience. Should include email verification, profile setup, and tutorial walkthrough.',
    priority: 'high',
    assignee: 'Alex Turner',
    status: 'To Do',
    dueDate: '2025-07-15',
    tags: ['design', 'ux'],
    created: '2025-07-03',
  },
  5: {
    id: 5,
    title: 'Implement authentication',
    description:
      'Build the full authentication system including login, register, forgot password, 2FA, and session management. Use JWT tokens with refresh token rotation.',
    priority: 'urgent',
    assignee: 'Mike Chen',
    status: 'To Do',
    dueDate: '2025-07-12',
    tags: ['backend'],
    created: '2025-07-01',
  },
  6: {
    id: 6,
    title: 'Build dashboard components',
    description:
      'Implement all reusable UI components for the dashboard: charts, stats cards, tables, and navigation. Follow the design system specs.',
    priority: 'high',
    assignee: 'Lisa Wang',
    status: 'In Progress',
    dueDate: '2025-07-18',
    tags: ['frontend'],
    created: '2025-07-04',
  },
  8: {
    id: 8,
    title: 'Payment integration',
    description:
      'Integrate Stripe payment gateway for subscription billing. Support credit card, bank transfer, and e-wallet payments. Include webhook handling for payment events.',
    priority: 'urgent',
    assignee: 'Alex Turner',
    status: 'In Progress',
    dueDate: '2025-07-14',
    tags: ['backend', 'payment'],
    created: '2025-07-02',
  },
}

const task = tasksData[taskId] || tasksData[6]

// Comments
interface Comment {
  id: number
  author: string
  content: string
  time: string
}

const comments = ref<Comment[]>([
  {
    id: 1,
    author: 'Sarah Johnson',
    content:
      "I've reviewed the initial specs. The approach looks solid. One suggestion: we should also consider mobile responsiveness from the start.",
    time: '2 hours ago',
  },
  {
    id: 2,
    author: 'Mike Chen',
    content:
      "Agreed with Sarah. I'll add responsive breakpoints to the component specs. Also, should we use CSS Grid or Flexbox for the main layout?",
    time: '5 hours ago',
  },
  {
    id: 3,
    author: 'Lisa Wang',
    content:
      "I'd recommend CSS Grid for the overall page layout and Flexbox for component-level layouts. That gives us the best of both worlds.",
    time: '1 day ago',
  },
  {
    id: 4,
    author: 'Alex Turner',
    content:
      'Just pushed the updated wireframes to Figma. Please review and leave comments there for design-specific feedback.',
    time: '2 days ago',
  },
  {
    id: 5,
    author: 'Emily Davis',
    content:
      "Looks great! I've started writing the test cases based on the acceptance criteria. Should be done by EOD.",
    time: '3 days ago',
  },
])

const newComment = ref('')

function addComment() {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    id: Date.now(),
    author: 'Angga Dev',
    content: newComment.value,
    time: 'Just now',
  })
  newComment.value = ''
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
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-3">
        <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/projects')" />
        <div>
          <div class="flex items-center gap-2 mb-1">
            <BaseBadge :variant="getPriorityColor(task.priority)" size="sm">{{
              task.priority
            }}</BaseBadge>
            <BaseBadge variant="secondary" size="sm" :pill="false">{{ task.status }}</BaseBadge>
          </div>
          <h1 class="text-xl font-bold text-gray-900">{{ task.title }}</h1>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Description -->
        <BaseCard>
          <template #header><h4 class="font-semibold text-sm">Description</h4></template>
          <p class="text-sm text-gray-600 leading-relaxed">{{ task.description }}</p>
        </BaseCard>

        <!-- Comments -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h4 class="font-semibold text-sm">Comments ({{ comments.length }})</h4>
            </div>
          </template>

          <!-- Add comment -->
          <div class="flex gap-3 mb-6 pb-6 border-b border-gray-100">
            <BaseAvatar name="Angga Dev" size="sm" />
            <div class="flex-1">
              <div
                class="border border-gray-200 rounded-lg overflow-hidden focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100"
              >
                <textarea
                  v-model="newComment"
                  rows="3"
                  class="w-full px-3 py-2 text-sm outline-none resize-none placeholder:text-gray-400"
                  placeholder="Write a comment..."
                />
                <div
                  class="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-100"
                >
                  <button class="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <Paperclip class="w-4 h-4" />
                  </button>
                  <BaseButton
                    size="sm"
                    :icon="Send"
                    :disabled="!newComment.trim()"
                    @click="addComment"
                    >Comment</BaseButton
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Comment list -->
          <div class="space-y-4">
            <div v-for="comment in comments" :key="comment.id" class="flex gap-3">
              <BaseAvatar :name="comment.author" size="sm" />
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium text-gray-900">{{ comment.author }}</span>
                  <span class="text-xs text-gray-400">{{ comment.time }}</span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Details Card -->
        <BaseCard>
          <template #header><h4 class="font-semibold text-sm">Details</h4></template>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 flex items-center gap-1.5"
                ><User class="w-3.5 h-3.5" /> Assignee</span
              >
              <div class="flex items-center gap-1.5">
                <BaseAvatar :name="task.assignee" size="xs" />
                <span class="text-sm font-medium text-gray-800">{{ task.assignee }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 flex items-center gap-1.5"
                ><Flag class="w-3.5 h-3.5" /> Priority</span
              >
              <BaseBadge :variant="getPriorityColor(task.priority)" size="sm">{{
                task.priority
              }}</BaseBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 flex items-center gap-1.5"
                ><Clock class="w-3.5 h-3.5" /> Status</span
              >
              <span class="text-sm font-medium text-gray-800">{{ task.status }}</span>
            </div>
            <div v-if="task.dueDate" class="flex items-center justify-between">
              <span class="text-xs text-gray-500 flex items-center gap-1.5"
                ><Calendar class="w-3.5 h-3.5" /> Due Date</span
              >
              <span class="text-sm font-medium text-gray-800">{{ task.dueDate }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 flex items-center gap-1.5"
                ><Calendar class="w-3.5 h-3.5" /> Created</span
              >
              <span class="text-sm text-gray-600">{{ task.created }}</span>
            </div>
          </div>
        </BaseCard>

        <!-- Tags -->
        <BaseCard>
          <template #header><h4 class="font-semibold text-sm">Tags</h4></template>
          <div class="flex flex-wrap gap-1.5">
            <BaseBadge
              v-for="tag in task.tags"
              :key="tag"
              variant="secondary"
              size="sm"
              :pill="false"
            >
              <Tag class="w-3 h-3" /> {{ tag }}
            </BaseBadge>
          </div>
        </BaseCard>

        <!-- Activity summary -->
        <BaseCard>
          <template #header><h4 class="font-semibold text-sm">Activity</h4></template>
          <div class="space-y-3 text-xs text-gray-500">
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
              <span
                ><strong class="text-gray-700">Lisa Wang</strong> moved to In Progress — 1d
                ago</span
              >
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
              <span
                ><strong class="text-gray-700">Alex Turner</strong> assigned to Lisa Wang — 3d
                ago</span
              >
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
              <span
                ><strong class="text-gray-700">Sarah Johnson</strong> created this task — 7d
                ago</span
              >
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
