<template>
  <router-view />
</template>

<script setup lang="ts">
// import { useTrackerStore } from '@/store/tracker'
import { useDarkMode } from '@/utils/useDarkMode'
// import { useMainStore } from '@/store'

// const trackerStore = useTrackerStore()
// trackerStore.syncVisitorId()

// const mainStore = useMainStore()

// mainStore.getBlogs()
// mainStore.getRecommend()

useDarkMode()
</script>

<style scoped></style>
