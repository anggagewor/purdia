<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Loader, RefreshCw, Image, Heart, MessageCircle, Share2 } from '@lucide/vue'
import { BaseAvatar, BaseCard, BaseButton, BaseBadge } from '@purdia/ui'

interface Post {
  id: number
  author: string
  role: string
  content: string
  time: string
  likes: number
  comments: number
  image?: string
  tags: string[]
}

const posts = ref<Post[]>([])
const loading = ref(false)
const page = ref(0)
const hasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const authors = [
  { name: 'Sarah Johnson', role: 'Product Designer' },
  { name: 'Mike Chen', role: 'Senior Developer' },
  { name: 'Emily Davis', role: 'Engineering Manager' },
  { name: 'Alex Turner', role: 'UI Engineer' },
  { name: 'Lisa Wang', role: 'DevOps Engineer' },
  { name: 'David Kim', role: 'Mobile Developer' },
  { name: 'Rachel Green', role: 'QA Engineer' },
  { name: 'Tom Wilson', role: 'Backend Developer' },
  { name: 'Anna Martinez', role: 'Data Analyst' },
  { name: 'James Lee', role: 'Tech Lead' },
]

const sampleContents = [
  'Just deployed a major refactor to production. Zero downtime! The new architecture handles 3x more concurrent users.',
  'Spent the morning optimizing our Webpack config. Build time went from 45s to 12s. Sometimes the small wins matter the most.',
  'Who else is excited about the new CSS `@scope` rule? Finally, proper style encapsulation without BEM or CSS Modules.',
  'Hot take: TypeScript strict mode should be the default for every project. The upfront cost pays for itself in fewer runtime bugs.',
  'Pair programming session today was incredibly productive. Two brains > one brain, especially for complex state management.',
  'The new Vue Vapor mode is looking promising. Compiled reactivity without virtual DOM could be a game changer for performance.',
  'Reminder: good documentation is not optional. If your team cannot understand the code without you, you have a bus factor of 1.',
  'Just hit 100% test coverage on our shared component library. Took us 3 sprints but now we deploy with confidence.',
  'Migrated our monolith to microservices last quarter. Lessons learned: start with a strangler fig pattern, not a big bang rewrite.',
  'The best code review feedback I ever got: "This works, but what happens when the user does something unexpected?"',
  'Tried the new Bun runtime for our build tooling. 4x faster installs and native TypeScript execution. Seriously impressed.',
  'Accessibility is not a feature, it is a requirement. Today I learned screen readers cannot parse SVG icons without proper aria-labels.',
  'Pushed my first Rust contribution today. The compiler error messages are actually helpful, which is a refreshing change.',
  'Design tokens + Tailwind CSS v4 = theming nirvana. One config change and the entire app updates consistently.',
  'Our team just adopted trunk-based development. Feature flags > long-lived branches. Merge conflicts are now rare.',
]

const tagOptions = [
  'vue',
  'react',
  'typescript',
  'css',
  'devops',
  'testing',
  'architecture',
  'performance',
  'accessibility',
  'tooling',
]

const imageColors = [
  'from-blue-400 to-indigo-500',
  'from-green-400 to-emerald-500',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-purple-400 to-violet-500',
  'from-cyan-400 to-teal-500',
]

function generatePost(id: number): Post {
  const author = authors[id % authors.length]
  const content = sampleContents[id % sampleContents.length]
  const numTags = 1 + (id % 3)
  const tags: string[] = []
  for (let i = 0; i < numTags; i++) {
    tags.push(tagOptions[(id + i) % tagOptions.length])
  }

  const hasImage = id % 3 === 0

  return {
    id,
    author: author.name,
    role: author.role,
    content,
    time: `${(id % 24) + 1}h ago`,
    likes: 10 + ((id * 7) % 200),
    comments: (id * 3) % 50,
    image: hasImage ? imageColors[id % imageColors.length] : undefined,
    tags,
  }
}

async function loadMore() {
  if (loading.value || !hasMore.value) return

  loading.value = true

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const pageSize = 6
  const start = page.value * pageSize
  const newPosts: Post[] = []

  for (let i = 0; i < pageSize; i++) {
    newPosts.push(generatePost(start + i))
  }

  posts.value.push(...newPosts)
  page.value++

  // Stop after 50 items (simulating end of data)
  if (posts.value.length >= 50) {
    hasMore.value = false
  }

  loading.value = false
}

function reset() {
  posts.value = []
  page.value = 0
  hasMore.value = true
  loadMore()
}

onMounted(() => {
  // Initial load
  loadMore()

  // Setup intersection observer
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading.value && hasMore.value) {
        loadMore()
      }
    },
    { rootMargin: '200px' },
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Infinite Scroll</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Lazy-loading list with IntersectionObserver. Scroll down to load more posts.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-400 dark:text-gray-500">
          {{ posts.length }} / 50 loaded
        </span>
        <BaseButton variant="outline" size="sm" @click="reset">
          <template #icon-left><RefreshCw class="w-4 h-4" /></template>
          Reset
        </BaseButton>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        class="h-full bg-primary-600 transition-all duration-300 rounded-full"
        :style="{ width: `${(posts.length / 50) * 100}%` }"
      ></div>
    </div>

    <!-- Posts grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
      >
        <!-- Image placeholder -->
        <div
          v-if="post.image"
          class="h-36 bg-gradient-to-br flex items-center justify-center"
          :class="post.image"
        >
          <Image class="w-8 h-8 text-white/50" />
        </div>

        <div class="p-4">
          <!-- Author -->
          <div class="flex items-center gap-2.5 mb-3">
            <BaseAvatar :name="post.author" size="sm" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ post.author }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ post.role }} · {{ post.time }}
              </p>
            </div>
          </div>

          <!-- Content -->
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-3">
            {{ post.content }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-3">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-2 py-0.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-md"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Actions -->
          <div
            class="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700/50"
          >
            <button
              class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart class="w-3.5 h-3.5" />
              {{ post.likes }}
            </button>
            <button
              class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              {{ post.comments }}
            </button>
            <button
              class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors"
            >
              <Share2 class="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="flex items-center justify-center gap-3 py-8">
      <Loader class="w-5 h-5 text-primary-600 animate-spin" />
      <span class="text-sm text-gray-500 dark:text-gray-400">Loading more posts...</span>
    </div>

    <!-- End of list -->
    <div v-if="!hasMore" class="text-center py-8">
      <p class="text-sm text-gray-400 dark:text-gray-500">
        You've reached the end! All 50 posts loaded.
      </p>
    </div>

    <!-- Sentinel element for IntersectionObserver -->
    <div ref="sentinel" class="h-1"></div>
  </div>
</template>
