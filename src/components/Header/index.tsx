import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  Transition,
} from 'vue'
import { throttle } from 'lodash-es'
import CommonHeader from './CommonHeader.vue'
import StickyHeader from './StickyHeader.vue'
import PlainHeader from './PlainHeader.vue'
import Drawer from '@/components/Drawer/index.vue'
import './index.less'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup(props, { attrs }) {
    const navList = [
      {
        title: '全部',
        to: '/all',
      },
      {
        title: '笔记',
        to: '/notes',
      },
      {
        title: '生活随笔',
        to: '/essays',
      },
      {
        title: '留言板',
        to: '/messages',
      },
    ]

    // header 是否sticky
    const showStickyHeader = ref(false)

    const handleWindowScroll = throttle(() => {
      const header = document.querySelector('.header') as HTMLDivElement
      if (!header) return
      const [scrollTop, headerBottom] = [
        window.scrollY,
        header.offsetHeight + header.offsetTop,
      ]
      // 看不见header了
      if (scrollTop > headerBottom + 50) {
        if (!header.classList.contains('header-cant-see')) {
          header.classList.add('header-cant-see')
          showStickyHeader.value = true
        }
      } else {
        if (header.classList.contains('header-cant-see')) {
          header.classList.remove('header-cant-see')
          showStickyHeader.value = false
        }
      }
    }, 200)

    // 挂载时检测页面滚动，展示stiky头部
    onMounted(() => {
      window.addEventListener('scroll', handleWindowScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleWindowScroll)
    })

    const handleShowMenu = () => {
      console.log('手机菜单点击')
      showPhoneMenu.value = true
    }

    const showPhoneMenu = ref(false)

    return () => (
      <>
        {/* 如果请求 default，返回会动的 */}
        {props.type === 'default' ? (
          <>
            <CommonHeader navList={navList} onShowMenu={handleShowMenu} />
            <Transition name="fade-in-top">
              {showStickyHeader.value ? (
                <StickyHeader navList={navList} onShowMenu={handleShowMenu} />
              ) : null}
            </Transition>
            <Drawer
              modelValue={showPhoneMenu.value}
              onUpdate:modelValue={(val) => (showPhoneMenu.value = val)}
            >
              <ul class="text-xl text-gray-500 font-thin tracking-widest h-5/6 flex flex-col justify-center items-center">
                {navList.map((item) => (
                  <li key={item.title} class="my-2">
                    <router-link class="drawer-list" to={item.to}>
                      {item.title}
                    </router-link>
                  </li>
                ))}
              </ul>
            </Drawer>
          </>
        ) : props.type === 'plain' ? (
          // 返回不会动的 header，默认透传属性
          <PlainHeader navList={navList} {...attrs}></PlainHeader>
        ) : null}
      </>
    )
  },
})
