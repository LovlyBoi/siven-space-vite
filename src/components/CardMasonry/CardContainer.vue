<template>
  <div class="card-container w-full py-6">
    <Card v-for="card in cards" :key="card.id" v-bind="(card as CardType)" />
  </div>
</template>

<script setup lang="ts">
// import { nextTick } from 'vue'
import Card from './Card.vue'
import { getAllBlogs } from '../../api'

import { CardType } from './type'

// let cards = ref<CardType[] | null>(null)

const cards = await getAllBlogs()

</script>

<style lang="less" scoped></style>
