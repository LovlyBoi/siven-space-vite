import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBloomFilter } from '@/utils/bloomFilter'
import { useTrackerStore } from './tracker'
import { getAllBlogs, getRecommend } from '@/api'
import type { Card } from '@/types'

export const useMainStore = defineStore('main', {
  state() {
    const pn = ref(1)
    const readPoint = ref(0)
    const loading = ref(true)
    const cachedAll = ref(false)
    const filter = useBloomFilter()

    const blogs: Card[] = []
    const blogsToShow = ref<Card[]>([])

    return {
      blogs,
      blogsToShow,
      pn,
      readPoint,
      cachedAll,
      loading,
      filter,
    }
  },
  actions: {
    getBlogs() {
      if (this.cachedAll) return
      this.loading = true
      // 每次拿50条数据向其中混入推荐项
      return getAllBlogs(50, this.pn)
        .then(({ cards, hasNext }) => {
          this.blogs?.push(...cards)
          this.cachedAll = !hasNext
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async getRecommend() {
      const trackerStore = useTrackerStore()
      const { id } = await trackerStore.asyncVisitorInfo
      this.loading = true
      const recommend = await getRecommend(id)
      this.loading = false
      return recommend
    },
    async getBlogsToShow(ps = 10, pn = 1) {
      // ToDo: 实现 @api/getAllBlogs接口。
      const blogs = this.blogs
      const blogsToShow = this.blogsToShow
      const queryCount = ps * pn
      const outOfIndex = () => this.readPoint > blogs.length - 1
      let stillNeed = queryCount - blogsToShow.length
      let hasNext = true
      if (stillNeed > 0) {
        const newBlogs: Card[] = []
        // 筛选没看过的推荐
        const recommend = (await this.getRecommend()).filter(
          ({ id }) => !this.filter.test(id)
        )
        stillNeed = stillNeed - recommend.length
        newBlogs.push(...recommend)
        recommend.forEach(({ id }) => {
          this.filter.add(id)
        })
        while (stillNeed > 0) {
          if (this.cachedAll && outOfIndex()) break
          else if (outOfIndex()) {
            await this.getBlogs()
          }
          const item = blogs[this.readPoint++]
          if (!this.filter.test(item.id)) {
            stillNeed--
            newBlogs.push(item)
            this.filter.add(item.id)
          }
        }
        if (this.cachedAll && outOfIndex()) {
          hasNext = false
        }
        blogsToShow.push(...newBlogs)
      }
      const start = (pn - 1) * ps
      return {
        cards: blogsToShow.slice(start, ps + start),
        hasNext,
      }
    },
  },
})
