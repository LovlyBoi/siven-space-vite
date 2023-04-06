<template>
  <input type="checkbox" id="theme-switcher" v-model="toggle" />
  <label class="theme-switcher-label" for="theme-switcher">
    <span></span>
  </label>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDarkMode } from '@/utils/useDarkMode'

const theme = useDarkMode()

const toggle = ref(theme.value === 'dark')

watchEffect(() => {
  theme.value = toggle.value ? 'dark' : 'light'
})
</script>

<style>
#theme-switcher {
  display: none;
  transition: all 0.25s ease-in;
}

.theme-switcher-label {
  position: relative;
  width: 44px;
  height: 22px;
  border: 2px solid #72cce3;
  border-radius: 11px;
  background-color: #96dcee;
  transition: all 0.35s ease-in;
}

.theme-switcher-label::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 1px;
  left: 1px;
  border-radius: 50%;
  border: 2px solid #f5eb71;
  background-color: #fffaa8;
  transition: all 0.35s ease-in;
  animation: switch-reverse 0.35s forwards;
  cursor: pointer;
}

.theme-switcher-label::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 32px;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  box-shadow: -4px 0 0 1px #e8e8ea, -6px 3px 0 0px #e8e8ea;
  transition: all 0.25s ease-in;
  opacity: 0;
}

.theme-switcher-label span {
  position: relative;
  display: block;
  top: 8px;
  left: 28px;
  width: 2px;
  height: 1px;
  background-color: #fff;
  border-radius: 0.5px;
  transition: all 0.15s ease-in;
}

.theme-switcher-label span::before,
.theme-switcher-label span::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 1px;
  border-radius: 0.5px;
  background-color: #fff;
  transition: all 0.15s ease-in;
}

.theme-switcher-label span::before {
  top: -1px;
  left: -5px;
}

.theme-switcher-label span::after {
  top: 1px;
  left: -1px;
}

#theme-switcher:checked + .theme-switcher-label {
  border-color: #5d6baa;
  background-color: #6b7abb;
}

#theme-switcher:checked + .theme-switcher-label::before {
  border-color: #e8e8ea;
  background-color: #fff;
  animation: switch 0.35s forwards;
}

#theme-switcher:checked + .theme-switcher-label::after {
  opacity: 1;
  transition-delay: 0.25s;
}

#theme-switcher:checked + .theme-switcher-label span {
  width: 1px;
  height: 1px;
  left: 12px;
}

#theme-switcher:checked + .theme-switcher-label span::before {
  width: 1px;
  height: 1px;
  top: -4px;
}

#theme-switcher:checked + .theme-switcher-label span::after {
  width: 1px;
  height: 1px;
  top: 4px;
  left: -6px;
}

@keyframes switch {
  0% {
    left: 1px;
  }
  60% {
    left: 1px;
    width: 22px;
  }
  100% {
    left: 23px;
  }
}

@keyframes switch-reverse {
  0% {
    left: 23px;
  }
  60% {
    left: 17px;
    width: 22px;
  }
  100% {
    left: 1px;
  }
}
</style>
