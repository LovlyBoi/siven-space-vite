<template>
  <HeaderVue type="plain" @show-menu="handleShowMenu"></HeaderVue>
  <!-- <Transition name="wait-slide-in-right"> -->
  <Drawer v-model="showDrawer">
    <Outline plain :outline="blog?.parsed.outline"></Outline>
  </Drawer>
  <!-- </Transition> -->
  <div>
    <Outline
      :outline="blog?.parsed.outline"
      v-if="screenType !== 'phone'"
    ></Outline>
    <ArticleBody :blog="blog"></ArticleBody>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import HeaderVue from '@/components/Header'
import Drawer from '@/components/Drawer/index.vue'
import Outline from '@/components/Outline'
import ArticleBody from '@/components/ArticleBody'
import { screenType } from '@utils/clientWidth'
import { getBlogById } from '@/api'
import { AxiosError } from 'axios'
import type { Blog } from '@/types'

const router = useRouter()
const route = useRoute()

let originalTitle = document.title

const blog = ref<Blog>()

getBlogById(route.params.id as string)
  .then(async (data) => {
    blog.value = data
    document.title = getHighestTitle(data.parsed.outline)
  })
  .catch((e) => {
    console.log(e)
    const { response, code } = e as AxiosError
    const status = response?.status
    if (status === 404) {
      router.replace(`/notFound/${route.params.id}`)
    } else {
      router.replace(`/error/${code}`)
    }
  })

onBeforeRouteLeave(() => {
  document.title = originalTitle
})

const showDrawer = ref(false)

const handleShowMenu = () => {
  showDrawer.value = true
}

interface OutlineType {
  anchor: string
  depth: number
  title: string
}

const getHighestTitle = (outline: OutlineType[]) => {
  let minDepth = Infinity
  let title = ''
  for (let i = outline.length - 1; i >= 0; i--) {
    const item = outline[i]
    if (item.depth <= minDepth) {
      minDepth = item.depth
      title = item.title
    }
  }
  return title
}
</script>
