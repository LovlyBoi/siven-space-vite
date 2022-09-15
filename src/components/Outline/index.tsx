import { defineComponent, PropType } from 'vue'
import type { Outline } from '@/types'
import './index.less'

export default defineComponent({
  props: {
    outline: {
      type: Object as PropType<Outline>,
    },
  },
  setup(props) {
    return () => (
      <>
        <aside class="outline-bar theme-white-600-bg fixed w-44 lg:w-60 xl:w-72 overflow-auto border-r">
          <ul class="theme-gray-600-text font-extralight font-sans">
            {props.outline?.map((item) => {
              return (
                <li class={`aside-item aside-item-${item.depth}`}>
                  <a class="break-words hover:text-purple-400 active:text-purple-400" href={item.anchor}>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </aside>
      </>
    )
  },
})
