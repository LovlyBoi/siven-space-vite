import { defineStore } from 'pinia'
import { getVisitorId } from '@/api'
import { setCache, getChache } from '@/utils/useCache'
import { VisitorInfo } from '@/types'

export const useTrackerStore = defineStore('tracker', {
  state() {
    return {
      visitorInfo: getChache<VisitorInfo>('visitor_info', true) || null,
    }
  },
  actions: {
    async getVisitorId() {
      if (this.$state.visitorInfo) return
      const visitorInfo = await getVisitorId()
      setCache('visitor_info', visitorInfo, true)
      this.$state.visitorInfo = visitorInfo
    },
  },
})
