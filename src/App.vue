<template>
  <router-view />
</template>

<script setup lang="ts">
import { useTrackerStore } from '@/store/tracker'

const trackerStore = useTrackerStore()

trackerStore.getVisitorId()
</script>

<style scoped></style>
