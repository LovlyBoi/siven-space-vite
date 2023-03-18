<template>
  <Transition name="wait-slide-in-right">
    <div
      v-show="showDrawer"
      class="menu-mask fixed top-0 bottom-0 left-0 right-0 flex flex-row z-20"
    >
      <Transition name="fade">
        <div
          v-show="showDrawer"
          class="mask-left w-2/6 h-full"
          @click="() => closeByMask && handleClose()"
        ></div>
      </Transition>
      <Transition name="slide-in-right">
        <div
          v-show="showDrawer"
          class="menu w-4/6 h-full bg-white backdrop-blur-lg bg-opacity-60"
          @click="(e) => e.stopPropagation()"
        >
          <slot name="header">
            <div class="drawer-header relative h-20 w-full">
              <div
                class="no-dark-mode cross fixed top-6 right-8 p-1 box-content"
                @click="handleClose"
              >
                <div></div>
                <div></div>
              </div>
            </div>
          </slot>

          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import useDisableScroll from '@utils/useDisableScroll'
import './index.less'

const emit = defineEmits(['unShowMenu', 'update:modelValue'])

const props = defineProps({
  closeByMask: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Boolean,
  },
})

let allowScroll: () => void

const handleOpen = () => {
  showDrawer.value = true
  allowScroll = useDisableScroll()
}

const handleClose = async () => {
  showDrawer.value = false
  allowScroll && allowScroll()
  await nextTick()
  emit('unShowMenu')
}

const showDrawer = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  },
})

watch(showDrawer, () => {
  if (showDrawer.value) {
    handleOpen()
  } else {
    handleClose()
  }
})
</script>

<style lang="less" scoped>
.mask-left {
  background-color: rgba(90, 90, 90, 0.2);
}

.no-dark-mode {
  & > div {
    @apply bg-gray-700;
  }
}
</style>
