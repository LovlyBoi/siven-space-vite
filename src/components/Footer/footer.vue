<template>
  <footer
    class="mt-10 py-6 font-serif tracking-wide text-gray-600 dark:text-gray-500 cursor-default text-sm md:flex md:justify-between border-t border-gray-300"
  >
    <!-- 备案信息 -->
    <div>
      <div class="mb-1">
        <span>Copyright © 2022 - 2023</span>
        <span class="text-purple-500 mx-2">Siven</span>
        <span>. All Rights Reserved.</span>
      </div>
      <a
        class="text-gray-500 underline-offset-2 hover:underline font-sans"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        >黑ICP备2022008289号-1</a
      >
    </div>
    <!-- 作者 -->
    <div class="md:text-right mt-4 md:mt-0">
      Made with
      <img
        :src="LoveUrl"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
        class="inline-block w-4 -mt-0.5 mx-1 cursor-pointer"
      />
      by Siven
      <transition name="fade">
        <div v-show="toggler">Some good idea support by Semghh</div>
      </transition>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoveUrl from '@/assets/love.svg'

const toggler = ref(false)

let timer: ReturnType<typeof setTimeout> | undefined = undefined

function handleEnter() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    toggler.value = true
  }, 500)
}

function handleLeave() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    toggler.value = false
  }, 500)
}
</script>

<style lang="less" scoped></style>
