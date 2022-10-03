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

    const loading = ref(true)

    watch(props, () => {
      if (props.blog) {
        loading.value = false
        observeHeaders((hash) => {
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
