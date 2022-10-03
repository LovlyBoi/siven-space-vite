import { defineComponent, PropType, watch } from 'vue'
import FooterVue from '@/components/Footer/footer.vue'
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

    watch(props, () => {
      if (props.blog) {
        observeHeaders((hash) => {
          articleStore.setActiveTab(hash)
        })
      }
    })

    return () => (
      <>
        <main class="article-wrapper fixed sm:ml-44 md:ml-44 lg:ml-60 xl:ml-72 overflow-auto pb-6">
          <div
            class="marked theme-gray-800-text font-sans box-border"
            innerHTML={'<p></p>' + (props.blog?.parsed.html || '')}
          ></div>
          <div class="article-footer-wrapper">
            <FooterVue></FooterVue>
          </div>
        </main>
      </>
    )
  },
})
