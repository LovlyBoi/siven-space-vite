<template>
  <div class="width-limit max-w-screen-lg mx-1 sm:mx-4 lg:mx-auto">
    <Header />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :max="3">
          <Suspense @resolve="handleResolve">
            <template #default>
              <component :is="Component"></component>
            </template>
            <template #fallback>
              <div
                class="loading-container w-full flex justify-center items-center"
              >
                <Loading />
              </div>
            </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import Header from '@components/Header'
import Loading from '@components/Loading/Loading.vue'
import { useMasonry } from '@utils/useMasonry'

const handleResolve = () => {
  // 这段逻辑因为要等到数据到了再执行，所以需要放到回调函数中
  // 放在原组件中 await 是不可以的，应该是和源码实现有关
  nextTick(() => {
    useMasonry('.card-container', {
      itemSelector: '.content-card',
      gutter: 10,
    })
  })
}
</script>

<style lang="less" scoped>
.loading-container {
  height: 60vh;
}
</style>
