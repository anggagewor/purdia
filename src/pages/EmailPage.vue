<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Inbox,
  Send,
  Star,
  Trash2,
  Archive,
  Tag,
  Search,
  MoreHorizontal,
  Reply,
  ReplyAll,
  Forward,
  Paperclip,
  X,
  RefreshCw,
  Mail,
  MailOpen,
  Clock,
  ChevronLeft,
} from '@lucide/vue'
import { BaseAvatar, BaseBadge, BaseButton, BaseInput, BaseTextarea } from '@purdia/ui'

interface Email {
  id: number
  from: string
  email: string
  subject: string
  preview: string
  body: string
  time: string
  date: string
  read: boolean
  starred: boolean
  labels: string[]
  hasAttachment: boolean
}

type FolderType = 'inbox' | 'sent' | 'starred' | 'drafts' | 'trash' | 'archive'

const folders = [
  { id: 'inbox' as FolderType, label: 'Inbox', icon: Inbox, count: 4 },
  { id: 'sent' as FolderType, label: 'Sent', icon: Send, count: 0 },
  { id: 'starred' as FolderType, label: 'Starred', icon: Star, count: 2 },
  { id: 'drafts' as FolderType, label: 'Drafts', icon: Mail, count: 1 },
  { id: 'archive' as FolderType, label: 'Archive', icon: Archive, count: 0 },
  { id: 'trash' as FolderType, label: 'Trash', icon: Trash2, count: 0 },
]

const labels = [
  { name: 'Work', color: 'bg-blue-500' },
  { name: 'Personal', color: 'bg-green-500' },
  { name: 'Important', color: 'bg-red-500' },
  { name: 'Newsletter', color: 'bg-purple-500' },
]

const emails = ref<Email[]>([
  {
    id: 1,
    from: 'Sarah Johnson',
    email: 'sarah@company.com',
    subject: 'Q3 Marketing Report - Final Draft',
    preview: 'Hi team, please find attached the final draft of our Q3 marketing report...',
    body: `Hi team,

Please find attached the final draft of our Q3 marketing report. Key highlights include:

• 23% increase in organic traffic
• Social media engagement up by 45%
• Email campaign CTR improved to 4.2%
• New landing pages converted at 12.8%

Let me know if you have any questions or suggestions before we present this to the board on Friday.

Best regards,
Sarah`,
    time: '10:30 AM',
    date: 'Today',
    read: false,
    starred: true,
    labels: ['Work', 'Important'],
    hasAttachment: true,
  },
  {
    id: 2,
    from: 'GitHub',
    email: 'notifications@github.com',
    subject: '[purdia/purdia] Pull request #142: Add dark mode support',
    preview: 'Mike Chen requested your review on this pull request...',
    body: `Mike Chen requested your review on pull request #142.

Title: Add dark mode support to all components
Branch: feature/dark-mode → main

Changes:
- Updated 42 component files
- Added CSS custom properties for dark theme
- New useTheme composable
- Updated documentation

View on GitHub: https://github.com/purdia/purdia/pull/142`,
    time: '9:45 AM',
    date: 'Today',
    read: false,
    starred: false,
    labels: ['Work'],
    hasAttachment: false,
  },
  {
    id: 3,
    from: 'Alex Turner',
    email: 'alex@design.io',
    subject: 'New UI mockups for dashboard redesign',
    preview: 'Hey! I just finished the mockups for the dashboard redesign. Take a look...',
    body: `Hey!

I just finished the mockups for the dashboard redesign. Take a look and let me know what you think.

Main changes:
1. Simplified navigation structure
2. New card-based widget layout
3. Improved data visualization section
4. Mobile-responsive sidebar

I've also included some alternative color schemes. The Figma link is in the attachment.

Cheers,
Alex`,
    time: '8:12 AM',
    date: 'Today',
    read: false,
    starred: false,
    labels: ['Work'],
    hasAttachment: true,
  },
  {
    id: 4,
    from: 'Stripe',
    email: 'receipts@stripe.com',
    subject: 'Your receipt from Purdia Inc.',
    preview: 'Your payment of $49.00 for Pro Plan (monthly) was successful...',
    body: `Payment Receipt

Amount: $49.00
Description: Pro Plan (monthly)
Date: July 25, 2026
Card: •••• 4242

Thank you for your payment. Your subscription is active until August 25, 2026.

— The Stripe Team`,
    time: 'Yesterday',
    date: 'Yesterday',
    read: true,
    starred: false,
    labels: ['Personal'],
    hasAttachment: false,
  },
  {
    id: 5,
    from: 'Emily Davis',
    email: 'emily@company.com',
    subject: 'Team lunch this Friday?',
    preview: 'Hey everyone! How about we do a team lunch this Friday to celebrate...',
    body: `Hey everyone!

How about we do a team lunch this Friday to celebrate the product launch? I was thinking we could try that new Thai restaurant downtown.

Please reply with your availability:
- 12:00 PM
- 12:30 PM
- 1:00 PM

Looking forward to it!
Emily`,
    time: 'Yesterday',
    date: 'Yesterday',
    read: true,
    starred: true,
    labels: ['Personal'],
    hasAttachment: false,
  },
  {
    id: 6,
    from: 'Weekly Digest',
    email: 'digest@techweekly.io',
    subject: 'This week in tech: AI breakthroughs, new frameworks, and more',
    preview: 'Your weekly roundup of the latest in technology and development...',
    body: `This Week in Tech — Issue #234

Top Stories:
1. Vue 4 roadmap announced — what to expect
2. New CSS features landing in browsers this month
3. TypeScript 6.1 beta released with improved inference
4. The state of WebAssembly in 2026

Read the full digest online.

— Tech Weekly Team`,
    time: 'Jul 23',
    date: 'Jul 23',
    read: true,
    starred: false,
    labels: ['Newsletter'],
    hasAttachment: false,
  },
])

const currentFolder = ref<FolderType>('inbox')
const selectedEmail = ref<Email | null>(null)
const searchQuery = ref('')
const showCompose = ref(false)

const filteredEmails = computed(() => {
  let result = emails.value

  if (currentFolder.value === 'starred') {
    result = result.filter((e) => e.starred)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (e) =>
        e.subject.toLowerCase().includes(q) ||
        e.from.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q),
    )
  }

  return result
})

const unreadCount = computed(() => emails.value.filter((e) => !e.read).length)

function selectEmail(email: Email) {
  selectedEmail.value = email
  email.read = true
}

function toggleStar(email: Email, e: Event) {
  e.stopPropagation()
  email.starred = !email.starred
}

function goBack() {
  selectedEmail.value = null
}

function getLabelColor(label: string) {
  return labels.find((l) => l.name === label)?.color || 'bg-gray-500'
}

// Compose
const composeForm = ref({ to: '', subject: '', body: '' })

function openCompose() {
  showCompose.value = true
  composeForm.value = { to: '', subject: '', body: '' }
}

function closeCompose() {
  showCompose.value = false
}

function sendEmail() {
  // Mock send
  showCompose.value = false
}
</script>

<template>
  <div
    class="flex h-[calc(100vh-theme(spacing.32))] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800"
  >
    <!-- Sidebar -->
    <div class="w-56 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
      <div class="p-4">
        <BaseButton variant="primary" size="sm" class="w-full" @click="openCompose">
          <template #icon-left><Mail class="w-4 h-4" /></template>
          Compose
        </BaseButton>
      </div>

      <nav class="flex-1 px-2 space-y-0.5">
        <BaseButton
          v-for="folder in folders"
          :key="folder.id"
          variant="ghost"
          size="sm"
          class="w-full justify-start"
          :class="
            currentFolder === folder.id
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
              : ''
          "
          @click="
            currentFolder = folder.id
            selectedEmail = null
          "
        >
          <template #icon-left><component :is="folder.icon" class="w-4 h-4" /></template>
          <span class="flex-1 text-left">{{ folder.label }}</span>
          <span
            v-if="folder.count"
            class="text-xs font-medium"
            :class="
              currentFolder === folder.id
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-400'
            "
          >
            {{ folder.count }}
          </span>
        </BaseButton>
      </nav>

      <!-- Labels -->
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">Labels</p>
        <div class="space-y-1.5">
          <div
            v-for="label in labels"
            :key="label.name"
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <span class="w-2.5 h-2.5 rounded-full shrink-0" :class="label.color"></span>
            {{ label.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Email list / Detail -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Toolbar -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <BaseButton
          v-if="selectedEmail"
          variant="ghost"
          size="sm"
          :icon="ChevronLeft"
          @click="goBack"
        />
        <div class="flex-1">
          <BaseInput
            v-model="searchQuery"
            type="text"
            placeholder="Search emails..."
            size="sm"
            :icon="Search"
          />
        </div>
        <BaseButton variant="ghost" size="sm" :icon="RefreshCw" />
      </div>

      <!-- Email list -->
      <div
        v-if="!selectedEmail"
        class="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700/50"
      >
        <div
          v-for="email in filteredEmails"
          :key="email.id"
          class="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
          :class="
            email.read
              ? 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
              : 'bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20'
          "
          @click="selectEmail(email)"
        >
          <BaseAvatar :name="email.from" size="sm" class="shrink-0 mt-0.5" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <span
                class="text-sm truncate"
                :class="
                  email.read
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'font-semibold text-gray-900 dark:text-white'
                "
              >
                {{ email.from }}
              </span>
              <div class="flex items-center gap-2 shrink-0">
                <Paperclip v-if="email.hasAttachment" class="w-3.5 h-3.5 text-gray-400" />
                <span class="text-xs text-gray-400">{{ email.time }}</span>
              </div>
            </div>
            <p
              class="text-sm truncate mt-0.5"
              :class="
                email.read
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'font-medium text-gray-900 dark:text-white'
              "
            >
              {{ email.subject }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <p class="text-xs text-gray-400 dark:text-gray-500 truncate flex-1">
                {{ email.preview }}
              </p>
              <BaseButton
                variant="ghost"
                size="sm"
                class="!p-0 shrink-0"
                @click="toggleStar(email, $event)"
              >
                <Star
                  class="w-4 h-4 transition-colors"
                  :class="
                    email.starred
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'
                  "
                />
              </BaseButton>
            </div>
            <div v-if="email.labels.length" class="flex items-center gap-1.5 mt-1.5">
              <span
                v-for="label in email.labels"
                :key="label"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="getLabelColor(label)"></span>
                {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Email detail -->
      <div v-else class="flex-1 overflow-y-auto px-6 py-4">
        <div class="max-w-3xl">
          <!-- Subject -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ selectedEmail.subject }}
            </h2>
            <BaseButton
              variant="ghost"
              size="sm"
              class="!p-0"
              @click="toggleStar(selectedEmail, $event)"
            >
              <Star
                class="w-5 h-5 shrink-0"
                :class="
                  selectedEmail.starred
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                "
              />
            </BaseButton>
          </div>

          <!-- Labels -->
          <div v-if="selectedEmail.labels.length" class="flex items-center gap-2 mb-4">
            <span
              v-for="label in selectedEmail.labels"
              :key="label"
              class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
            >
              <span class="w-2 h-2 rounded-full" :class="getLabelColor(label)"></span>
              {{ label }}
            </span>
          </div>

          <!-- Sender info -->
          <div
            class="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-3">
              <BaseAvatar :name="selectedEmail.from" size="md" />
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ selectedEmail.from }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ selectedEmail.email }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400"
                >{{ selectedEmail.date }} at {{ selectedEmail.time }}</span
              >
            </div>
          </div>

          <!-- Body -->
          <div class="py-6">
            <pre
              class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed"
              >{{ selectedEmail.body }}</pre
            >
          </div>

          <!-- Attachment indicator -->
          <div
            v-if="selectedEmail.hasAttachment"
            class="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 mb-6"
          >
            <Paperclip class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600 dark:text-gray-400">1 attachment</span>
            <span
              class="text-xs text-primary-600 dark:text-primary-400 ml-auto cursor-pointer hover:underline"
              >Download</span
            >
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <BaseButton variant="outline" size="sm">
              <template #icon-left><Reply class="w-4 h-4" /></template>
              Reply
            </BaseButton>
            <BaseButton variant="ghost" size="sm">
              <template #icon-left><ReplyAll class="w-4 h-4" /></template>
              Reply All
            </BaseButton>
            <BaseButton variant="ghost" size="sm">
              <template #icon-left><Forward class="w-4 h-4" /></template>
              Forward
            </BaseButton>
            <div class="flex-1"></div>
            <BaseButton variant="ghost" size="sm" :icon="Archive" />
            <BaseButton variant="ghost" size="sm" :icon="Trash2" />
          </div>
        </div>
      </div>
    </div>

    <!-- Compose modal -->
    <Teleport to="body">
      <div v-if="showCompose" class="fixed inset-0 z-50 flex items-end justify-end p-6">
        <div
          class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[70vh]"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700"
          >
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">New Message</h3>
            <BaseButton variant="ghost" size="sm" :icon="X" @click="closeCompose" />
          </div>

          <!-- Form -->
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <BaseInput
              v-model="composeForm.to"
              type="email"
              placeholder="To"
              variant="underlined"
              size="sm"
            />
            <BaseInput
              v-model="composeForm.subject"
              type="text"
              placeholder="Subject"
              variant="underlined"
              size="sm"
            />
            <BaseTextarea
              v-model="composeForm.body"
              placeholder="Write your message..."
              :rows="8"
            />
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-1">
              <BaseButton variant="ghost" size="sm" :icon="Paperclip" />
            </div>
            <div class="flex items-center gap-2">
              <BaseButton variant="ghost" size="sm" @click="closeCompose">Discard</BaseButton>
              <BaseButton variant="primary" size="sm" @click="sendEmail">
                <template #icon-left><Send class="w-4 h-4" /></template>
                Send
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
