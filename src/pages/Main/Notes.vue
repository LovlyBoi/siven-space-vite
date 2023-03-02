<template>
  <CardContainer :action="getNotes" />
</template>

<script setup lang="ts">
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getBlogsByType } from '@/api'

function getNotes() {
  return getBlogsByType('notes')
}
</script>
