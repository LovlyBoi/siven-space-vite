<template>
  <CardContainer :action="getNotes" />
</template>

<script setup lang="ts">
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getNotes } from '@/api'
</script>
