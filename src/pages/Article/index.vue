<template>
  <HeaderVue type="plain"></HeaderVue>
  <div class="">
    <Outline v-if="screenType !== 'phone'"></Outline>
    <main
      class="article-wrapper sm:ml-44 md:ml-44 lg:ml-60 xl:ml-72 overflow-y-auto"
    >
      <div class="">article 页面 {{ route.params.id }}</div>
      <div v-html="blog?.parsed.html"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Outline from '@/components/Outline'
import HeaderVue from '@/components/Header'
import { screenType } from '@utils/clientWidth'
import { getBlogById } from '@/api'
import { AxiosError } from 'axios'
import type { Blog } from '@/types'

const router = useRouter()
const route = useRoute()

const blog = ref<Blog>()

getBlogById(route.params.id as string)
  .then((data) => {
    console.log(data)
    blog.value = data
  })
  .catch((e) => {
    const { response, code } = e as AxiosError
    const status = response?.status
    if (status === 404) {
      router.replace(`/notFound/${route.params.id}`)
    } else {
      router.replace(`/error/${code}`)
    }
  })
</script>

<style lang="less" scoped></style>
