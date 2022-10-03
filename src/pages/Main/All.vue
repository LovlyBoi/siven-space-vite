<template>
  <CardContainer :action="getAllBlogs" />
</template>

<script setup lang="ts">
import CardContainer from '@/components/CardMasonry/CardContainer.vue'
import { getAllBlogs } from '@/api'
</script>
