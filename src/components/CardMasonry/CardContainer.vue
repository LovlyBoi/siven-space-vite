<template>
  <div class="card-container w-full py-6" v-if="!actionError">
    <template v-if="cards && cards.length > 0">
      <CardVue v-for="card in cards" :key="card.id" v-bind="(card as Card)" />
    </template>
    <Empty v-else />
  </div>
  <Error v-else :error="actionError" />
  <button
    v-if="!actionError && haveMore && cards && cards.length > 0"
    class="theme-white-600-bg theme-gray-400-text px-6 py-2 rounded-md shadow-sm mx-auto block font-light text-sm"
    :class="{ 'cursor-not-allowed': loadingMore }"
    @click="handleLoadMore"
  >
    {{ loadingMore ? '加载中...' : '加载更多' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardVue from './Card.vue'
import Error from './Error.vue'
import Empty from './Empty.vue'

import type { Card } from '@/types'

const props = defineProps<{
  action: (ps?: number, pn?: number) => Promise<Card[]>
}>()

const emit = defineEmits([
  'card-loaded',
  'card-empty',
  'card-error',
  'card-update',
])

let cards: Card[] = []
const actionError = ref<unknown>(null)

let pageSize = 8,
  pageNumber = 0

const haveMore = ref(true)
const loadingMore = ref(false)

// 加载更多
const handleLoadMore = async () => {
  if (loadingMore.value) return
  loadingMore.value = true
  await getCards()
  emit('card-update')
}

async function getCards(firstCall = false) {
  try {
    const nextPart = await props.action(pageSize, ++pageNumber)
    cards.push(...nextPart)
    if (nextPart.length < pageSize) haveMore.value = false
    if (firstCall)
      cards.length > 0 ? emit('card-loaded', cards) : emit('card-empty')
  } catch (e: unknown) {
    actionError.value = e
    console.log(actionError.value)
    emit('card-error')
  }
}

// 初始化数据
await getCards(true)
</script>
