<template>
  <div class="loading-container w-full flex justify-center items-center">
    <Loading />
  </div>
</template>

<script setup lang="ts">
import Loading from '@components/Loading/Loading.vue'
</script>

<style lang="less" scoped>
.loading-container {
  height: 60vh;
}
</style>
