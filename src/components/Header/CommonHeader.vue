<template>
  <div>
    <div class="header-wrapper sm:inline-block">
      <input
        type="checkbox"
        id="extend-header-btn"
        class="hidden"
        v-model="isHeaderExtend"
      />
      <header
        ref="headerRef"
        class="header theme-white-600-bg p-4 mt-2 rounded-lg shadow-sm flex sm:mt-4 md:mt-24 items-center"
      >
        <div class="left flex items-center">
          <router-link
            to="/"
            class="block w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden"
          >
            <img :src="Avatar" class="object-cover w-8 h-8 sm:w-12 sm:h-12" />
          </router-link>
          <div class="flex flex-col ml-2">
            <a
              to="/"
              class="theme-gray-600-text text-sm sm:text-lg tracking-wider"
              >浅秋细雨</a
            >
            <div class="theme-gray-400-text text-xs tracking-wider font-thin">
              智文的前端小站
            </div>
          </div>
        </div>

        <transition name="draw">
          <ul
            class="nav-list theme-gray-400-text flex items-center h-8 overflow-x-hidden mx-6"
            v-if="screenType !== 'phone' && isHeaderExtend"
          >
            <li
              v-for="item in navList"
              :key="item.title"
              class="mx-6 whitespace-nowrap"
            >
              <router-link :to="item.to">{{ item.title }}</router-link>
            </li>
          </ul>
        </transition>

        <div class="right flex items-center mr-4 ml-auto">
          <!-- 手机菜单按钮 -->
          <label
            class="menu-static"
            v-if="screenType === 'phone'"
            @click="handlePhoneMenuClick"
          >
            <div></div>
            <div></div>
            <div></div>
          </label>
          <!-- 大屏幕展开菜单按钮 -->
          <label
            for="extend-header-btn"
            class="menu-movable"
            v-else-if="!isHeaderExtend"
          >
            <div></div>
            <div></div>
            <div></div>
          </label>
          <label for="extend-header-btn" class="cross-movable" v-else>
            <div></div>
            <div></div>
          </label>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { screenType } from '@utils/clientWidth'
import Avatar from '@assets/avatar.jpg'

// header 是否展开
const isHeaderExtend = ref(false)

const headerRef = ref<HTMLDivElement | null>(null)

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

.header {
  @media (min-width: 640px) {
    min-width: 96 * @unit;
  }
  transition: all 200ms ease;
}
</style>
