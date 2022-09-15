import { defineComponent, PropType, watch } from 'vue'
import { observeHeaders } from '@/utils/intersectionObserver'
import { Blog } from '@/types'
import './index.less'
import './atom-one-dark.css'

export default defineComponent({
  props: {
    blog: {
      type: Object as PropType<Blog>,
    },
  },
  setup(props) {

    watch(props, () => {
      if (props.blog) {
        observeHeaders()
      }
    })

    return () => (
      <>
        <main class="article-wrapper fixed sm:ml-44 md:ml-44 lg:ml-60 xl:ml-72 overflow-y-auto">
          <div
            class="marked"
            innerHTML={'<p></p>' + (props.blog?.parsed.html || '')}
          ></div>
        </main>
      </>
    )
  },
})
