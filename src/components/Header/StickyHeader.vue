<template>
  <header
    class="sticky-header theme-white-600-bg fixed mt-0 top-0 mx-auto p-4 rounded-b-lg shadow-sm flex items-center justify-between z-10"
  >
    <div class="left flex items-center">
      <router-link
        to="/"
        class="block w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden"
      >
        <img :src="Avatar" class="object-cover w-8 h-8 sm:w-12 sm:h-12" />
      </router-link>
      <div class="flex flex-col ml-2">
        <a to="/" class="theme-gray-600-text text-sm sm:text-lg tracking-wider"
          >How To Cook</a
        >
        <div class="theme-gray-400-text text-xs tracking-wider font-thin">
          本地美食推荐
        </div>
      </div>
    </div>

    <div class="right flex items-center">
      <theme-switcher></theme-switcher>
      <ul
        class="nav-list theme-gray-400-text flex items-center h-8 overflow-x-hidden"
        v-if="screenType !== 'phone'"
      >
        <li
          v-for="item in navList"
          :key="item.title"
          class="mx-6 whitespace-nowrap"
        >
          <!-- 提供props渲染能力 -->
          <component v-if="item.render" :is="item.render()"></component>
          <router-link v-else :to="item.to">{{ item.title }}</router-link>
          <!-- <router-link :to="item.to">{{ item.title }}</router-link> -->
        </li>
      </ul>

      <label class="menu-static mx-4" @click="handlePhoneMenuClick" v-else>
        <div></div>
        <div></div>
        <div></div>
      </label>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from './ThemeSwitcher.vue'
import { screenType } from '@utils/clientWidth'
import Avatar from '@assets/avatar.gif'

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
</style>
