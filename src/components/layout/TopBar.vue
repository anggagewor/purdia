<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, Bell, Search, User, KeyRound, LogOut, Sun, Moon, Palette } from '@lucide/vue'
import { BaseAvatar } from '@purdia/ui'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore, colorOptions } from '@/stores/theme'

defineEmits<{
  'toggle-sidebar': []
}>()

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()
const showUserMenu = ref(false)
const showColorPicker = ref(false)
const menuRef = ref<HTMLElement>()
const colorRef = ref<HTMLElement>()

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

function toggleColorPicker() {
  showColorPicker.value = !showColorPicker.value
}

function handleClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    showUserMenu.value = false
  }
  if (colorRef.value && !colorRef.value.contains(e.target as Node)) {
    showColorPicker.value = false
  }
}

function navigate(path: string) {
  showUserMenu.value = false
  router.push(path)
}

function logout() {
  showUserMenu.value = false
  auth.logout()
  router.push({ name: 'login' })
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 h-14 sticky top-0 z-40 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center gap-4">
      <button
        class="p-1 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        <Menu :size="20" />
      </button>
      <div
        class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600"
      >
        <Search :size="16" class="text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          class="border-none outline-none bg-transparent text-sm w-56 placeholder:text-gray-400 dark:text-gray-200 dark:placeholder:text-gray-500"
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- Theme toggle -->
      <button
        class="p-1 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700"
        aria-label="Toggle theme"
        @click="themeStore.toggle()"
      >
        <Moon v-if="themeStore.theme === 'light'" :size="20" />
        <Sun v-else :size="20" />
      </button>

      <!-- Color picker -->
      <div ref="colorRef" class="relative">
        <button
          class="p-1 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Change primary color"
          @click.stop="toggleColorPicker"
        >
          <Palette :size="20" />
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="showColorPicker"
            class="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <p class="text-xs font-semibold text-gray-500 mb-2 dark:text-gray-400">Primary Color</p>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="color in colorOptions"
                :key="color.name"
                class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
                :class="
                  themeStore.primaryColor === color.name
                    ? 'ring-2 ring-gray-900 dark:ring-white scale-110'
                    : ''
                "
                :style="{ backgroundColor: color.swatch }"
                :title="color.label"
                :aria-label="`Set primary color to ${color.label}`"
                @click="
                  () => {
                    themeStore.setColor(color.name)
                    showColorPicker = false
                  }
                "
              />
            </div>
          </div>
        </Transition>
      </div>

      <button
        class="relative p-1 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700"
        aria-label="Notifications"
      >
        <Bell :size="20" />
        <span
          class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[0.6rem] font-semibold w-4 h-4 rounded-full flex items-center justify-center"
        >
          3
        </span>
      </button>

      <!-- User dropdown -->
      <div ref="menuRef" class="relative">
        <button
          class="flex items-center gap-2 cursor-pointer rounded-md p-1 hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
          @click.stop="toggleUserMenu"
        >
          <BaseAvatar :name="auth.user?.name ?? ''" size="sm" />
          <span class="text-sm font-medium text-gray-700 hidden sm:inline dark:text-gray-200">{{
            auth.user?.name
          }}</span>
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="showUserMenu"
            class="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <!-- User info -->
            <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {{ auth.user?.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ auth.user?.email }}</p>
            </div>

            <!-- Menu items -->
            <div class="py-1">
              <button
                class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                @click="navigate('/profile')"
              >
                <User class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                My Profile
              </button>
              <button
                class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                @click="navigate('/change-password')"
              >
                <KeyRound class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                Change Password
              </button>
            </div>

            <!-- Logout -->
            <div class="border-t border-gray-100 py-1 dark:border-gray-700">
              <button
                class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                @click="logout"
              >
                <LogOut class="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
