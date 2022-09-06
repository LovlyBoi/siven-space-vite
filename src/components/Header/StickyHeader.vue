<template>
  <header
    class="sticky-header fixed mt-0 top-0 mx-auto p-4 bg-white rounded-b-lg shadow-sm text-gray-700 flex items-center justify-between z-10"
  >
    <div class="left flex items-center">
      <router-link
        to="/"
        class="block w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden"
      >
        <img :src="Avatar" class="object-cover w-8 h-8 sm:w-12 sm:h-12" />
      </router-link>
      <div class="flex flex-col ml-2">
        <router-link to="/" class="text-sm sm:text-lg tracking-wider"
          >浅秋细雨</router-link
        >
        <div class="text-xs text-gray-400 tracking-wider font-thin">
          智文的前端小站
        </div>
      </div>
    </div>

    <ul
      class="nav-list flex items-center h-8 overflow-x-hidden text-gray-400"
      v-if="screenType !== 'phone'"
    >
      <li
        v-for="item in navList"
        :key="item.title"
        class="mx-6 whitespace-nowrap"
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

<style lang="less" scoped>
@unit: 0.25rem;
@bgc: #53555c;
.sticky-header {
  @media (max-width: 640px) {
    width: calc(100% - 2 * @unit);
  }
  @media (min-width: 640px) {
    width: calc(100% - 8 * @unit);
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
}

// 路由高亮
.router-link-active {
  color: rgb(55, 65, 81);
}
</style>
