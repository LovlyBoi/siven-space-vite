<template>
  <div class="card-container w-full py-6" v-if="!actionError">
    <template v-if="cards && cards.length > 0">
      <CardVue v-for="card in cards" :key="card.id" v-bind="(card as Card)" />
    </template>
    <Empty v-else />
  </div>
  <Error v-else :error="actionError" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardVue from './Card.vue'
import Error from './Error.vue'
import Empty from './Empty.vue'

import type { Card } from '@/types'

const props = defineProps<{
  action: () => Promise<Card[]>
}>()

let cards: Card[] | null = null
const actionError = ref<unknown>(null)

try {
  cards = await props.action()
} catch (e: unknown) {
  actionError.value = e
  console.log(actionError.value)
}
</script>

<style lang="less" scoped></style>
