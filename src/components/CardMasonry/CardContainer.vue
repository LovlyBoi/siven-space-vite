<template>
  <div class="card-container w-full py-6" v-if="cardState === 'loaded'">
    <CardVue v-for="card in cards" :key="card.id" v-bind="(card as Card)" />
  </div>
  <Loading v-else-if="cardState === 'loading'" />
  <Empty v-else-if="cardState === 'empty'" />
  <Error v-if="cardState === 'error'" :error="actionError" />
  <button
    v-if="cardState === 'loaded' && haveMore"
    class="theme-white-600-bg theme-gray-400-text px-6 py-2 rounded-md shadow-sm mx-auto block font-light text-sm"
    :class="{ 'cursor-not-allowed': loadingMore }"
    @click="handleLoadMore"
  >
    {{ loadingMore ? '加载中...' : '加载更多' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue'
import CardVue from './Card.vue'
import Loading from './Loading.vue'
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

let cards = ref<Card[]>([])
type CardState = 'loading' | 'loaded' | 'empty' | 'error'
const cardState = ref<CardState>('loading')
const actionError = ref<unknown>(null)

const changeCardState = (state: CardState, error?: unknown) => {
  if (state === 'error') {
    actionError.value = error
  }
  cardState.value = state
}

let pageSize = 8,
  pageNumber = 0

const haveMore = ref(true)
const loadingMore = ref(false)

// 加载更多
const handleLoadMore = () => {
  if (loadingMore.value) return
  loadingMore.value = true
  getCards().then(() => emit('card-update'))
}

async function getCards(firstCall = false) {
  return props
    .action(pageSize, ++pageNumber)
    .then((nextPart) => {
      cards.value.push(...nextPart)
      if (nextPart.length < pageSize) haveMore.value = false
      if (firstCall) {
        if (cards.value.length > 0) {
          changeCardState('loaded')
          emit('card-loaded', cards)
        } else {
          changeCardState('empty')
          emit('card-empty')
        }
      }
    })
    .catch((e) => {
      changeCardState('error', e)
      emit('card-error')
      console.log(actionError.value)
    })
}

// 初始化数据
getCards(true)

// 卡片激活时，如果之前是空状态，需要再传递一次，让上层组件状态一致
onActivated(() => {
  if (cards.value.length === 0) {
    emit('card-empty')
  }
})
</script>
