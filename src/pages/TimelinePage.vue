<script setup lang="ts">
import { ref } from 'vue'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  ThumbsUp,
  GitBranch,
  Rocket,
  Code,
  Star,
  Users,
  Award,
  Repeat2,
} from '@lucide/vue'
import { BaseAvatar, BaseButton, BaseCard, BaseBadge } from '@purdia/ui'

interface Post {
  id: number
  author: string
  role: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  bookmarked: boolean
  type: 'post' | 'milestone' | 'announcement' | 'shared'
  sharedFrom?: string
  tags?: string[]
}

const posts = ref<Post[]>([
  {
    id: 1,
    author: 'Sarah Johnson',
    role: 'Product Designer',
    time: '2 hours ago',
    content: 'Just shipped the new dashboard redesign! Really proud of what the team accomplished in just 3 sprints. The key improvements include a simplified navigation, card-based widgets, and a fully responsive sidebar. Check it out and let me know what you think.',
    likes: 42,
    comments: 8,
    shares: 5,
    liked: false,
    bookmarked: false,
    type: 'post',
    tags: ['design', 'product-update'],
  },
  {
    id: 2,
    author: 'Purdia Team',
    role: 'Official',
    time: '5 hours ago',
    content: 'We are thrilled to announce Purdia v1.0! After months of development, we are launching with 40+ components, 9 business modules, and a monorepo architecture that makes customization a breeze.',
    likes: 128,
    comments: 23,
    shares: 45,
    liked: true,
    bookmarked: true,
    type: 'announcement',
    tags: ['release', 'milestone'],
  },
  {
    id: 3,
    author: 'Mike Chen',
    role: 'Senior Developer',
    time: '8 hours ago',
    content: 'TIL: You can use `defineModel()` in Vue 3.4+ to create two-way bindings without all the emit boilerplate. Game changer for form components!',
    likes: 67,
    comments: 12,
    shares: 18,
    liked: false,
    bookmarked: false,
    type: 'post',
    tags: ['vue', 'tips'],
  },
  {
    id: 4,
    author: 'Emily Davis',
    role: 'Engineering Manager',
    time: '1 day ago',
    content: 'Big congrats to the frontend team for reaching 95% test coverage on the UI library! Huge effort across all 40+ components.',
    likes: 89,
    comments: 15,
    shares: 7,
    liked: true,
    bookmarked: false,
    type: 'milestone',
  },
  {
    id: 5,
    author: 'Alex Turner',
    role: 'UI Engineer',
    time: '1 day ago',
    content: 'Shared an interesting article about micro-frontend architecture patterns that could work well for our module system.',
    likes: 23,
    comments: 4,
    shares: 2,
    liked: false,
    bookmarked: false,
    type: 'shared',
    sharedFrom: 'Frontend Weekly Newsletter',
  },
  {
    id: 6,
    author: 'Lisa Wang',
    role: 'DevOps Engineer',
    time: '2 days ago',
    content: 'Successfully migrated our CI/CD pipeline to GitHub Actions. Build times are now 3x faster and we saved $200/month on infrastructure costs. Here are the key changes we made...',
    likes: 56,
    comments: 9,
    shares: 11,
    liked: false,
    bookmarked: true,
    type: 'post',
    tags: ['devops', 'ci-cd'],
  },
])

const milestones = [
  { icon: Rocket, label: 'v1.0 Released', time: '2 days ago', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
  { icon: Users, label: '1000 Users', time: '1 week ago', color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
  { icon: Code, label: '100 PRs Merged', time: '2 weeks ago', color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' },
  { icon: Award, label: 'First Contributor', time: '1 month ago', color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30' },
]

const trending = [
  { tag: 'vue', posts: 234 },
  { tag: 'typescript', posts: 189 },
  { tag: 'tailwindcss', posts: 156 },
  { tag: 'design-system', posts: 98 },
  { tag: 'monorepo', posts: 72 },
]

function toggleLike(post: Post) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function toggleBookmark(post: Post) {
  post.bookmarked = !post.bookmarked
}

function getPostIcon(type: string) {
  const map: Record<string, typeof Rocket> = {
    announcement: Rocket,
    milestone: Star,
    shared: Repeat2,
  }
  return map[type]
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Timeline</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">Activity feed and updates from your team.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main feed -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Compose box -->
        <BaseCard>
          <div class="flex gap-3">
            <BaseAvatar name="Angga Setiawan" size="sm" class="shrink-0" />
            <div class="flex-1">
              <div
                class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                What's on your mind?
              </div>
              <div class="flex items-center gap-2 mt-3">
                <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Image class="w-4 h-4 text-green-500" />
                  Photo
                </button>
                <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Code class="w-4 h-4 text-blue-500" />
                  Code Snippet
                </button>
                <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <GitBranch class="w-4 h-4 text-purple-500" />
                  PR Link
                </button>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Posts -->
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <!-- Shared/Announcement indicator -->
          <div
            v-if="post.type === 'shared'"
            class="px-4 pt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
          >
            <Repeat2 class="w-3.5 h-3.5" />
            <span>Shared from <strong>{{ post.sharedFrom }}</strong></span>
          </div>
          <div
            v-if="post.type === 'announcement'"
            class="px-4 pt-3 flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400"
          >
            <Rocket class="w-3.5 h-3.5" />
            <span class="font-medium">Announcement</span>
          </div>
          <div
            v-if="post.type === 'milestone'"
            class="px-4 pt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400"
          >
            <Star class="w-3.5 h-3.5" />
            <span class="font-medium">Milestone</span>
          </div>

          <!-- Header -->
          <div class="flex items-start justify-between p-4 pb-0">
            <div class="flex items-center gap-3">
              <BaseAvatar :name="post.author" size="sm" />
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ post.author }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ post.role }} · {{ post.time }}
                </p>
              </div>
            </div>
            <button class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreHorizontal class="w-4 h-4" />
            </button>
          </div>

          <!-- Content -->
          <div class="px-4 py-3">
            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {{ post.content }}
            </p>
            <!-- Tags -->
            <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-md"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Stats -->
          <div class="px-4 py-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/50">
            <div class="flex items-center gap-1">
              <ThumbsUp class="w-3.5 h-3.5 text-primary-500" />
              <span>{{ post.likes }} likes</span>
            </div>
            <div class="flex items-center gap-3">
              <span>{{ post.comments }} comments</span>
              <span>{{ post.shares }} shares</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="px-4 py-2 flex items-center border-t border-gray-100 dark:border-gray-700/50">
            <button
              class="flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-lg transition-colors"
              :class="post.liked ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
              @click="toggleLike(post)"
            >
              <Heart class="w-4 h-4" :class="post.liked ? 'fill-current' : ''" />
              Like
            </button>
            <button class="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MessageCircle class="w-4 h-4" />
              Comment
            </button>
            <button class="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Share2 class="w-4 h-4" />
              Share
            </button>
            <button
              class="p-2 rounded-lg transition-colors"
              :class="post.bookmarked ? 'text-amber-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              @click="toggleBookmark(post)"
            >
              <Bookmark class="w-4 h-4" :class="post.bookmarked ? 'fill-current' : ''" />
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-4">
        <!-- Milestones -->
        <BaseCard>
          <template #header>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Milestones</h3>
          </template>
          <div class="space-y-3">
            <div
              v-for="milestone in milestones"
              :key="milestone.label"
              class="flex items-center gap-3"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="milestone.color">
                <component :is="milestone.icon" class="w-4 h-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {{ milestone.label }}
                </p>
                <p class="text-xs text-gray-400">{{ milestone.time }}</p>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Trending tags -->
        <BaseCard>
          <template #header>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Trending</h3>
          </template>
          <div class="space-y-2.5">
            <div
              v-for="(item, index) in trending"
              :key="item.tag"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 w-4">{{ index + 1 }}</span>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  #{{ item.tag }}
                </span>
              </div>
              <span class="text-xs text-gray-400">{{ item.posts }} posts</span>
            </div>
          </div>
        </BaseCard>

        <!-- Suggested -->
        <BaseCard>
          <template #header>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">People to Follow</h3>
          </template>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <BaseAvatar name="Tom Wilson" size="xs" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-900 dark:text-white truncate">Tom Wilson</p>
                <p class="text-xs text-gray-400 truncate">Backend Engineer</p>
              </div>
              <BaseButton variant="outline" size="sm" class="text-xs px-2 py-1">Follow</BaseButton>
            </div>
            <div class="flex items-center gap-2">
              <BaseAvatar name="Rachel Green" size="xs" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-900 dark:text-white truncate">Rachel Green</p>
                <p class="text-xs text-gray-400 truncate">QA Engineer</p>
              </div>
              <BaseButton variant="outline" size="sm" class="text-xs px-2 py-1">Follow</BaseButton>
            </div>
            <div class="flex items-center gap-2">
              <BaseAvatar name="David Kim" size="xs" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-900 dark:text-white truncate">David Kim</p>
                <p class="text-xs text-gray-400 truncate">Mobile Developer</p>
              </div>
              <BaseButton variant="outline" size="sm" class="text-xs px-2 py-1">Follow</BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
