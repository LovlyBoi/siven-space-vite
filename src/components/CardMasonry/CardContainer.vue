<template>
  <div class="card-container w-full py-6" v-if="!getAllBlogsError">
    <Card v-for="card in cards" :key="card.id" v-bind="(card as CardType)" />
  </div>
  <Error v-else :error="getAllBlogsError" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import Error from './Error.vue'
import { getAllBlogs } from '../../api'

import type { CardType } from './type'
import type { AxiosError } from 'axios'

let cards: CardType[] | null = null

const getAllBlogsError = ref<AxiosError | null>(null)

// cards = await getAllBlogs()
try {
  cards = await getAllBlogs()
} catch (e: AxiosError) {
  getAllBlogsError.value = e
}
</script>

<style lang="less" scoped></style>
