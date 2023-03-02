<template>
  <div class="width-limit max-w-screen-lg mx-1 sm:mx-4 lg:mx-auto">
    <Header />
    <RouterView v-slot="{ Component }">
      <!-- <KeepAlive :max="3"> -->
      <component
        :is="Component"
        @card-loaded=";(cardState = 'loaded') && masonry()"
        @card-empty="cardState = 'empty'"
        @card-error="cardState = 'error'"
        @card-update="masonry"
      ></component>
      <!-- </KeepAlive> -->
    </RouterView>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import Header from '@components/Header'
import Footer from '@/components/Footer/footer.vue'
import { useMasonry } from '@utils/useMasonry'

// card-container 状态，在 Vue3 属性默认可以透传，且事件监听被认为是属性
let cardState = ref('preparing')

const masonry = () =>
  nextTick(() =>
    useMasonry('.card-container', {
      itemSelector: '.content-card',
      gutter: 10,
    })
  )
</script>

<style lang="less" scoped>
.loading-container {
  height: 60vh;
}
</style>
