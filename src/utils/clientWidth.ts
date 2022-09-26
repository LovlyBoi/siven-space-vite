import { ref, computed } from 'vue'

const clientWidth = ref(document.body.clientWidth)

window.onresize = () => {
  console.log('-----')
  clientWidth.value = document.body.clientWidth
}

export default clientWidth
export const isSmallScreen = computed(() => clientWidth.value < 640)

export const screenSize = computed(() => {
  if (clientWidth.value < 640) {
    return 'xs'
  } else if (clientWidth.value >= 640 && clientWidth.value < 768) {
    return 'sm'
  } else if (clientWidth.value >= 768 && clientWidth.value < 1024) {
    return 'md'
  } else if (clientWidth.value >= 1024 && clientWidth.value < 1280) {
    return 'lg'
  } else if (clientWidth.value >= 1280 && clientWidth.value < 1536) {
    return 'xl'
  } else {
    return '2xl'
  }
})

export const screenType = computed(() => {
  if (clientWidth.value < 640) {
    return 'phone'
  } else if (clientWidth.value >= 640 && clientWidth.value < 768) {
    return 'pad'
  } else if (clientWidth.value >= 768 && clientWidth.value < 1024) {
    return 'pad'
  } else if (clientWidth.value >= 1024 && clientWidth.value < 1280) {
    return 'laptop'
  } else if (clientWidth.value >= 1280 && clientWidth.value < 1536) {
    return 'desktop'
  } else {
    return 'desktop'
  }
})