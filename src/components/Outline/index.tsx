import { defineComponent } from 'vue'
import './index.less'

export default defineComponent({
  setup() {
    return () => (
      <>
        <aside
          class="outline-bar bg-slate-300 fixed w-44 lg:w-60 xl:w-72 overflow-auto"
        >
          <div className="some-thing">aa</div>
        </aside>
      </>
    )
  },
})
