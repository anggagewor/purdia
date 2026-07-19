<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'

const route = useRoute()

const isGuestRoute = computed(() => route.meta.guest === true)
</script>

<template>
  <DashboardLayout v-if="!isGuestRoute">
    <RouterView :key="route.fullPath" />
  </DashboardLayout>
  <RouterView v-else />
  <ToastContainer />
</template>

<style scoped></style>
