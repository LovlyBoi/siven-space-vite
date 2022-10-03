<template>
  <HeaderVue type="plain"></HeaderVue>
  <div class="">
    <Outline :outline="blog?.parsed.outline" v-if="screenType !== 'phone'"></Outline>
    <ArticleBody :blog="blog"></ArticleBody>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderVue from '@/components/Header'
import Outline from '@/components/Outline'
import ArticleBody from '@/components/ArticleBody'
import { screenType } from '@utils/clientWidth'
import { getBlogById } from '@/api'
import { AxiosError } from 'axios'
import type { Blog } from '@/types'

const router = useRouter()
const route = useRoute()

const blog = ref<Blog>()

getBlogById(route.params.id as string)
  .then(async (data) => {
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
