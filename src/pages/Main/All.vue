<template>
  <CardContainer :action="mainStore.getBlogsToShow" />
</template>

<script setup lang="ts">
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getAllBlogs } from '@/api'
import { useMainStore } from '@/store'

const mainStore = useMainStore()
</script>
