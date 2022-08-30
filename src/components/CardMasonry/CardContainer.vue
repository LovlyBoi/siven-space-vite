<template>
  <div class="card-container w-full py-6">
    <Card v-for="card in cards" :key="card.id" v-bind="(card as CardType)" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Card from './Card.vue'
import cards from './mockData.json'
import { useMasonry } from '../../utils/useMasonry'
import { CardType } from './type'

onMounted(() => {
  useMasonry('.card-container', {
    // columnWidth: 320,
    itemSelector: '.content-card',
    gutter: 10,
  })
})
</script>

<style lang="less" scoped>

</style>