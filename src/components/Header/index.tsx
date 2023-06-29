import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  Transition,
  h,
  VNodeChild,
} from 'vue'
import { RouterLink } from 'vue-router'
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
    function dropDownMenu(menuMap: { label: string; to?: string }[] = []) {
      return h(
        'ul',
        {
          class:
            'drop-down-menu border p-2 theme-white-600-bg rounded whitespace-normal',
        },
        menuMap.map((item) =>
          h(
            'li',
            {
              class:
                'inline-block px-1 text-sm  hover:text-indigo-400 dark:hover:text-pink-300',
            },
            h(RouterLink, { to: `/classes/${item.to || ''}` }, () => item.label)
          )
        )
      )
    }
    const navList: {
      title: string
      to?: string
      render?: (mobile?: boolean) => VNodeChild
    }[] = [
      {
        title: '全部',
        to: '/all',
      },
      {
        title: '分类',
        to: '/notFound',
        render(mobile = false) {
          const subList = [
            { label: '肉菜', to: 'meat-dish' },
            { label: '素菜', to: 'vegetable-dish' },
            { label: '主食', to: 'staple' },
            { label: '甜点', to: 'dessert' },
            { label: '饮品', to: 'drink' },
            { label: '汤', to: 'soup' },
          ]
          return h('div', { class: '' }, [
            h(
              'div',
              {
                class: 'drop-down-trigger',
              },
              [
                '分类',
                mobile &&
                  h(
                    'ul',
                    { class: 'relative left-3 ' },
                    subList.map((item) => {
                      return h(
                        'li',
                        {},
                        h(
                          RouterLink,
                          {
                            to: `/classes/${item.to || ''}`,
                            class: 'drawer-list',
                          },
                          () => item.label
                        )
                      )
                    })
                  ),
              ]
            ),
            !mobile && dropDownMenu(subList),
          ])
        },
      },
      {
        title: '管理文章',
        to: '/notFound',
        render(mobile = false) {
          return (
            !mobile &&
            h(
              'a',
              { target: '_blank', href: 'http://siven.cc/cms/index.html' },
              '管理文章'
            )
          )
        },
      },
      // {
      //   title: '笔记',
      //   to: '/notes',
      // },
      // {
      //   title: '生活随笔',
      //   to: '/essays',
      // },
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
                    {item.render ? (
                      item.render(true)
                    ) : (
                      <router-link class="drawer-list" to={item.to}>
                        {item.title}
                      </router-link>
                    )}
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
