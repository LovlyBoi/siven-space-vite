<template>
  <CardContainer :action="getEssays" />
</template>

<script setup lang="ts">
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getEssays } from '@/api'
</script>
