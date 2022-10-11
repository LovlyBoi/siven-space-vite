import { defineComponent, ref, PropType, computed, watch } from 'vue'
import Skeleton from '../Skeleton'
import type { Outline } from '@/types'
import './index.less'
import { useArticleStore } from '@/store/article'

export default defineComponent({
  props: {
    outline: {
      type: Object as PropType<Outline>,
    },
  },
  setup(props) {
    const articleStore = useArticleStore()

    const activeTab = computed(() => {
      return '#' + articleStore.activeTab
    })

    const loading = ref(!props.outline)

    watch(props, () => {
      if (props.outline) {
        loading.value = false
      }
    })

    return () => (
      <>
        <aside class="outline-bar bg-white dark:bg-slate-700 fixed w-44 lg:w-60 xl:w-72 overflow-auto border-r dark:border-gray-500">
          {loading.value ? (
            <>
              <Skeleton
                width={'78%'}
                height={26}
                round={true}
                class="my-4 ml-2"
              ></Skeleton>
              <Skeleton
                width={'72%'}
                height={26}
                round={true}
                class="my-4 ml-6"
              ></Skeleton>
              <Skeleton
                width={'66%'}
                height={26}
                repeat={3}
                round={true}
                class="my-4 ml-10"
              ></Skeleton>
              <Skeleton
                width={'72%'}
                height={26}
                repeat={2}
                round={true}
                class="my-4 ml-6"
              ></Skeleton>
            </>
          ) : (
            <ul class="theme-gray-600-text font-extralight font-sans">
              {props.outline?.map((item) => {
                return (
                  <a
                    class={[
                      'break-words',
                      'hover:text-indigo-400',
                      'dark:hover:text-pink-300',
                      activeTab.value === item.anchor
                        ? 'text-indigo-500 dark:text-pink-300 font-normal'
                        : '',
                    ]}
                    href={item.anchor}
                  >
                    <li class={`aside-item aside-item-${item.depth}`}>
                      {item.title}
                    </li>
                  </a>
                )
              })}
            </ul>
          )}
        </aside>
      </>
    )
  },
})
