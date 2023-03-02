<template>
  <CardContainer :action="getEssays" />
</template>

<script setup lang="ts">
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getBlogsByType } from '@/api'

function getEssays() {
  return getBlogsByType('essays')
}
</script>
