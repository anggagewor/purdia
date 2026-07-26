<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  Image,
  Circle,
} from '@lucide/vue'
import { BaseAvatar, BaseInput, BaseButton } from '@purdia/ui'

interface Contact {
  id: number
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
}

interface Message {
  id: number
  contactId: number
  text: string
  time: string
  fromMe: boolean
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image'
  imageUrl?: string
}

const contacts = ref<Contact[]>([
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Sure, I will send you the report by EOD.',
    time: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Mike Chen',
    lastMessage: 'The deployment went smoothly!',
    time: '15m ago',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Emily Davis',
    lastMessage: 'Can we reschedule the meeting?',
    time: '1h ago',
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: 'Alex Turner',
    lastMessage: 'I reviewed the PR, looks good 👍',
    time: '2h ago',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    lastMessage: 'Let me know when you are free.',
    time: '3h ago',
    unread: 0,
    online: true,
  },
  {
    id: 6,
    name: 'David Kim',
    lastMessage: 'The new design looks amazing!',
    time: '5h ago',
    unread: 0,
    online: false,
  },
  {
    id: 7,
    name: 'Rachel Green',
    lastMessage: 'Thanks for the help!',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 8,
    name: 'Tom Wilson',
    lastMessage: 'See you at the standup.',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
])

const messages = ref<Message[]>([
  {
    id: 1,
    contactId: 1,
    text: 'Hey! How is the project going?',
    time: '10:30 AM',
    fromMe: false,
    status: 'read',
    type: 'text',
  },
  {
    id: 2,
    contactId: 1,
    text: "Hi Sarah! It's going well. We're on track for the Friday deadline.",
    time: '10:32 AM',
    fromMe: true,
    status: 'read',
    type: 'text',
  },
  {
    id: 3,
    contactId: 1,
    text: "That's great to hear. Do you need any help with the frontend components?",
    time: '10:33 AM',
    fromMe: false,
    status: 'read',
    type: 'text',
  },
  {
    id: 4,
    contactId: 1,
    text: "Actually yes! Could you review the new dashboard layout? I've pushed the changes to the feature branch.",
    time: '10:35 AM',
    fromMe: true,
    status: 'read',
    type: 'text',
  },
  {
    id: 5,
    contactId: 1,
    text: "Sure, I'll take a look this afternoon. Also, can you send me the updated requirements doc?",
    time: '10:36 AM',
    fromMe: false,
    status: 'read',
    type: 'text',
  },
  {
    id: 6,
    contactId: 1,
    text: 'Sure, I will send you the report by EOD.',
    time: '10:38 AM',
    fromMe: false,
    status: 'read',
    type: 'text',
  },
  {
    id: 7,
    contactId: 2,
    text: 'Hey Mike, how did the deployment go?',
    time: '9:00 AM',
    fromMe: true,
    status: 'read',
    type: 'text',
  },
  {
    id: 8,
    contactId: 2,
    text: 'The deployment went smoothly! Zero downtime.',
    time: '9:15 AM',
    fromMe: false,
    status: 'read',
    type: 'text',
  },
])

const selectedContact = ref<Contact>(contacts.value[0])
const newMessage = ref('')
const searchQuery = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value
  const q = searchQuery.value.toLowerCase()
  return contacts.value.filter(
    (c) => c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q),
  )
})

const currentMessages = computed(() =>
  messages.value.filter((m) => m.contactId === selectedContact.value.id),
)

function selectContact(contact: Contact) {
  selectedContact.value = contact
  contact.unread = 0
}

async function sendMessage() {
  if (!newMessage.value.trim()) return

  const msg: Message = {
    id: messages.value.length + 1,
    contactId: selectedContact.value.id,
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    fromMe: true,
    status: 'sent',
    type: 'text',
  }

  messages.value.push(msg)
  newMessage.value = ''

  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }

  // Simulate delivered
  setTimeout(() => {
    msg.status = 'delivered'
  }, 1000)

  // Simulate read
  setTimeout(() => {
    msg.status = 'read'
  }, 2500)
}
</script>

<template>
  <div
    class="flex h-[calc(100vh-theme(spacing.32))] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800"
  >
    <!-- Sidebar -->
    <div class="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Messages</h2>
        <BaseInput
          v-model="searchQuery"
          type="text"
          placeholder="Search conversations..."
          size="sm"
          :icon="Search"
        />
      </div>

      <!-- Contact list -->
      <div class="flex-1 overflow-y-auto">
        <div
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
          :class="
            selectedContact.id === contact.id
              ? 'bg-primary-50 dark:bg-primary-900/20'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
          "
          @click="selectContact(contact)"
        >
          <div class="relative shrink-0">
            <BaseAvatar :name="contact.name" size="md" />
            <Circle
              v-if="contact.online"
              class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 text-green-500 fill-green-500 stroke-white dark:stroke-gray-800"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ contact.name }}
              </span>
              <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                {{ contact.time }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ contact.lastMessage }}
              </p>
              <span
                v-if="contact.unread"
                class="ml-2 shrink-0 w-5 h-5 flex items-center justify-center text-xs font-medium text-white bg-primary-600 rounded-full"
              >
                {{ contact.unread }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Chat header -->
      <div
        class="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-3">
          <div class="relative">
            <BaseAvatar :name="selectedContact.name" size="sm" />
            <Circle
              v-if="selectedContact.online"
              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-green-500 fill-green-500 stroke-white dark:stroke-gray-800"
            />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ selectedContact.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ selectedContact.online ? 'Online' : 'Offline' }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <BaseButton variant="ghost" size="sm" :icon="Phone" />
          <BaseButton variant="ghost" size="sm" :icon="Video" />
          <BaseButton variant="ghost" size="sm" :icon="MoreVertical" />
        </div>
      </div>

      <!-- Messages -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <div
          v-for="msg in currentMessages"
          :key="msg.id"
          class="flex"
          :class="msg.fromMe ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[70%] rounded-2xl px-4 py-2.5"
            :class="
              msg.fromMe
                ? 'bg-primary-600 text-white rounded-br-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
            "
          >
            <p class="text-sm whitespace-pre-wrap">{{ msg.text }}</p>
            <div
              class="flex items-center justify-end gap-1 mt-1"
              :class="msg.fromMe ? 'text-primary-200' : 'text-gray-400 dark:text-gray-500'"
            >
              <span class="text-xs">{{ msg.time }}</span>
              <CheckCheck
                v-if="msg.fromMe && msg.status === 'read'"
                class="w-3.5 h-3.5 text-blue-300"
              />
              <CheckCheck
                v-else-if="msg.fromMe && msg.status === 'delivered'"
                class="w-3.5 h-3.5"
              />
              <Check v-else-if="msg.fromMe && msg.status === 'sent'" class="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <form class="flex items-center gap-3" @submit.prevent="sendMessage">
          <BaseButton variant="ghost" size="sm" type="button" :icon="Paperclip" />
          <BaseButton variant="ghost" size="sm" type="button" :icon="Image" />
          <div class="flex-1 relative">
            <BaseInput
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              size="md"
              @keydown.enter.prevent="sendMessage"
            />
          </div>
          <BaseButton
            type="submit"
            variant="primary"
            size="sm"
            :icon="Send"
            :disabled="!newMessage.trim()"
            class="rounded-full"
          />
        </form>
      </div>
    </div>
  </div>
</template>
