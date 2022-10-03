<template>
  <div class="empty-wrapper w-full mt-4 flex justify-center items-center">
    <div class="w-1/2 flex flex-col items-center lg:w-1/3">
      <img class="w-full" :src="EmptyUrl" alt="空状态" />
      <div class="mt-6 theme-gray-400-text text-xl md:text-2xl lg:text-lg">
        ○ 空空如也
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyUrl from '@assets/empty.svg'
</script>

<style lang="less" scoped>
.empty-wrapper {
  height: 60vh;
}
</style>
