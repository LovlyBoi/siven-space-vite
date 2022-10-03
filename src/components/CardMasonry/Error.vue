<template>
  <div class="error-wrapper w-full mt-4 flex justify-center items-center">
    <div class="w-1/2 flex flex-col items-center lg:w-1/3">
      <img class="w-full" :src="errorImgUrl" alt="请求失败" />
      <div class="mt-6 theme-gray-400-text text-xl md:text-2xl lg:text-lg">
        × {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AxiosError } from 'axios'
import networkErrorUrl from '@assets/network-error.svg'
import loadFailUrl from '@assets/load-fail.svg'
import ServerErrorUrl from '@assets/500.svg'
import ClientErrorUrl from '@assets/404.svg'

const props = defineProps<{
  error: unknown
}>()

// console.log(props.error)

const errorImgUrl = computed(() => {
  switch ((props.error as AxiosError).code) {
    case 'ERR_NETWORK':
      return networkErrorUrl
    case 'ECONNABORTED':
      return loadFailUrl
    case 'ERR_BAD_RESPONSE':
      return ServerErrorUrl
    case 'ERR_BAD_REQUEST':
      return ClientErrorUrl
    default:
      return loadFailUrl
  }
})

const errorMessage = computed(() => {
  switch ((props.error as AxiosError).code) {
    case 'ERR_NETWORK':
      return '网络错误'
    case 'ECONNABORTED':
      return '请求超时'
    case 'ERR_BAD_RESPONSE':
      return '服务器错误'
    case 'ERR_BAD_REQUEST':
      return '请求错误'
    default:
      return '请求失败'
  }
})
</script>

<style lang="less" scoped>
.error-wrapper {
  height: 60vh;
}
</style>
