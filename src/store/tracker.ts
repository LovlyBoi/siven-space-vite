import { defineStore } from 'pinia'
import { getVisitorId } from '@/api'
import { setCache, getChache } from '@/utils/useCache'
import type { VisitorInfo } from '@/types'

export const useTrackerStore = defineStore('tracker', {
  state() {
    const visitorInfo = new Promise<VisitorInfo>((resolve, reject) => {
      const data = getChache<VisitorInfo>('visitor_info', true)
      if (data) {
        resolve(data)
      } else {
        getVisitorId()
          .then((visitorInfo) => {
            setCache('visitor_info', visitorInfo, true)
            resolve(visitorInfo)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      }
    })
    return {
      visitorInfo: getChache<VisitorInfo>('visitor_info', true) || null,
      asyncVisitorInfo: visitorInfo,
    }
  },
  actions: {
    async syncVisitorId() {
      if (this.visitorInfo) return
      const visitorInfo = await getVisitorId()
      setCache('visitor_info', visitorInfo, true)
      this.visitorInfo = visitorInfo
    },
  },
})
