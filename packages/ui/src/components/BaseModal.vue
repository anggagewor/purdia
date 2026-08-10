<script setup lang="ts">
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface Props {
  modelValue: boolean
  size?: ModalSize
  title?: string
  closable?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  persistent: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialogRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null

function close() {
  emit('update:modelValue', false)
}

// ---------------------------------------------------------------------------
// Focus Trap
// ---------------------------------------------------------------------------

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(dialogRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closable && !props.persistent) {
    close()
    return
  }

  if (e.key === 'Tab') {
    const focusable = getFocusableElements()
    if (focusable.length === 0) {
      e.preventDefault()
      return
    }

    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
}

// Watch open/close to manage focus
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      previousActiveElement = document.activeElement as HTMLElement | null
      await nextTick()
      // Focus the first focusable element, or the dialog itself
      const focusable = getFocusableElements()
      if (focusable.length > 0) {
        focusable[0]!.focus()
      } else {
        dialogRef.value?.focus()
      }
    } else {
      // Restore focus to previously focused element
      previousActiveElement?.focus()
      previousActiveElement = null
    }
  },
)

onBeforeUnmount(() => {
  previousActiveElement?.focus()
})

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw]',
}

const modalClasses = computed(() => [
  'bg-white rounded-xl shadow-xl max-h-[85vh] flex flex-col w-full dark:bg-gray-800',
  sizeClasses[props.size],
])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
        @click.self="persistent ? undefined : close()"
      >
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'modal-title' : undefined"
          :class="modalClasses"
          tabindex="-1"
          @keydown="handleKeydown"
        >
          <div
            v-if="title || closable"
            class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700"
          >
            <h3
              v-if="title"
              id="modal-title"
              class="text-lg font-semibold dark:text-gray-100"
            >
              {{ title }}
            </h3>
            <button
              v-if="closable"
              class="text-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded p-1 leading-none cursor-pointer dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
              @click="close"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div class="p-6 overflow-y-auto dark:text-gray-300">
            <slot />
          </div>
          <div
            v-if="$slots.footer"
            class="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end dark:border-gray-700"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms ease;
}
.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 200ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95) translateY(-10px);
}
</style>
