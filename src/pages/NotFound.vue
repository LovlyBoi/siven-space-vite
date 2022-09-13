<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-1/2 flex flex-col items-center lg:w-1/3 -mt-24">
      <img class="w-full" :src="NotFoundUrl" alt="404" />
      <div class="mt-6 theme-400-text text-xl md:text-2xl lg:text-lg">
        × 页面 {{ fullPath }} 并不存在
      </div>
      <router-link class="theme-400-text text-sm mt-4 underline" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NotFoundUrl from '@/assets/404.svg'

const route = useRoute()

const fullPath = computed(() => route.fullPath)

</script>

<style lang="less" scoped>

</style>