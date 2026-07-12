<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown } from '@lucide/vue'
import * as icons from '@lucide/vue'
import type { Component as VueComponent } from 'vue'
import { useMenuStore } from '@/stores/menu'
import type { Menu } from '@/lib/api'

interface Props {
  collapsed: boolean
}

defineProps<Props>()

const route = useRoute()
const menuStore = useMenuStore()

// Fetch menus on mount if not loaded yet
onMounted(() => {
  if (!menuStore.loaded) {
    menuStore.fetchMenus()
  }
})

// ---------------------------------------------------------------------------
// Icon resolver — maps icon string name (e.g. "shopping-cart") to Lucide component
// ---------------------------------------------------------------------------

/** Convert kebab-case or snake_case to PascalCase */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

function resolveIcon(iconName: string | null): VueComponent | undefined {
  if (!iconName) return undefined
  const pascal = toPascalCase(iconName)
  const icon = (icons as unknown as Record<string, VueComponent>)[pascal]
  return icon ?? undefined
}

// ---------------------------------------------------------------------------
// Menu state
// ---------------------------------------------------------------------------

const openMenus = ref<Set<string>>(new Set())
const popoverMenu = ref<string | null>(null)
const popoverTop = ref(0)
const popoverLeft = ref(0)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

// Auto-open parent menus based on current route
function getInitialOpenMenus(items: Menu[]): Set<string> {
  const set = new Set<string>()
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      if (item.children.some((child) => route.path === child.path)) {
        set.add(item.slug)
      }
      // Check grandchildren
      for (const child of item.children) {
        if (child.children && child.children.length > 0) {
          if (child.children.some((gc) => route.path === gc.path)) {
            set.add(item.slug)
            set.add(child.slug)
          }
        }
      }
    }
  }
  return set
}

// Re-compute open menus when menus load or route changes
watch(
  () => [menuStore.menus, route.path],
  () => {
    if (menuStore.menus.length > 0) {
      const initial = getInitialOpenMenus(menuStore.menus)
      // Merge with existing (don't close manually opened ones)
      initial.forEach((key) => openMenus.value.add(key))
    }
  },
  { immediate: true },
)

function toggleMenu(slug: string) {
  if (openMenus.value.has(slug)) {
    openMenus.value.delete(slug)
  } else {
    openMenus.value.add(slug)
  }
}

function showPopover(slug: string, event: MouseEvent) {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  popoverTop.value = rect.top
  popoverLeft.value = rect.right + 8
  popoverMenu.value = slug
}

function hidePopover() {
  hideTimeout = setTimeout(() => {
    popoverMenu.value = null
  }, 100)
}

function keepPopover() {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

function getPopoverItem(): Menu | undefined {
  return menuStore.menus.find((m) => m.slug === popoverMenu.value)
}

function isActive(path: string | null) {
  if (!path) return false
  return route.path === path
}

function isParentActive(item: Menu) {
  if (!item.children) return false
  return item.children.some(
    (child) =>
      route.path === child.path ||
      (child.children && child.children.some((gc) => route.path === gc.path)),
  )
}
</script>

<template>
  <aside
    class="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-[width] duration-200 z-50 dark:bg-gray-800 dark:border-gray-700"
    :class="collapsed ? 'w-[4.5rem]' : 'w-64'"
  >
    <!-- Logo -->
    <div
      class="flex items-center gap-3 px-4 h-14 shrink-0 border-b border-gray-100 overflow-hidden dark:border-gray-700"
    >
      <div
        class="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
      >
        P
      </div>
      <span
        v-if="!collapsed"
        class="font-bold text-lg text-gray-900 whitespace-nowrap dark:text-gray-100"
        >Purdia</span
      >
    </div>

    <!-- Loading state -->
    <div v-if="menuStore.loading && !menuStore.loaded" class="flex-1 p-3">
      <div
        v-for="i in 6"
        :key="i"
        class="h-8 bg-gray-100 rounded-md mb-1 animate-pulse dark:bg-gray-700"
      />
    </div>

    <!-- Navigation -->
    <nav v-else class="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
      <template v-for="item in menuStore.menus" :key="item.id">
        <!-- Regular link (no children) -->
        <router-link
          v-if="!item.children || item.children.length === 0"
          :to="item.path ?? '/'"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 text-sm font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline dark:text-gray-400"
          :class="
            isActive(item.path)
              ? 'bg-primary-50 text-primary-600 hover:bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400'
              : 'hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200'
          "
        >
          <component
            v-if="resolveIcon(item.icon)"
            :is="resolveIcon(item.icon)"
            class="w-5 h-5 shrink-0"
          />
          <span v-if="!collapsed">{{ item.name }}</span>
        </router-link>

        <!-- Dropdown parent (has children) -->
        <div v-else class="relative">
          <button
            class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer"
            :class="
              isParentActive(item)
                ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
            "
            @click="collapsed ? showPopover(item.slug, $event) : toggleMenu(item.slug)"
            @mouseenter="collapsed ? showPopover(item.slug, $event) : undefined"
            @mouseleave="collapsed ? hidePopover() : undefined"
          >
            <component
              v-if="resolveIcon(item.icon)"
              :is="resolveIcon(item.icon)"
              class="w-5 h-5 shrink-0"
            />
            <span v-if="!collapsed" class="flex-1 text-left">{{ item.name }}</span>
            <ChevronDown
              v-if="!collapsed"
              class="w-4 h-4 shrink-0 transition-transform duration-200"
              :class="openMenus.has(item.slug) ? 'rotate-180' : ''"
            />
          </button>

          <!-- Submenu expanded (not collapsed) -->
          <div
            v-if="!collapsed"
            class="overflow-hidden transition-all duration-200"
            :class="openMenus.has(item.slug) ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
          >
            <div class="ml-4 pl-3 border-l border-gray-200 mt-1 space-y-0.5 dark:border-gray-700">
              <template v-for="child in item.children" :key="child.id">
                <!-- Child with grandchildren -->
                <div v-if="child.children && child.children.length > 0">
                  <button
                    class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer"
                    :class="
                      child.children.some((gc) => route.path === gc.path)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                    "
                    @click="toggleMenu(child.slug)"
                  >
                    <component
                      v-if="resolveIcon(child.icon)"
                      :is="resolveIcon(child.icon)"
                      class="w-3.5 h-3.5 shrink-0"
                    />
                    <span class="flex-1 text-left">{{ child.name }}</span>
                    <ChevronDown
                      class="w-3 h-3 shrink-0 transition-transform duration-200"
                      :class="openMenus.has(child.slug) ? 'rotate-180' : ''"
                    />
                  </button>

                  <div
                    class="overflow-hidden transition-all duration-200"
                    :class="
                      openMenus.has(child.slug) ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                    "
                  >
                    <div
                      class="ml-3 pl-2.5 border-l border-gray-100 mt-0.5 space-y-0.5 dark:border-gray-700"
                    >
                      <router-link
                        v-for="gc in child.children"
                        :key="gc.id"
                        :to="gc.path ?? '/'"
                        class="flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
                        :class="
                          isActive(gc.path)
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                        "
                      >
                        <component
                          v-if="resolveIcon(gc.icon)"
                          :is="resolveIcon(gc.icon)"
                          class="w-3 h-3 shrink-0"
                        />
                        <span>{{ gc.name }}</span>
                      </router-link>
                    </div>
                  </div>
                </div>

                <!-- Simple child link -->
                <router-link
                  v-else
                  :to="child.path ?? '/'"
                  class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
                  :class="
                    isActive(child.path)
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                  "
                >
                  <component
                    v-if="resolveIcon(child.icon)"
                    :is="resolveIcon(child.icon)"
                    class="w-3.5 h-3.5 shrink-0"
                  />
                  <span>{{ child.name }}</span>
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </template>
    </nav>
  </aside>

  <!-- Popover submenu (collapsed mode) -->
  <Teleport to="body">
    <div
      v-if="collapsed && popoverMenu && getPopoverItem()"
      class="fixed z-[9999] min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 dark:bg-gray-800 dark:border-gray-700"
      :style="{ top: popoverTop + 'px', left: popoverLeft + 'px' }"
      @mouseenter="keepPopover()"
      @mouseleave="hidePopover()"
    >
      <div class="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
        <span
          class="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400"
        >
          {{ getPopoverItem()!.name }}
        </span>
      </div>
      <div class="py-1">
        <template v-for="child in getPopoverItem()!.children" :key="child.id">
          <!-- Child group with grandchildren -->
          <template v-if="child.children && child.children.length > 0">
            <div
              class="px-3 py-1 text-[0.625rem] font-semibold text-gray-400 uppercase tracking-wider"
            >
              {{ child.name }}
            </div>
            <router-link
              v-for="gc in child.children"
              :key="gc.id"
              :to="gc.path ?? '/'"
              class="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
              :class="
                isActive(gc.path)
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              "
              @click="hidePopover()"
            >
              <component
                v-if="resolveIcon(gc.icon)"
                :is="resolveIcon(gc.icon)"
                class="w-3.5 h-3.5 shrink-0"
              />
              <span>{{ gc.name }}</span>
            </router-link>
          </template>

          <!-- Simple child link -->
          <router-link
            v-else
            :to="child.path ?? '/'"
            class="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap no-underline hover:no-underline"
            :class="
              isActive(child.path)
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
            "
            @click="hidePopover()"
          >
            <component
              v-if="resolveIcon(child.icon)"
              :is="resolveIcon(child.icon)"
              class="w-3.5 h-3.5 shrink-0"
            />
            <span>{{ child.name }}</span>
          </router-link>
        </template>
      </div>
    </div>
  </Teleport>
</template>
