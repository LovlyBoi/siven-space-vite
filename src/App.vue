<template>
  <router-view />
</template>

<script setup lang="ts">
import { useTrackerStore } from '@/store/tracker'
import { useDarkMode } from '@/utils/useDarkMode'

const trackerStore = useTrackerStore()
trackerStore.getVisitorId()

useDarkMode()
</script>

<style scoped></style>
