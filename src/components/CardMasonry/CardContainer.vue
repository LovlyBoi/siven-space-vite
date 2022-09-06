<template>
  <div class="card-container w-full py-6" v-if="!actionError">
    <Card v-for="card in cards" :key="card.id" v-bind="(card as CardType)" />
  </div>
  <Error v-else :error="actionError" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import Error from './Error.vue'

import type { CardType } from './type'

const props = defineProps<{
  action: () => Promise<CardType[]>
}>()

let cards: CardType[] | null = null
const actionError = ref<unknown>(null)

try {
  cards = await props.action()
} catch (e: unknown) {
  actionError.value = e
  console.log(actionError.value)
}
</script>

<style lang="less" scoped></style>
