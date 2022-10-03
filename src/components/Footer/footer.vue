<template>
  <footer
    class="py-10 font-serif tracking-wide text-gray-600 cursor-default text-sm"
  >
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
