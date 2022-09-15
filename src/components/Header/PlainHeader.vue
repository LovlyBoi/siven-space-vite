<template>
  <header
    class="sticky-header theme-white-600-bg sticky top-0 p-4 sm:py-2 lg:px-8 rounded-b-lg sm:rounded-none shadow-sm flex items-center justify-between z-10"
  >
    <div class="left flex items-center">
      <router-link
        to="/"
        class="block w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden"
      >
        <img :src="Avatar" class="object-cover w-8 h-8 sm:w-12 sm:h-12" />
      </router-link>
      <div class="flex flex-col ml-2">
        <router-link
          to="/"
          class="theme-gray-600-text text-sm sm:text-lg tracking-wider"
        >
          浅秋细雨
        </router-link>
        <div class="theme-gray-400-text text-xs tracking-wider font-thin">
          智文的前端小站
        </div>
      </div>
    </div>

    <ul
      class="nav-list theme-gray-400-text flex items-center h-8 overflow-x-hidden"
      v-if="screenType !== 'phone'"
    >
      <li
        v-for="item in navList"
        :key="item.title"
        class="mx-6 whitespace-nowrap hover:text-indigo-400 dark:hover:text-pink-300 transition-all duration-300"
      >
        <router-link :to="item.to">{{ item.title }}</router-link>
      </li>
    </ul>

    <label class="menu-static mr-4" @click="handlePhoneMenuClick" v-else>
      <div></div>
      <div></div>
      <div></div>
    </label>
  </header>
</template>

<script setup lang="ts">
import { screenType } from '@utils/clientWidth'
import Avatar from '@assets/avatar.jpg'

defineProps({
  navList: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['showMenu'])

const handlePhoneMenuClick = () => {
  emit('showMenu')
}
</script>

<style lang="less" scoped></style>
