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
import MenuForPhone from './MenuForPhone.vue'
import './index.less'

export default defineComponent({
  setup() {
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
    }, 100)

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

    const handleUnShowMenu = () => {
      showPhoneMenu.value = false
    }

    const showPhoneMenu = ref(false)

    return () => (
      <>
        <CommonHeader navList={navList} onShowMenu={handleShowMenu} />
        <Transition name="fade-in-top">
          {showStickyHeader.value ? (
            <StickyHeader navList={navList} onShowMenu={handleShowMenu} />
          ) : null}
        </Transition>
        <Transition name="wait-slide-in-right">
          {showPhoneMenu.value ? (
            <MenuForPhone navList={navList} onUnShowMenu={handleUnShowMenu} />
          ) : null}
        </Transition>
      </>
    )
  },
})
