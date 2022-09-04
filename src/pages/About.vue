<template>
  <div>
    <button @click="handleClick" class="border bg-slate-400">show</button>
    <div
      v-if="show"
      class="box w-10 h-10 bg-gray-300 mx-auto mt-24"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const handleClick = () => {
  show.value = !show.value
}
</script>

<style lang="less" scoped>
// .box {
//   animation-name: slide-in-right;
//   animation-duration: 3s;
// }

// @keyframes test {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
</style>
