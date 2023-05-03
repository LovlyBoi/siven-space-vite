<template>
  <HeaderVue type="plain" @show-menu="handleShowMenu"></HeaderVue>
  <Transition name="wait-slide-in-right">
    <Drawer v-model="showDrawer">
      <Outline plain :outline="blog?.parsed.outline"></Outline>
    </Drawer>
  </Transition>
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
import { useRoute, useRouter } from 'vue-router'
import HeaderVue from '@/components/Header'
import Drawer from '@/components/Drawer/index.vue'
import Outline from '@/components/Outline'
import ArticleBody from '@/components/ArticleBody'
import { screenType } from '@utils/clientWidth'
import { getBlogById } from '@/api'
import { AxiosError } from 'axios'
import { useTrackerStore } from '@/store/tracker'
import type { Blog } from '@/types'

const router = useRouter()
const route = useRoute()

const trackerStore = useTrackerStore()

const blog = ref<Blog>()

trackerStore.asyncVisitorInfo
  .then(({ id }) => {
    console.log(route.params.id as string, id)
    return getBlogById(route.params.id as string, id)
  })
  .then(async (data) => {
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

const showDrawer = ref(false)

const handleShowMenu = () => {
  showDrawer.value = true
}
</script>
