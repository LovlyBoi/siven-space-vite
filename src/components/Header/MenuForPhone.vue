<template>
  <div class="menu-mask fixed top-0 bottom-0 left-0 right-0 flex flex-row z-20">
    <Transition name="fade">
      <div
        v-if="animationTrigger"
        class="mask-left w-2/6 h-full"
        @click="handleClose"
      ></div>
    </Transition>
    <Transition name="slide-in-right">
      <div
        v-if="animationTrigger"
        class="menu w-4/6 h-full bg-white backdrop-blur-lg bg-opacity-60 flex justify-center items-center"
        @click="
          (e) => {
            e.stopPropagation()
          }
        "
      >
        <div
          class="no-dark-mode cross absolute top-6 right-8 p-1 box-content"
          @click="handleClose"
        >
          <div></div>
          <div></div>
        </div>

        <ul class="text-xl text-gray-500 font-thin tracking-widest">
          <li v-for="item in navList" :key="item.title" class="my-2">
            <router-link :to="item.to">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import useDisableScroll from '@utils/useDisableScroll'

const emit = defineEmits(['unShowMenu'])

const animationTrigger = ref(false)

defineProps({
  navList: {
    type: Object,
    required: true,
  },
})

const handleClose = async () => {
  animationTrigger.value = false
  await nextTick()
  emit('unShowMenu')
}

let allowScroll: () => void
// 禁用页面滚动
onMounted(() => {
  animationTrigger.value = true
  allowScroll = useDisableScroll()
})

onBeforeUnmount(() => {
  allowScroll()
})
</script>

<style lang="less" scoped>
.mask-left {
  background-color: rgba(90, 90, 90, 0.2);
}

.router-link-active {
  font-weight: 400;
  @apply text-gray-600;
}

.no-dark-mode {
  & > div {
    @apply bg-gray-700;
  }
}
</style>
