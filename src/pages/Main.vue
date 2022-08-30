<template>
  <div class="width-limit max-w-screen-lg mx-1 sm:mx-4 lg:mx-auto">
    <Header />
    <CardContainer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header'
import CardContainer from '../components/CardMasonry/CardContainer.vue'
</script>

<style lang="less" scoped>
.width-limit {
  height: 200vh;
}
</style>
