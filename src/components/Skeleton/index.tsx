import { defineComponent, h, PropType, mergeProps } from 'vue'
import './index.less'

export default defineComponent({
  props: {
    repeat: {
      type: Number,
      default: 1,
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: '14px',
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: '100%',
    },
    round: {
      type: Boolean,
      default: false,
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  // 外界传入的属性如果继承会报警告，不再往下透传属性
  inheritAttrs: false,
  setup(props, { attrs }) {
    const width =
      typeof props.width === 'string' ? props.width : props.width + 'px'
    const height =
      typeof props.height === 'string' ? props.height : props.height + 'px'

    // 手动解析 Props，主要是有 class 和 style 需要合并
    const Child = h(
      'div',
      mergeProps(
        {
          class: 'skeleton-child',
          style: { width, height, borderRadius: props.round ? '4px' : '' },
        },
        attrs
      )
    )

    return () => (
      <>
        {props.repeat > 1
          ? Array(props.repeat)
              .fill(null)
              .map(() => [Child, '\n'])
          : Child}
      </>
    )
  },
})
