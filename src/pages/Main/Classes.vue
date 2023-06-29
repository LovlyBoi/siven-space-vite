<template>
  <CardContainer :action="getBlogs" :key="refreshFlag" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getBlogsByType } from '@/api'
import { useRoute } from 'vue-router'

const route = useRoute()

const getBlogs = () => {
  return getBlogsByType(route.params.className || 'all')
}

// 由于架构问题，只能强制子组件刷新
const refreshFlag = ref(1)

watch(
  () => route.params.className,
  () => refreshFlag.value++
)
</script>
