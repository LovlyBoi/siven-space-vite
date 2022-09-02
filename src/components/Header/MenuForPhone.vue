<template>
  <teleport to="body">
    <div
      class="menu-mask fixed top-0 bottom-0 left-0 right-0 flex flex-row-reverse z-20"
      @click="emit('unShowMenu')"
    >
      <div
        class="menu w-4/6 h-full bg-white backdrop-blur-lg bg-opacity-60 flex justify-center items-center"
        @click="
          (e) => {
            e.stopPropagation()
          }
        "
      >
        <div class="cross absolute top-6 right-10" @click="emit('unShowMenu')">
          <div></div>
          <div></div>
        </div>

        <ul class=" text-xl text-gray-500 font-thin tracking-widest">
          <li v-for="item in navList" :key="item.title" class=" my-2">
            <router-link :to="item.to">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import useDisableScroll from '../../utils/useDisableScroll'

const emit = defineEmits(['unShowMenu'])

defineProps({
  navList: {
    type: Object,
    required: true,
  },
})

let allowScroll: () => void
// 禁用页面滚动
onMounted(() => {
  allowScroll = useDisableScroll()
})

onBeforeUnmount(() => {
  allowScroll()
})
</script>

<style lang="less" scoped>
.menu-mask {
  &::after {
    content: '';
    display: block;
    background-color: rgba(90, 90, 90, 0.2);
    width: 33.3333%;
    height: 100%;
  }
}

.router-link-active {
  // color: rgb(75, 85, 99);  
  font-weight: 400;
}
</style>
