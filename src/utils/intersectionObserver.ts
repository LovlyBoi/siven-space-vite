import { nextTick } from 'vue'

export function useOberver(callback: IntersectionObserverCallback) {
  const io = new IntersectionObserver(callback)
  function observe(elements: HTMLElement[]) {
    elements.forEach((el) => io.observe(el))
  }
  return {
    obesrve: observe,
    unobserve: (target: HTMLElement) => io.unobserve(target),
    disconnect: () => io.disconnect(),
  }
}

let legacyIO: IntersectionObserver | null = null

// 监视所有h标签前面的节点，是否可见
// 当改变hash之后，会调用回调函数
export async function observeHeaders(
  onStateSettle?: (hash: string) => unknown
) {
  legacyIO?.disconnect()

  legacyIO = new IntersectionObserver((els) => {
    els.forEach((prev) => {
      if (prev.isIntersecting) {
        // 前置节点可见
        mapVisiable.set(prev.target as HTMLElement, true)
      } else {
        mapVisiable.set(prev.target as HTMLElement, false)
      }
    })
    replaceState(prevs, mapHeader, mapVisiable, onStateSettle)
  })

  const { prevs, mapHeader, mapVisiable } = await addHeaders(legacyIO)
  console.log('observeHeaders over')
}

async function addHeaders(io: IntersectionObserver) {
  await nextTick()
  const prevs: HTMLElement[] = []
  const headers: HTMLElement[] = []
  // prev --> header
  const mapHeader = new Map<HTMLElement, HTMLElement>()
  // prev --> boolean
  const mapVisiable = new Map<HTMLElement, boolean>()

  const hs = document.querySelectorAll(
    '.marked h1, .marked h2, .marked h3, .marked h4, .marked h5, .marked h6'
  )
  hs.forEach((header) => {
    const prev = header.previousElementSibling as HTMLElement
    if (prev) {
      prevs.push(prev)
      mapHeader.set(prev, header as HTMLElement)
      headers.push(header as HTMLElement)
      mapVisiable.set(prev, false)
    }
  })
  // 监控所有header的前一个节点
  prevs.forEach((el) => io.observe(el))
  return { prevs, headers, mapHeader, mapVisiable }
}

function replaceState(
  prevs: HTMLElement[],
  mapHeader: Map<HTMLElement, HTMLElement>,
  mapVisiable: Map<HTMLElement, boolean>,
  onStateSettle?: (hash: string) => unknown
) {
  // 找到第一个 能看见 的 prev 节点的前一个节点，将对应的 header replaceState
  const firstVisiablePrev = prevs.findIndex((cur) => mapVisiable.get(cur))
  let currHeader: HTMLElement | undefined = undefined
  if (firstVisiablePrev === 0) {
    currHeader = mapHeader.get(prevs[0])
  } else if (firstVisiablePrev > 0) {
    currHeader = mapHeader.get(prevs[firstVisiablePrev - 1])
  }
  if (!currHeader) return
  history.replaceState(null, '', `#${currHeader.id}`)
  onStateSettle && onStateSettle(currHeader.id)
}
