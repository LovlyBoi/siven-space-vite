import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state(){
    return{
      activeTab: ''
    }
  },
  actions: {
    setActiveTab(id: string) {
      this.activeTab = id
    }
  }
})
