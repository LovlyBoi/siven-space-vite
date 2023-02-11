import { defineComponent, ref, PropType, watch } from 'vue'
import FooterVue from '@/components/Footer/footer.vue'
import LoadingVue from '../Loading/Loading.vue'
import { observeHeaders } from '@/utils/intersectionObserver'
import { useArticleStore } from '@/store/article'
import { Blog } from '@/types'
import './index.less'

export default defineComponent({
  props: {
    blog: {
      type: Object as PropType<Blog>,
    },
  },
  setup(props) {
    const articleStore = useArticleStore()
    // 解决带着hash进入后，被重新定位到首个header问题
    const firstLocationHash = decodeURI(location.hash.slice(1))
    let revertLocationFlag = true

    const loading = ref(!props.blog)

    watch(props, () => {
      if (props.blog) {
        loading.value = false
        observeHeaders((hash) => {
          // 第一次加载时恢复用户带进来的hash
          if (revertLocationFlag) {
            revertLocationFlag = false
            history.replaceState({}, '', `#${firstLocationHash}`)
            const header = document.querySelector(`#${firstLocationHash}`)
            header?.scrollIntoView()
            hash = firstLocationHash
          }
          articleStore.setActiveTab(hash)
        })
      }
    })

    return () => (
      <>
        <main class="article-wrapper fixed sm:ml-44 md:ml-44 lg:ml-60 xl:ml-72 overflow-auto pb-6">
          {loading.value ? (
            <LoadingVue class="h-64"></LoadingVue>
          ) : (
            <div
              v-show="!loading"
              class="marked theme-gray-800-text font-sans box-border"
              innerHTML={'<p></p>' + (props.blog?.parsed.html || '')}
            ></div>
          )}

          <div class="article-footer-wrapper">
            <FooterVue></FooterVue>
          </div>
        </main>
      </>
    )
  },
})
